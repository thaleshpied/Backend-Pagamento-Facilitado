<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class DzConfig extends BaseConfig
{
    public $dzAssets = [

	

		'name' => 'PAGAMENTOS',
		
		'public' => [
			'favicon' => 'media/img/logo/favicon.ico',
			'fonts' => [
				'google' => [
					'families' => [
						'Poppins:300,400,500,600,700,800,900',
					]
				]
			],	
			'global' => [
				'css' => [
					''
				],
				'js' => [
					'top'=>[
						'',
					]
				],
			],
			'pagelevel' => [
				'css' => [
					'BaseController_index' => [
						'public/assets/vendor/owl-carousel/owl.carousel.css',
						'public/assets/vendor/nouislider/nouislider.min.css',						
						'public/assets/vendor/sweetalert2/dist/sweetalert2.min.css',
					]
				],
				'js' => [
					'BaseController_index' => [
						'public/assets/vendor/chart.js/Chart.bundle.min.js',
						'public/assets/vendor/apexchart/apexchart.js',
						'public/assets/vendor/peity/jquery.peity.min.js',
						'public/assets/js/dashboard/dashboard-1_V_1.0.1.js',
						'public/assets/vendor/owl-carousel/owl.carousel.js',
						'public/assets/vendor/datatables/js/jquery.dataTables.min.js',
						'public/assets/js/plugins-init/datatables.init.js',							
						'public/assets/vendor/sweetalert2/dist/sweetalert2.min.js',
						'public/assets/js/plugins-init/sweetalert.init.js',
					]
				]
			],
		]
	];

}
