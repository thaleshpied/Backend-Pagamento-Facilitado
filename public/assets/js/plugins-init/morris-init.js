(function($) {
    "use strict"

	var dlabMorris = function(){
		
		var screenWidth = $(window).width();
		
		var setChartWidth = function(){
			if(screenWidth <= 768)
			{
				var chartBlockWidth = 0;
				chartBlockWidth = (screenWidth < 300 )?screenWidth:300;
				jQuery('.morris_chart_height').css('min-width',chartBlockWidth - 31);
			}
		}
		
		var donutChart = function(){
			Morris.Donut({
				element: 'morris_donught',
				data: [{
					label: "\xa0 \xa0 Montado \xa0 \xa0",
					value: 12,

				}, {
					label: "\xa0 \xa0 Realizado \xa0 \xa0",
					value: 30
				}, {
					label: "\xa0 \xa0 Lançados \xa0 \xa0",
					value: 20
				}],
				resize: true,
				redraw: true,
				colors: ['#00a15d', 'rgb(255, 92, 0)', '#FF5E4B'],
				//responsive:true,
				
			});
		}
		
		var lineChart = function(){
			//line chart
			let line = new Morris.Line({
				element: 'morris_line',
				resize: true,
				data: [{
						y: '2011 Q1',
						item1: 2666
					},
					{
						y: '2011 Q2',
						item1: 2778
					},
					{
						y: '2011 Q3',
						item1: 4912
					},
					{
						y: '2011 Q4',
						item1: 3767
					},
					{
						y: '2012 Q1',
						item1: 6810
					},
					{
						y: '2012 Q2',
						item1: 5670
					},
					{
						y: '2012 Q3',
						item1: 4820
					},
					{
						y: '2012 Q4',
						item1: 15073
					},
					{
						y: '2013 Q1',
						item1: 10687
					},
					{
						y: '2013 Q2',
						item1: 8432
					}
				],
				xkey: 'y',
				ykeys: ['item1'],
				labels: ['Item 1'],
				gridLineColor: 'transparent',
				lineColors: ['rgb(238, 60, 60)'], //here
				lineWidth: 1,
				hideHover: 'auto',
				pointSize: 0,
				axes: false
			});	
		}
		
		var lineChart2 = function(){
			//Area chart
			Morris.Area({
				element: 'line_chart_2',
				data: [{
						period: '2001',
						smartphone: 0,
						windows: 0,
						mac: 0
					}, {
						period: '2002',
						smartphone: 90,
						windows: 60,
						mac: 25
					}, {
						period: '2003',
						smartphone: 40,
						windows: 80,
						mac: 35
					}, {
						period: '2004',
						smartphone: 30,
						windows: 47,
						mac: 17
					}, {
						period: '2005',
						smartphone: 150,
						windows: 40,
						mac: 120
					}, {
						period: '2006',
						smartphone: 25,
						windows: 80,
						mac: 40
					}, {
						period: '2007',
						smartphone: 10,
						windows: 10,
						mac: 10
					}


				],
				xkey: 'period',
				ykeys: ['smartphone', 'windows', 'mac'],
				labels: ['Phone', 'Windows', 'Mac'],
				pointSize: 3,
				fillOpacity: 0,
				pointStrokeColors: ['#EE3C3C', '#FF5E4B', '#00a15d'],
				behaveLikeLine: true,
				gridLineColor: 'transparent',
				lineWidth: 3,
				hideHover: 'auto',
				lineColors: ['rgb(238, 60, 60)', 'rgb(0, 171, 197)', '#00a15d'],
				resize: true

			});
		}
		
        /**
         * Cria um gráfico de barras com a produção prevista e montada por unidade
         * 
         * @param {none} none
         * @returns {void}
         */
		var Grafico_Diretoria_1 = function(){
            if(jQuery('#Grafico_Diretoria_1').length > 0)
            {
                Morris.Bar({
                    element: 'Grafico_Diretoria_1',
                    data: [
                        { y: 'Vale', a: 100, b: 90 },
                        { y: 'Samarco', a: 75, b: 65 },
                        { y: 'CMD', a: 50, b: 40 },
                        { y: 'Nexa JF', a: 75, b: 65 },
                        { y: 'Salobo', a: 50, b: 40 },
                        { y: 'VLI', a: 75, b: 65 },
                        { y: 'São Martinho', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Previsto', 'Montados'],
                    barColors: ['#00a15d', '#FF5E4B'],
                    hideHover: 'auto',
                    gridLineColor: 'transparent',
                    resize: true,
                    barSizeRatio: 0.6,
                    stacked: false,
                    hoverCallback: function(index, options, content, row) {
                        return content; // Mantém o tooltip padrão
                    }
                });
            }
        }

		
		/**
		 * Função para criar o gráfico de barras para análise de montagens, desmontagens e revisões.
		 *
		 * @function
		 * @param {object} response - Dados retornados da API em formato JSON.
		 * @param {array} response.data - Array com os dados para o gráfico.
		 * @param {string} response.data[i].NOME - Nome do item (ex: "Vale", "Samarco", etc.).
		 * @param {number} response.data[i].MONTAGENS - Quantidade de montagens.pi
		 * @param {number} response.data[i].DESMONTAGENS - Quantidade de desmontagens.
		 * @param {number} response.data[i].REVISOES - Quantidade de revisões.
		 *
		 * @requires Morris.js
		 * @requires jQuery
		 */
		var Grafico_Diretoria_2 = function() {
			if (jQuery('#Grafico_Diretoria_2').length > 0) {
				$.ajax({
					url: "AnaliticoDiretoriaMDR", 
					method: "GET",
					dataType: "json",
					success: function(response) {
						if (response.data.length > 0) {

							// Quebra os nomes longos em múltiplas linhas
							response.data.forEach(item => {
								item.NOME = item.NOME.replace(/\s/g, '\n'); 
							});

							let data = response.data;
							let maxExibir = 5; 
							let totalItens = data.length;
							
							// Ajusta a largura do gráfico para permitir rolagem horizontal se necessário
							let larguraGrafico = totalItens > maxExibir ? totalItens * 200 : '80%';
							$('#Grafico_Diretoria_2').css('min-width', larguraGrafico);

							// Criação do gráfico Morris.js
							let grafico = Morris.Bar({
								element: 'Grafico_Diretoria_2',
								data: data, 
								xkey: 'NOME',
								ykeys: ['MONTAGENS', 'DESMONTAGENS', 'REVISOES'],
								labels: ['Montados', 'Desmontados', 'Revisados'],
								barColors: ['#00a15d', '#FF5E4B', '#fab426'],
								hideHover: 'auto',
								gridLineColor: 'transparent',
								resize: true,
								barSizeRatio: 0.5
							});

							setTimeout(() => {
								$('#Grafico_Diretoria_2 svg text').each(function() {
									$(this).css({
										"font-weight": "bold",
										"fill": "#000"
									});
								});
							}, 1000);

						} else {
							console.warn("Nenhum dado disponível para o gráfico.");
						}
					},
					error: function(xhr, status, error) {
						console.error("Erro ao carregar os dados do gráfico:", error);
					}
				});
			}
		};

		
		
		// var barStalkChart = function(){
		// 	//bar chart
		// 	Morris.Bar({
		// 		element: 'morris_bar_stalked',
		// 		data: [{
		// 			y: 'S',
		// 			a: 66, 
		// 			b: 34
		// 		}, {
		// 			y: 'M',
		// 			a: 75, 
		// 			b: 25
		// 		}, {
		// 			y: 'T',
		// 			a: 50, 
		// 			b: 50
		// 		}, {
		// 			y: 'W',
		// 			a: 75, 
		// 			b: 25
		// 		}, {
		// 			y: 'T',
		// 			a: 50, 
		// 			b: 50
		// 		}, {
		// 			y: 'F',
		// 			a: 16, 
		// 			b: 84
		// 		}, {
		// 			y: 'S',
		// 			a: 70, 
		// 			b: 30
		// 		}, {
		// 			y: 'S',
		// 			a: 30, 
		// 			b: 70
		// 		}, {
		// 			y: 'M',
		// 			a: 40, 
		// 			b: 60
		// 		}, {
		// 			y: 'T',
		// 			a: 29, 
		// 			b: 71
		// 		}, {
		// 			y: 'W',
		// 			a: 44, 
		// 			b: 56
		// 		}, {
		// 			y: 'T',
		// 			a: 30, 
		// 			b: 70
		// 		}, {
		// 			y: 'F',
		// 			a: 60, 
		// 			b: 40
		// 		}, {
		// 			y: 'G',
		// 			a: 40, 
		// 			b: 60
		// 		}, {
		// 			y: 'S',
		// 			a: 46, 
		// 			b: 54
		// 		}],
		// 		xkey: 'y',
		// 		ykeys: ['a', 'b'],
		// 		labels: ['A', 'B'],
		// 		barColors: ['#000080', "#F1F3F7"],
		// 		hideHover: 'auto',
		// 		gridLineColor: 'transparent',
		// 		resize: true,
		// 		barSizeRatio: 0.25,
		// 		stacked: true, 
		// 		behaveLikeLine: true,
		// 		redraw: true
				
		// 		// barRadius: [6, 6, 0, 0]
		// 	});
		
		// }


		document.addEventListener("DOMContentLoaded", function() {
			var chartData = [];
	
			// Captura os dados do PHP (inputs escondidos)
			document.querySelectorAll("input[id^='totallancamentossegunda']").forEach((input, index) => {
				let totalLancamentos = parseInt(input.value) || 0;
				let centroCusto = document.getElementById(`centrodecustolancamento${index}`).value || "N/A";

				let label = `${centroCusto} (${totalLancamentos})`;
	
				// Adiciona os dados ao array do gráfico
				chartData.push({
					y: label, 
					a: totalLancamentos // Apenas um valor por barra
				});
			});
	
			// Criar gráfico com exibição de valores nas barras
			var barChartSegunda = Morris.Bar({
				element: 'morris_bar_stalked',
				data: chartData,
				xkey: 'y',
				ykeys: ['a'],
				labels: ['Total Lançamentos'],
				barColors: ['#000080'],
				hideHover: 'auto',
				gridLineColor: 'transparent',
				resize: true,
				barSizeRatio: 0.5,
				stacked: true,
				behaveLikeLine: true,
				redraw: true
			});
	
			// Adicionando valores nas barras após renderização
			barChartSegunda.options.onComplete = function() {
				var svgElement = document.querySelector("#morris_bar_stalked svg"); // Seleciona apenas o gráfico de segunda
				var bars = svgElement.querySelectorAll("rect"); // Agora pega apenas as barras desse gráfico
				
				bars.forEach((bar, index) => {
					if (chartData[index]) {
						var value = chartData[index].a;
				
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						text.setAttribute("x", bar.getAttribute("x"));
						text.setAttribute("y", bar.getAttribute("y") - 5);
						text.setAttribute("fill", "#000");
						text.setAttribute("font-size", "18px");
						text.setAttribute("text-anchor", "middle");
						text.textContent = value;
				
						svgElement.appendChild(text);
					}
				});
			};
			
		});


		


		// GRÁFICO LANCAMENTOS TERÇA 
		document.addEventListener("DOMContentLoaded", function() {
			var chartDataTerca = [];
	
			// Captura os dados do PHP (inputs escondidos)
			document.querySelectorAll("input[id^='totallancamentosterca']").forEach((input, index) => {
				let totalLancamentosterca = parseInt(input.value) || 0;
				let centroCustoterca = document.getElementById(`centrodecustolancamentoterca${index}`).value || "N/A";

				console.log(`Input encontrado: totalLancamentosterca = ${totalLancamentosterca}, centroCustoterca = ${centroCustoterca}`);

				let label = `${centroCustoterca} (${totalLancamentosterca})`;
	
				// Adiciona os dados ao array do gráfico
				chartDataTerca.push({
					y: label, 
					a: totalLancamentosterca // Apenas um valor por barra
				});
			});
			
			console.log(chartDataTerca);

			// Criar gráfico com exibição de valores nas barras
			var barChartTerca = Morris.Bar({
				element: 'graficolancamentosterca',
				data: chartDataTerca,
				xkey: 'y',
				ykeys: ['a'],
				labels: ['Total Lançamentos'],
				barColors: ['#000080'],
				hideHover: 'auto',
				gridLineColor: 'transparent',
				resize: true,
				barSizeRatio: 0.5,
				stacked: true,
				behaveLikeLine: true,
				redraw: true
			});
	
			// Adicionando valores nas barras após renderização
			barChartTerca.options.onComplete = function() {
				var svgElement = document.querySelector("#graficolancamentosterca svg"); // Seleciona apenas o gráfico de terça
				var bars = svgElement.querySelectorAll("rect"); // Agora pega apenas as barras desse gráfico
				
				bars.forEach((bar, index) => {
					if (chartDataTerca[index]) {
						var value = chartDataTerca[index].a;
				
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						text.setAttribute("x", bar.getAttribute("x"));
						text.setAttribute("y", bar.getAttribute("y") - 5);
						text.setAttribute("fill", "#000");
						text.setAttribute("font-size", "18px");
						text.setAttribute("text-anchor", "middle");
						text.textContent = value;
				
						svgElement.appendChild(text);
					}
				});
			};
			
		});




		// // CONTROLE DE LANÇADOS 
		// // Criar um array para armazenar os dados do gráfico
		// var chartData = [];

		// // Selecionar os inputs escondidos gerados pelo PHP
		// document.querySelectorAll("input[id^='totallancamentossegunda']").forEach((input, index) => {
		// 	let totalLancamentos = parseInt(input.value) || 0;
		// 	let centroCusto = document.getElementById(`centrodecustolancamento${index}`).value || "N/A";
	
		// 	// Adicionar os valores ao array no formato que o Morris.js exige
		// 	chartData.push({
		// 		// y: centroCusto, 
		// 		a: totalLancamentos // Apenas um valor para cada barra
		// 	});
		// });
	
		// // Criar o gráfico com os dados dinâmicos
		// Morris.Bar({
		// 	element: 'morris_bar_stalked',
		// 	data: chartData,  // Dados preenchidos dinamicamente
		// 	xkey: 'y',
		// 	ykeys: ['a'],
		// 	labels: ['Total Lançamentos'],
		// 	barColors: ['#000080'],
		// 	hideHover: 'auto',
		// 	gridLineColor: 'transparent',
		// 	resize: true,
		// 	barSizeRatio: 0.5,  // Ajuste o tamanho da barra conforme necessário
		// 	stacked: false, // Removido empilhamento
		// 	behaveLikeLine: false,
		// 	redraw: true
		// });




		
		
		var areaChart = function(){
			//area chart
			Morris.Area({
				element: 'morris_area',
				data: [{
						period: '2001',
						smartphone: 0,
						windows: 0,
						mac: 0
					}, {
						period: '2002',
						smartphone: 90,
						windows: 60,
						mac: 25
					}, {
						period: '2003',
						smartphone: 40,
						windows: 80,
						mac: 35
					}, {
						period: '2004',
						smartphone: 30,
						windows: 47,
						mac: 17
					}, {
						period: '2005',
						smartphone: 150,
						windows: 40,
						mac: 120
					}, {
						period: '2006',
						smartphone: 25,
						windows: 80,
						mac: 40
					}, {
						period: '2007',
						smartphone: 10,
						windows: 10,
						mac: 10
					}


				],
				lineColors: ['#00a15d', 'rgb(16, 202, 147)', 'rgb(255, 92, 0)'],
				xkey: 'period',
				ykeys: ['smartphone', 'windows', 'mac'],
				labels: ['Phone', 'Windows', 'Mac'],
				pointSize: 0,
				lineWidth: 0,
				resize: true,
				fillOpacity: 0.95,
				behaveLikeLine: true,
				gridLineColor: 'transparent',
				hideHover: 'auto'

			});
		}
		
		var areaChart2 = function(){
			if(jQuery('#morris_area_2').length > 0)
			{
			//area chart
				Morris.Area({
					element: 'morris_area_2',
					data: [{
							period: '2010',
							SiteA: 0,
							SiteB: 0,

						}, {
							period: '2011',
							SiteA: 130,
							SiteB: 100,

						}, {
							period: '2012',
							SiteA: 80,
							SiteB: 60,

						}, {
							period: '2013',
							SiteA: 70,
							SiteB: 200,

						}, {
							period: '2014',
							SiteA: 180,
							SiteB: 150,

						}, {
							period: '2015',
							SiteA: 105,
							SiteB: 90,

						},
						{
							period: '2016',
							SiteA: 250,
							SiteB: 150,

						}
					],
					xkey: 'period',
					ykeys: ['SiteA', 'SiteB'],
					labels: ['Site A', 'Site B'],
					pointSize: 0,
					fillOpacity: 0.6,
					pointStrokeColors: ['#b4becb', '#00A2FF'], //here
					behaveLikeLine: true,
					gridLineColor: 'transparent',
					lineWidth: 0,
					smooth: false,
					hideHover: 'auto',
					lineColors: ['rgb(0, 171, 197)', 'rgb(0, 0, 128)'],
					resize: true

				});	
			}
		}
		
		
		/* Function ============ */
		return {
			init:function(){
				setChartWidth();
				// donutChart();
				// lineChart();
				// lineChart2();
				Grafico_Diretoria_1();
				Grafico_Diretoria_2();
				// barStalkChart();
				areaChart();
				// areaChart2();
			},
			
			
			resize:function(){
				screenWidth = $(window).width();
				setChartWidth();
				// donutChart();
				// lineChart();
				// lineChart2();
				Grafico_Diretoria_1();
				Grafico_Diretoria_2();
				// barStalkChart();
				areaChart();
				// areaChart2();
			}
		}
		
	}();

	jQuery(document).ready(function(){
		dlabMorris.init();
		//dlabMorris.resize();
	
	});
		
	jQuery(window).on('load',function(){
		//dlabMorris.init();
	});
		
	jQuery( window ).resize(function() {
		//dlabMorris.resize();
		//dlabMorris.init();
	});
   
})(jQuery);