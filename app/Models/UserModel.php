<?php

class UserModel extends Model
{
    protected $table      = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $allowedFields = [
        'nome', 
        'registro', 
        'email', 
        'senha', 
        'tipo'
    ];

    protected $useTimestamps = false;
}