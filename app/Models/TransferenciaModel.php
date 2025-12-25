<?php
class TransferenciaModel extends Model
{
    protected $table      = 'transferencias';
    protected $primaryKey = 'id_transferencia';

    protected $allowedFields = [
        'id_usuario_pagador',
        'id_usuario_recebedor',
        'valor',
        'status'
    ];
}