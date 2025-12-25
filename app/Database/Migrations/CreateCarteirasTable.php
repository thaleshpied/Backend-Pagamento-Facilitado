<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateCarteirasTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id_carteira' => [
                'type'           => 'INT',
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'id_usuario' => [
                'type'     => 'INT',
                'unsigned' => true,
            ],
            'saldo_atual' => [
                'type'       => 'DECIMAL',
                'constraint' => '15,2',
                'default'    => 0.00,
            ],
            'criado_em' => [
                'type'    => 'DATETIME',
                'default' => 'CURRENT_TIMESTAMP',
            ],
            'modificado_em' => [
                'type'      => 'DATETIME',
                'default'   => 'CURRENT_TIMESTAMP',
                'on_update' => 'CURRENT_TIMESTAMP',
            ],
        ]);

        $this->forge->addKey('id_carteira', true);
        $this->forge->addUniqueKey('id_usuario');

        $this->forge->addForeignKey(
            'id_usuario',
            'usuarios',
            'id_usuario',
            'CASCADE',
            'CASCADE'
        );

        $this->forge->createTable('carteiras');
    }

    public function down()
    {
        $this->forge->dropTable('carteiras');
    }
}