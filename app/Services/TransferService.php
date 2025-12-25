<?php

namespace App\Services;

use App\Models\UserModel;
use App\Models\CarteiraModel;
use App\Models\TransferenciaModel;
use App\Exceptions\BusinessException;
use CodeIgniter\Database\BaseConnection;
use Config\Database;

class TransferService
{
    protected UserModel $userModel;
    protected CarteiraModel $carteiraModel;
    protected TransferenciaModel $transferenciaModel;
    protected BaseConnection $db;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->carteiraModel = new CarteiraModel();
        $this->transferenciaModel = new TransferenciaModel();
        $this->db = Database::connect();
    }

    public function executar(float $valor, int $pagadorId, int $recebedorId): void
    {
        if ($valor <= 0) {
            throw new BusinessException('Valor da transferência inválido.');
        }

        $pagador = $this->userModel->find($pagadorId);
        $recebedor = $this->userModel->find($recebedorId);

        if (!$pagador || !$recebedor) {
            throw new BusinessException('Usuário pagador ou recebedor não encontrado.');
        }

        if ($pagador['tipo'] === 'merchant') {
            throw new BusinessException('Lojistas não podem realizar transferências.');
        }

        $carteiraPagador = $this->carteiraModel
            ->where('id_usuario', $pagadorId)
            ->first();

        $carteiraRecebedor = $this->carteiraModel
            ->where('id_usuario', $recebedorId)
            ->first();

        if (!$carteiraPagador || !$carteiraRecebedor) {
            throw new BusinessException('Carteira não encontrada.');
        }

        if ($carteiraPagador['saldo_atual'] < $valor) {
            throw new BusinessException('Saldo insuficiente.');
        }

        if (!$this->autorizado()) {
            throw new BusinessException('Transferência não autorizada.');
        }

        $this->db->transBegin();

        try {
            $this->carteiraModel->update(
                $carteiraPagador['id_carteira'],
                ['saldo_atual' => $carteiraPagador['saldo_atual'] - $valor]
            );

            $this->carteiraModel->update(
                $carteiraRecebedor['id_carteira'],
                ['saldo_atual' => $carteiraRecebedor['saldo_atual'] + $valor]
            );

            $this->transferenciaModel->insert([
                'id_usuario_pagador'   => $pagadorId,
                'id_usuario_recebedor' => $recebedorId,
                'valor'                => $valor,
                'status'               => 'CONCLUIDA',
            ]);

            $this->db->transCommit();
        } catch (\Throwable $e) {
            $this->db->transRollback();
            throw new BusinessException('Erro ao processar transferência.');
        }

        // SÓ APÓS EXECUÇÃO EU FAÇO A NOTIFICAÇÃO 
        $this->notificar();
    }

    // https://util.devi.tools/api/v2/authorize 
    protected function autorizado(): bool
    {
        $client = \Config\Services::curlrequest();
        $response = $client->get('ROTA DA AUTORIZAÇÃO');//PRECISO CONCLUIR ESSA ROTA COM BASE NA ORIENTAÇÃO

        $body = json_decode($response->getBody(), true);

        return isset($body['data']['authorization']) && $body['data']['authorization'] === true;
    }

    //https://util.devi.tools/api/v1/notify
    protected function notificar(): void
    {
        try {
            $client = \Config\Services::curlrequest();
            $client->post('ROTA DA NOTIFICAÇÃO'); //PRECISO CONCLUIR ESSA ROTA
        } catch (\Throwable $e) {
        }
    }
}