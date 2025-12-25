<?php

class CarteiraModel extends Model
{
    protected $table      = 'carteiras';
    protected $primaryKey = 'id_carteira';

    protected $allowedFields = [
        'id_usuario', 
        'saldo_atual'
    ];
}