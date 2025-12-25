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

        if (!isset($data['value'], $data['payer'], $data['payee'])) {
            return $this->failValidationErrors('Payload inválido.');
        }

        try {
            $service = new TransferService();
            $service->executar(
                (float) $data['value'],
                (int) $data['payer'],
                (int) $data['payee']
            );

            return $this->respond([
                'message' => 'Transferência realizada com sucesso.'
            ], 201);
        } catch (BusinessException $e) {
            return $this->fail($e->getMessage(), 400);
        } catch (\Throwable $e) {
            return $this->failServerError('Erro interno.');
        }
    }
}