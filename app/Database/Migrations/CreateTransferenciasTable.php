<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTransferenciasTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_transferencia' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'id_usuario_pagador' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'id_usuario_recebedor' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'valor' => [
                'type'       => 'DECIMAL',
                'constraint' => '15,2',
            ],
            'status' => [
                'type'       => 'ENUM',
                'constraint' => ['PENDENTE', 'CONCLUIDA', 'ERRO'],
                'default'    => 'PENDENTE',
            ],
            'criado_em' => [
                'type'    => 'DATETIME',
                'default' => 'CURRENT_TIMESTAMP',
            ],
        ]);

        $this->forge->addKey('id_transferencia', true);

        $this->forge->addForeignKey(
            'id_usuario_pagador',
            'usuarios',
            'id_usuario'
        );

        $this->forge->addForeignKey(
            'id_usuario_recebedor',
            'usuarios',
            'id_usuario'
        );

        $this->forge->createTable('transferencias');
    }

    public function down()
    {
        $this->forge->dropTable('transferencias');
    }
}