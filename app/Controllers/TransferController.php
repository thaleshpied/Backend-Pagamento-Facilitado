<?php

namespace App\Controllers;

use App\Services\TransferService;
use App\Exceptions\BusinessException;
use CodeIgniter\RESTful\ResourceController;

class TransferController extends ResourceController
{
    protected $format = 'json';

    public function transfers()
    {
        $data = $this->request->getJSON(true);

        /* VALIDANDO O PAYLOAD 
        USEI O CÓDIGO DE RETORNO 422 QUE CORRESPONDE O SERVIDOR ENTENDE O QUE FOI ENVIADO MAS NÃO CONSEGUE PROCESSAR POR ALGUM MOTIVO E INDICA A MENSAGEM
        */
        if (!isset($data['value'], $data['payer'], $data['payee'])) {
            return $this->respond([
                'success' => false,
                'message' => 'Payload inválido. Campos obrigatórios: value, payer, payee'
            ], 422);
        }

        try {
            $service = new TransferService();

            $service->executar(
                (float) $data['value'],
                (int) $data['payer'],
                (int) $data['payee']
            );

            /* RETORNANDO SUCESSO NA TRANSFERÊNCIA 
            USEI O CÓDIGO 201 QUE INDICA QUE ALÉM DA OPERAÇÃO TER SIDO BEM SUCEEDIDA, ALGO FOI CRIADO COM SUCESSO NO BANCO
            */
            return $this->respond([
                'success' => true,
                'message' => 'Transferência realizada com sucesso.'
            ], 201);

        } catch (BusinessException $e) {
            
            /* TRATANDO ERRO DE REGRA 
            USEI O MESMO CÓDIGO QUE FOI UTIULIZADO NO PAYLOAD INDICANDO QUE A INFORMAÇÃO FOI RECEBEDIA E ENTENDIA MAS POR ALGUM MOTIVO NÃO FOI PROCESSADA CONFORME ESPERADO E 
            OBTEVE ERRO NO QUAL É UM ERRO NÃO MAPEAGO E ASSIM DEVO RETORNAR UM GETMESSAGE DO BANCO DE DADOS PARA TERMOS CIÊNCIA DO MOTIVO
            */
            return $this->respond([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);

        } catch (\Throwable $e) {
            
            // TRATANDO ERRO EM ALGUMA EXCEÇÃO COM ERRO 500 NO QUAL ALGO INESPERADO OCORREU E IMPEDIU A OPERAÇÃO ISSO DO LADO SERVIDOR
            log_message('error', $e->getMessage());

            return $this->respond([
                'success' => false,
                'message' => 'Erro interno do servidor.'
            ], 500);
        }
    }
}