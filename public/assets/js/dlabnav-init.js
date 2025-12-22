
"use strict"

var dlabSettingsOptions = {};

function getUrlParams(dParam) 
	{
		var dPageURL = window.location.search.substring(1),
			dURLVariables = dPageURL.split('&'),
			dParameterName,
			i;

		for (i = 0; i < dURLVariables.length; i++) {
			dParameterName = dURLVariables[i].split('=');

			if (dParameterName[0] === dParam) {
				return dParameterName[1] === undefined ? true : decodeURIComponent(dParameterName[1]);
			}
		}
	}

(function($) {
	
	"use strict"
	
	//  var direction =  getUrlParams('dir');
	
	// 	if(direction == 'rtl')
	// 	{
	// 		direction = 'rtl'; 
	// 	}else{
	// 		direction = 'ltr'; 
	// 	} 
	
		// var temaescolhido = document.getElementById('temaescolhido').value;
		// var temaescolhido = document.getElementById('temaescolhido').innerHTML;
		// var temaescolhido = document.getElementById('temaescolhido').textContent;

		// console.log(temaescolhido);
		// if(temaescolhido == 0){
		// 	temaescolhido = 'light';
	
		// }else{
		// 	temaescolhido = 'dark';
		// }


	// dlabSettingsOptions = {
	// 	typography: "poppins",
	// 	version: "light", //INDICAR SE É MODO ESCURRO OU CLARO SENDO DARK ESCURO LIGHT CLARO
	// 	layout: "vertical",
	// 	primary: "color_1",
	// 	headerBg: "color_1",
	// 	navheaderBg: "color_1",
	// 	sidebarBg: "color_1",
	// 	sidebarStyle: "overlay", //More Options => ["full" , "mini" , "compact" , "modern" , "overlay" , "icon-hover"]
	// 	sidebarPosition: "static",
	// 	headerPosition: "static",
	// 	containerLayout: "full",
	// };

	
	var dlabSettingsOptions = {
	typography: "poppins",  		//More Options => ["poppins" , "roboto" , "Open Sans" , "Helventivca" ]
	version: "light",       		//More Options => ["light" , "dark"]
	layout: "vertical",   		//More Options => ["horizontal" , "vertical"]
	primary: "color_1",			//More Options => ["color_1," , "color_2," ..... "color_15"]
	headerBg: "color_1",			//More Options => ["color_1," , "color_2," ..... "color_15"]
	navheaderBg: "color_1",			//More Options => ["color_1," , "color_2," ..... "color_15"]
	sidebarBg: "color_1",			//More Options => ["color_1," , "color_2," ..... "color_15"]
	sidebarStyle: "overlay",		//More Options => ["full" , "mini" , "compact" , "modern" , "overlay" , "icon-hover"]
	sidebarPosition: "static",		//More Options => ["static" , "fixed"]
	headerPosition: "fixed",		//More Options => ["static" , "fixed"]
	containerLayout: "full",		//More Options => ["full" , "wide" , "wide-box"]
};

// 	var dlabSettingsOptions = {
// 	typography: "roboto",
// 	version: "light",
// 	layout: "horizontal",
// 	primary: "color_1",
// 	headerBg: "color_1",
// 	navheaderBg: "color_1",
// 	sidebarBg: "color_3",
// 	sidebarStyle: "overlay",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "wide-box",
// };


	
// var dlabSettingsOptions = {
// 	typography: "poppins",
// 	version: "light",
// 	layout: "horizontal",
// 	primary: "color_10",
// 	headerBg: "color_1",
// 	navheaderBg: "color_1",
// 	sidebarBg: "color_10",
// 	sidebarStyle: "full",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "full",
// };


// var dlabSettingsOptions = {
// 	typography: "poppins",
// 	version: "light",
// 	layout: "vertical",
// 	primary: "color_13",
// 	headerBg: "color_1",
// 	navheaderBg: "color_13",
// 	sidebarBg: "color_1",
// 	sidebarStyle: "full",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "full",
// };


// var dlabSettingsOptions = {
// 	typography: "poppins",
// 	version: "light",
// 	layout: "vertical",
// 	primary: "color_12",
// 	headerBg: "color_12",
// 	navheaderBg: "color_12",
// 	sidebarBg: "color_1",
// 	sidebarStyle: "full",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "full",
// };


// var dlabSettingsOptions = {
// 	typography: "poppins",
// 	version: "dark",
// 	layout: "vertical",
// 	primary: "color_3",
// 	headerBg: "color_1",
// 	navheaderBg: "color_3",
// 	sidebarBg: "color_3",
// 	sidebarStyle: "full",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "full",
// };


// var dlabSettingsOptions = {
// 	typography: "poppins",
// 	version: "light",
// 	layout: "vertical",
// 	primary: "color_12",
// 	headerBg: "color_1",
// 	navheaderBg: "color_12",
// 	sidebarBg: "color_12",
// 	sidebarStyle: "full",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "full",
// };


// var dlabSettingsOptions = {
// 	typography: "poppins",
// 	version: "light",
// 	layout: "vertical",
// 	primary: "color_2",
// 	headerBg: "color_1",
// 	navheaderBg: "color_2",
// 	sidebarBg: "color_2",
// 	sidebarStyle: "mini",
// 	sidebarPosition: "fixed",
// 	headerPosition: "fixed",
// 	containerLayout: "full",
// };
	
	new dlabSettings(dlabSettingsOptions); 

	jQuery(window).on('resize',function(){
        /*Check container layout on resize */
		///alert(dlabSettingsOptions.primary);
        dlabSettingsOptions.containerLayout = $('#container_layout').val();
        /*Check container layout on resize END */
        
		new dlabSettings(dlabSettingsOptions); 
	});
	
})(jQuery);