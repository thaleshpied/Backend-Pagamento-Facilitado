<?php

use CodeIgniter\Router\RouteCollection;

$routes->set404Override('App\Controllers\BaseController::page_error_404');

/**
 * @var RouteCollection $routes
 */


$routes->get('index', 'BaseController::Index');
$routes->post('/transfers', 'TransferController::transfer');