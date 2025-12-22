

(function($) {
    /* "use strict" */
	
 var dlabChartlist = function(){
	
	var screenWidth = $(window).width();
	let draw = Chart.controllers.line.__super__.draw; //draw shadow
	
	
	// GRÁFICO DA EVOLUÇÃO SEMANAL
	var activityChart = function(){
		var activity = document.getElementById("activity");



		
			if (activity !== null) {
				var activityData = [{
						first: [ 30, 35, 30, 50, 30, 50, 40, 45],
						second: [ 35, 35, 35, 35, 35, 35, 35, 35 ],
						third: [ 38, 35, 38, 35, 35, 40, 35, 35 ]
						
					}
					// ,
					// {
					// 	first: [ 35, 35, 40, 30, 38, 40, 50, 38],
					// 	second: [ 35, 35, 35, 35, 35, 35, 35, 35 ]
						
					// },
					// {
					// 	first: [ 35, 40, 40, 30, 38, 32, 42, 32]
						
					// },
					// {
					// 	first: [ 35, 40, 30, 38, 32, 42, 30, 35]
					
					// }
				];
				activity.height = 300;
				
				var config = {
					type: "line",
					data: {
						labels: [
							"1",
							"2",
							"3",
							"4",
							"5",
						],
						datasets: [{
								label: "Active",
								backgroundColor: "rgba(82, 177, 65, 0)",
								borderColor: "#3FC55E",
								data: activityData[0].first,
								borderWidth: 6
							}
							,
							{
								label: "Inactive",
								backgroundColor: 'rgba(255, 142, 38, 0)',
								borderColor: "#4955FA",
								data: activityData[0].second,
								borderWidth: 6,
								
							},
							{
								label: "Inactive",
								backgroundColor: 'rgba(255, 142, 38, 0)',
								borderColor: "#F04949",
								data: activityData[0].third,
								borderWidth: 6,
								
							} 
						]
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						elements: {
								point:{
									radius: 0
								}
						},
						legend:false,
						
						scales: {
							yAxes: [{
								gridLines: {
									color: "rgba(89, 59, 219,0.1)",
									drawBorder: true
								},
								ticks: {
									fontSize: 14,
									fontColor: "#6E6E6E",
									fontFamily: "Poppins"
								},
							}],
							xAxes: [{
								//FontSize: 40,
								gridLines: {
									display: false,
									zeroLineColor: "transparent"
								},
								ticks: {
									fontSize: 14,
									stepSize: 5,
									fontColor: "#6E6E6E",
									fontFamily: "Poppins"
								}
							}]
						},
						tooltips: {
							enabled: false,
							mode: "index",
							intersect: false,
							titleFontColor: "#888",
							bodyFontColor: "#555",
							titleFontSize: 12,
							bodyFontSize: 15,
							backgroundColor: "rgba(256,256,256,0.95)",
							displayColors: true,
							xPadding: 10,
							yPadding: 7,
							borderColor: "rgba(220, 220, 220, 0.9)",
							borderWidth: 2,
							caretSize: 6,
							caretPadding: 10
						}
					}
				};

				var ctx = document.getElementById("activity").getContext("2d");
				var myLine = new Chart(ctx, config);

				var items = document.querySelectorAll("#user-activity .nav-tabs .nav-item");
				items.forEach(function(item, index) {
					item.addEventListener("click", function() {
						config.data.datasets[0].data = activityData[index].first;
						config.data.datasets[1].data = activityData[index].second;
						config.data.datasets[2].data = activityData[index].third;
						myLine.update();
					});
				});
			}
	
		
	}



	var redial = function(){
		  var options = {
          series: [70],
          chart: {
          type: 'radialBar',
          offsetY: 0,
		  height:300,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -190,
            endAngle: 190,
            track: {
              background: "var(--rgba-primary-1)",
              strokeWidth: '100%',
              margin: 5,
            },
			
			/* hollow: {
              margin: 30,
              size: '45%',
              background: 'var(--primary)',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
            }, */
			
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 5,
                fontSize: '22px',
				color:'var(--primary)',
				fontWeight:700,
              }
            }
          }
        },
		responsive: [{
          breakpoint: 1600,
          options: {
           chart: {
			  height:200
			},
          }
        }
		
		],
        grid: {
          padding: {
            top: -10
          }
        },
		/* stroke: {
          dashArray: 4,
		  colors:'#6EC51E'
        }, */
        fill: {
          type: 'gradient',
		  colors:'var(--primary)',
          /* gradient: {
              shade: 'white',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
          }, */
        },
        labels: ['Average Results'],
        };

        var chart = new ApexCharts(document.querySelector("#redial"), options);
        chart.render();
	
	
	}
	var chartBar = function(){

		// METRAGEM LINEAR 
		var Utilidades = parseInt(document.getElementById('metragemUtilidades').value);		
		var GRS = parseInt(document.getElementById('metragemGRS').value);		
		var Ustulação = parseInt(document.getElementById('metragemUstulação').value);		
		var Metalurgia = parseInt(document.getElementById('metragemMetalurgia').value);
		var Hidrometalurgia = parseInt(document.getElementById('metragemHidrometalurgia').value);
		
		// // LIMITE METRAGEM LINEAR 
		var Utilidadeslimite = parseInt(document.getElementById('limiteUtilidades').value);		
		var GRSlimite = parseInt(document.getElementById('limiteGRS').value);		
		var Ustulaçãolimite = parseInt(document.getElementById('limiteUstulação').value);		
		var Metalurgialimite = parseInt(document.getElementById('limiteMetalurgia').value);
		var Hidrometalurgialimite = parseInt(document.getElementById('limiteHidrometalurgia').value);

		var options = {
			  series: [
				{
					name: 'Montado',
					data: [Utilidades, GRS, Ustulação, Metalurgia, Hidrometalurgia],
					//radius: 12,	
				}, 
				{
				  name: 'Limite',
				  data: [Utilidadeslimite, GRSlimite, Ustulaçãolimite, Metalurgialimite, Hidrometalurgialimite]
				}, 
				
			],
				chart: {
				type: 'bar',
				height: 350,
				
				toolbar: {
					show: true,
				},
				
			},
			plotOptions: {
			  bar: {
				horizontal: false,
				columnWidth: '60%',
				endingShape: "rounded",
				borderRadius: 12,
			  },
			  
			},
			states: {
			  hover: {
				filter: 'none',
			  }
			},
			colors:['#008F53', '#FF5E4B'],
			dataLabels: {
			  enabled: true,
			},
			markers: {
		shape: "circle",
		},
		
		
			legend: {
				show: true,
				fontSize: '12px',
				labels: {
					colors: '#000000',
					
					},
				markers: {
				width: 18,
				height: 18,
				strokeWidth: 10,
				strokeColor: '#fff',
				fillColors: undefined,
				radius: 12,	
				}
			},
			stroke: {
			  show: true,
			  width: 4,
			  curve: 'smooth',
			  lineCap: 'round',
			  colors: ['transparent']
			},
			grid: {
				borderColor: '#eee',
			},
			xaxis: {
				 position: 'bottom',
			  categories: ['Utilidades', 'GRS', 'Ustulação', 'Metalurgia', 'Hidrometalurgia'],
			  labels: {
			   style: {
				  colors: '#787878',
				  fontSize: '13px',
				  fontFamily: 'poppins',
				  fontWeight: 100,
				  cssClass: 'apexcharts-xaxis-label',
				},
			  },
			  crosshairs: {
			  show: false,
			  }
			},
			yaxis: {
				labels: {
					offsetX:-16,
				   style: {
					  colors: '#787878',
					  fontSize: '13px',
					   fontFamily: 'poppins',
					  fontWeight: 100,
					  cssClass: 'apexcharts-xaxis-label',
				  },
			  },
			},
			fill: {
				type: 'gradient',
				gradient: {
					shade: 'white',
					type: "vertical",
					shadeIntensity: 0.2,
					gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [0, 50, 50],
					colorStops: []
				}
			}, 
			tooltip: {
			  y: {
				formatter: function (val) {
				  return val + " Metros Lineares"
				}
			  }
			},
			};

			var chartBar1 = new ApexCharts(document.querySelector("#chartBar"), options);
			chartBar1.render();
	}

	
	

	var reservationChart = function(){

	
		 var options = {
          series: [{
          name: 'series1',		
			data: [20, 400, 250, 200, 300, 100, 400, 100]

        }, {
          name: 'series2',
          data: [20, 400, 250, 200, 300, 100, 400, 100]
        }],
          chart: {
          height: 350,
          type: 'line',
		  toolbar:{
			  show:false
		  }
        },
		colors:["var(--primary)",'#FF5E4B'],
        dataLabels: {
          enabled: false
        },
        stroke: {
			width:6,
			curve: 'smooth',
        },
		legend:{
			show:false
		},
		grid:{
			borderColor: '#EBEBEB',
			strokeDashArray: 6,
		},
		markers:{
			strokeWidth: 6,
			 hover: {
			  size: 15,
			}
		},
		yaxis: {
		  labels: {
			offsetX:-12,
			style: {
				colors: '#787878',
				fontSize: '13px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			}
		  },
		},
        xaxis: {
          categories: ["1","May","June","July","August","September","October","November"],
		  labels:{
			  style: {
				colors: '#787878',
				fontSize: '13px',
				fontFamily: 'Poppins',
				fontWeight: 400
				
			},
		  }
        },
		fill:{
			type:"",
			opacity:1
		},
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };

        var chart = new ApexCharts(document.querySelector("#reservationChart"), options);
        chart.render();
	}


	// ABAIXO GRÁFICO PARA PRODUÇÃO
	var reservationChart = function() {
		// Função para obter valores dinamicamente de inputs com um prefixo específico
		function getValuesByPrefix(prefix) {
			return Array.from(document.querySelectorAll(`input[id^="${prefix}"]`))
				.map(input => parseFloat(input.value) || 0); // Converte para número e evita NaN
		}
	
		// Obtém os valores dinamicamente
		var cubicaValues = getValuesByPrefix("cubica");
		var linearValues = getValuesByPrefix("linear");
		var dataValues = Array.from(document.querySelectorAll(`input[id^="data"]`))
			.map(input => input.value); // Apenas pega os valores de data
	
		// Configuração do gráfico
		var options = {
			series: [
				{
					name: 'Cúbica',
					data: cubicaValues
				},
				{
					name: 'Linear',
					data: linearValues
				}
			],
			chart: {
				height: 350,
				type: 'line', // Define o gráfico como linha
				toolbar: { show: false }
			},
			colors: ["#008000", "#FF4B4B"], // Verde e Vermelho como na imagem
			dataLabels: { enabled: false },
			stroke: { width: 3, curve: 'smooth' }, // Linhas suaves como no exemplo
			markers: {
				size: 5, // Define os marcadores visíveis
				colors: ["#008000", "#FF4B4B"],
				strokeWidth: 2
			},
			legend: {
				show: true,
				position: "top",
				horizontalAlign: "left"
			},
			grid: { borderColor: '#EBEBEB', strokeDashArray: 6 },
			yaxis: {
				labels: {
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
					}
				}
			},
			xaxis: {
				categories: dataValues,
				labels: {
					style: {
						colors: '#787878',
						fontSize: '13px',
						fontFamily: 'Poppins',
						fontWeight: 400
					}
				}
			},
			fill: { type: "solid", opacity: 1 },
			tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
		};
	
		var chart = new ApexCharts(document.querySelector("#reservationChart"), options);
		chart.render();
	};
	
   
	var donutChart1 = function(){
		$("span.donut1").peity("donut", {
			width: "90",
			height: "90"
		});
	}
	var NewCustomers = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,300, 100, 400, 200, 400],
				/* radius: 30,	 */
			}, 				
		],
			chart: {
			type: 'line',
			height: 50,
			width: 100,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#NewCustomers"), options);
		chartBar1.render();
	 
	}
	var NewCustomers1 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,300, 200, 400, 100, 400],
				/* radius: 30,	 */
			}, 				
		],
			chart: {
			type: 'line',
			height: 50,
			width: 80,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		
		colors:['#0E8A74'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#NewCustomers1"), options);
		chartBar1.render();
	 
	}
	var emailchart = function(){
		 var options = {
          series: [27, 11, 22,15,25],
          chart: {
          type: 'donut',
		  height:250
        },
		dataLabels:{
			enabled: false
		},
		stroke: {
          width: 0,
        },
		colors:['#8621C3', 'var(--primary)', '#FAF119','#FF5151','#6499FF'],
		legend: {
              position: 'bottom',
			  show:false
            },
        responsive: [{
          breakpoint: 1800,
          options: {
           chart: {
			  height:200
			},
          }
        },
		{
          breakpoint: 1800,
          options: {
           chart: {
			  height:200
			},
          }
        }
		]
        };

        var chart = new ApexCharts(document.querySelector("#emailchart"), options);
        chart.render();
    
	}

// 	var statusfluxo = function(){

// 		var fluxosolicitacaoValor = parseInt(document.getElementById('fluxosolicitacao').innerHTML);
// 		var fluxovisitaValor = parseInt(document.getElementById('fluxovisita').innerHTML);
// 		var fluxoProjetoValor = parseInt(document.getElementById('fluxoprojeto').innerHTML);
// 		var fluxosocanceladaValor = parseInt(document.getElementById('fluxocancelada').innerHTML);

// 		var options = {
// 		 series: [fluxosolicitacaoValor, fluxovisitaValor, fluxoProjetoValor,fluxosocanceladaValor],
// 		 chart: {
// 		 type: 'donut',
// 		 height:250
// 	   },
// 	   dataLabels:{
// 		   enabled: true
// 	   },
// 	   stroke: {
// 		 width: 0,
// 	   },
// 	   colors:['#8621C3', '#26e023','#61cff1', '#ff0000'],
// 	   legend: {
// 			 position: 'bottom',
// 			 show:false
// 		   },
// 	   responsive: [{
// 		 breakpoint: 1800,
// 		 options: {
// 		  chart: {
// 			 height:200
// 		   },
// 		 }
// 	   },
// 	   {
// 		 breakpoint: 1800,
// 		 options: {
// 		  chart: {
// 			 height:200
// 		   },
// 		 }
// 	   }
// 	   ]
// 	   };

// 	   var chart = new ApexCharts(document.querySelector("#statusfluxo"), options);
// 	   chart.render();
   
//    }
 
	/* Function ============ */

	// PEGANDO O VALOR DO CENTRO DE CUSTO ATUAL PARA CASO SEJA A NEXA JUIZ DE FORA UM DETERMINADO GRÁFICO PODERÁ SER RENDERIZADO 
	var CODCCUSTOGERAL = document.getElementById('CODCCUSTOEMAIL').value;

		return {
			init:function(){
			},
			
			
			load:function(){
			activityChart();
			redial();
			
			// RENDERIZANDO GRÁFICO QUANDO A OBRA FOR A NEXA JUIZ DE FORA 
			if (CODCCUSTOGERAL === '02.0140.00') {
				chartBar();
			}

			reservationChart();
			donutChart1();
			NewCustomers();
			NewCustomers1();
			emailchart();
			// statusfluxo();
				
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dlabChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);