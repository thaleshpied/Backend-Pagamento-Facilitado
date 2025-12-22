
<?php 

	$router     	= service('router');
    $action     	= class_basename($router->controllerName()).'_'.$router->methodName();	
	$globalCss  	= config('DzConfig')->dzAssets['public']['global']['css'];
    $pageLevelCss 	= config('DzConfig')->dzAssets['public']['pagelevel']['css'][$action];
    $globalJs  		= config('DzConfig')->dzAssets['public']['global']['js'];
    $pageLevelJs 	= config('DzConfig')->dzAssets['public']['pagelevel']['js'][$action];

?>
<!DOCTYPE html>
<html lang="pt-br">
    
    <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="author" content="TESTE BACKEND - Thales Henrique" />
	<meta name="description" content="TESTE BACKEND - API PAGAMENTO FACILITADO" />
	<meta property="og:title" content="TESTE BACKEND - API PAGAMENTO FACILITADO" />
	<meta property="og:description" content="TESTE BACKEND - API PAGAMENTO FACILITADO" />
	<meta name="format-detection" content="telephone=no">

    <!-- PRÓPRIOS -->    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    
    <link href="https://unpkg.com/gijgo@1.9.14/css/gijgo.min.css" rel="stylesheet" type="text/css" />
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />

  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>


    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.0/css/jquery.dataTables.min.css">

        
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.js"></script>
   
    <!-- fontawesome -->
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">


    <meta name="mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#006e40"/>       
    

	<!-- PAGE TITLE HERE -->
	<title>TESTE BACKEND</title>

    <!-- MOBILE SPECIFIC -->
    <meta name="viewport" content="width=device-width, initial-scale=0, shrink-to-fit=no">

    <!-- FONT AWESOME #DESEMPENHO -->
    <link rel="stylesheet" href="<?php echo site_url('public/assets/css/estilopessoal_v1.0.12.css'); ?>">
	
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo site_url('public/assets/images/icon.ico'); ?>">

    <?php foreach($pageLevelCss as $css){
            if(strpos($css, 'http') !== false){
                $css_url = $css;    
            }else{
                $css_url = base_url($css);
            } 
        ?>	
            <link href="<?php echo $css_url ?>" rel="stylesheet" type="text/css"/>	
    <?php } ?>
    <?php foreach($globalCss as $css){ ?>	
            <link href="<?php echo base_url($css) ?>" rel="stylesheet" type="text/css"/>		
    <?php } ?>  


    
    </head>
    <body>
    
    <!-- DIV PARA BASE DA URL PUXADA PELO ARQUIVO ROTINAS JAVASCRIP -->
    <div id="base-url" data-url="<?php echo base_url(); ?>">           
        <input type="hidden" name="CODCCUSTOEMAIL" id="CODCCUSTOEMAIL" value="<?php echo isset($sessionData['CODCCUSTO']) ? $sessionData['CODCCUSTO'] : ''; ?>">
    </div>

    <!--*******************
        Preloader start
    ********************-->

    
        <div id="preloader">
		    <div class="lds-ripple">
            
			<div></div>
			<div></div>
         
		</div>
        <!-- <div class="text-center mb-3 lds-ripple">
            <a href="<?php echo site_url('/index'); ?>"><img src="<?php echo base_url('public/assets/images/logo.png'); ?>" alt=""></a>
        </div> -->
    </div>



    <!-- <div id="main-wrapper" class="show"> -->
         <div id="main-wrapper" class="show menu-toggle" style="position: static !important;">

		<?php echo $this->include('elements/nav-header') ?>
        <?php echo $this->include('elements/header') ?>
        <?php echo $this->include('elements/sidebar') ?>
        <?php echo $this->renderSection('content') ?>
        <?php echo $this->include('elements/footer') ?>
        
		
	</div>
	<?php foreach($globalJs['top'] as $js){ ?>
		<script src="<?php echo base_url($js); ?>"></script>
	<?php } ?>	

	<?php foreach($pageLevelJs as $js){
        
        if(strpos($js, 'http') !== false){
            ?>
        <script src="<?php echo $js; ?>"></script>
        <?php }
        else{
            ?>
        <script src="<?php echo base_url($js); ?>"></script>
    <?php
        }
    } 
    ?>	
	<?php foreach($globalJs['bottom'] as $js){ ?>
		<script src="<?php echo base_url($js); ?>"></script>
	<?php } ?>
	<?php echo $this->renderSection('scripts') ?>


</body>
</html>

