(function($) {
  "use strict" 

	
	/* function draw() {
		
	} */

 var dlabSparkLine = function(){
	let draw = Chart.controllers.line.__super__.draw; //draw shadow
	
	var screenWidth = $(window).width();
	
	var barChart1 = function(){
		if(jQuery('#barChart_1').length > 0 ){
			const barChart_1 = document.getElementById("barChart_1").getContext('2d');
    
			barChart_1.height = 100;

			new Chart(barChart_1, {
				type: 'bar',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [65, 59, 80, 81, 56, 55, 40],
							borderColor: 'rgba(0,161,91)',
							borderWidth: "0",
							backgroundColor: 'rgba(0,161,91)'
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							// Change here
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	}

	// Abaixo Gráfico usado para TOP Volumetria
	var barChart2 = function () {
    const baseUrl = document.getElementById('base-url')?.getAttribute('data-url') || '';
    const rotaDados = baseUrl + "getTotalMedicoesPendentePorObra"; // Substitua pela URL real

    if (jQuery('#barChart_2').length > 0) {
        fetch(rotaDados)
		.then(response => response.json())
		.then(response => {
			const data = response.data;

			const labels = data.map(item => item.NOME);
			const valores = data.map(item => parseFloat(item.TOTAL_PENDENTE) || 0);
			const links = data.map(item => item.URL?.startsWith('http') ? item.URL : `${baseUrl}${item.URL}`);


                const ctx = document.getElementById("barChart_2").getContext('2d');
                const gradient = ctx.createLinearGradient(0, 0, 0, 250);
                gradient.addColorStop(0, "rgba(0,161,91)");
                gradient.addColorStop(1, "rgba(0,161,91, 0.5)");

                ctx.canvas.height = 100;

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Metragem cúbica",
                            data: valores,
                            backgroundColor: gradient,
                            borderWidth: 0,
                            hoverBackgroundColor: gradient
                        }]
                    },
                    options: {
                        legend: false,
                        animation: {
                            onComplete: function () {
                                const chartInstance = this.chart;
                                const ctx = chartInstance.ctx;
                                ctx.font = "12px Arial";
                                ctx.fillStyle = "#000";
                                ctx.textAlign = "center";
                                ctx.textBaseline = "bottom";

                                this.data.datasets.forEach((dataset, i) => {
                                    const meta = chartInstance.getDatasetMeta(i);
                                    meta.data.forEach((bar, index) => {
                                        const data = dataset.data[index];
                                        ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
                                    });
                                });
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                barPercentage: 0.5
                            }]
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return 'Metragem cúbica: ' + tooltipItem.yLabel;
                                }
                            }
                        },
                        onClick: function (event, elements) {
                            if (elements.length > 0) {
                                const index = elements[0]._index;
                                const link = links[index];
                                if (link) {
                                    window.open(link, "_blank");
                                }
                            }
                        }
                    }
                });
            })
            .catch(error => {
                console.error("Erro ao carregar dados do gráfico:", error);
            });
    }
}





	


	
	


	// ABAIXO GRÁFICO POR ÁREA NÍVEL 1 
	var AreaNV1 = function() {
		if (jQuery('#AreaNV1_GR').length > 0) {
	
			const nomeAreas = [];
			const producoes = [];
	
			document.querySelectorAll('input[id^="nomearea"]').forEach(input => {
				const ref = input.id.replace("nomearea", "");
				const nome = input.value;
				const producaoInput = document.getElementById(`producao${ref}`);
	
				if (producaoInput) {
					const producao = parseFloat(producaoInput.value.replace(",", ".")) || 0;
					nomeAreas.push(nome);
					producoes.push(producao);
				}
			});
	
			// // MOSTRAR VALORES NO CONSOLE
			// console.log("Áreas:", nomeAreas);
			// console.log("Produções:", producoes);
	
			const ctx = document.getElementById("AreaNV1_GR").getContext('2d');
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, 250);
			gradientStroke.addColorStop(0, "rgba(0,161,91)");
			gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");
	
			let AreaNV1_GR_New = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: nomeAreas,
					datasets: [{
						label: "Metragem Linear",
						data: producoes,
						borderColor: gradientStroke,
						borderWidth: 0,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke
					}]
				},
				options: {
					legend: false,
					// responsive: true,
					animation: {
						onComplete: function() {
							var chartInstance = this.chart;
							var ctx = chartInstance.ctx;
							ctx.font = "12px Arial";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.textBaseline = "bottom";
	
							this.data.datasets.forEach((dataset, i) => {
								var meta = chartInstance.getDatasetMeta(i);
								meta.data.forEach((bar, index) => {
									var data = dataset.data[index];
									ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	};
	
	document.addEventListener("DOMContentLoaded", function() {
		AreaNV1();
	});
	
	
	// FIM GRÁFICO POR ÁREA NÍVEL 1
	



	// LANÇAMENTOS SEGUNDA	
	var LancamentosSegundaGR = function() {
		if (jQuery('#LancamentosSegundaGR').length > 0) {
	
			const nomeCClancamentoSegundas = [];
			const totalCClancamentoSegunda = [];
	
			document.querySelectorAll('input[id^="nomeCClancamentoSegunda"]').forEach(input => {
				const ref = input.id.replace("nomeCClancamentoSegunda", "");
				const nome = input.value;
				const producaoInput = document.getElementById(`totalCClancamentoSegunda${ref}`);
	
				if (producaoInput) {
					const producao = parseFloat(producaoInput.value.replace(",", ".")) || 0;
					nomeCClancamentoSegundas.push(nome);
					totalCClancamentoSegunda.push(producao);
				}
			});
	
			// // MOSTRAR VALORES NO CONSOLE
			// console.log("Áreas:", nomeCClancamentoSegundas);
			// console.log("Produções:", totalCClancamentoSegunda);
	
			const ctx = document.getElementById("LancamentosSegundaGR").getContext('2d');
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, 250);
			gradientStroke.addColorStop(0, "rgba(0,161,91)");
			gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");
	
			let LancamentosSegundaGR_New = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: nomeCClancamentoSegundas,
					datasets: [{
						label: "Metragem cúbica",
						data: totalCClancamentoSegunda,
						borderColor: gradientStroke,
						borderWidth: 0,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke
					}]
				},
				options: {
					legend: false,
					// responsive: true,
					animation: {
						onComplete: function() {
							var chartInstance = this.chart;
							var ctx = chartInstance.ctx;
							ctx.font = "12px Arial";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.textBaseline = "bottom";
	
							this.data.datasets.forEach((dataset, i) => {
								var meta = chartInstance.getDatasetMeta(i);
								meta.data.forEach((bar, index) => {
									var data = dataset.data[index];
									ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	};
	
	document.addEventListener("DOMContentLoaded", function() {
		LancamentosSegundaGR();
	});


	// LANÇAMENTOS TERÇA
	var LancamentosTercaGR = function() {
		if (jQuery('#LancamentosTercaGR').length > 0) {
	
			const nomeCClancamentoTercas = [];
			const totalCClancamentoTerca = [];
	
			document.querySelectorAll('input[id^="nomeCClancamentoTerca"]').forEach(input => {
				const ref = input.id.replace("nomeCClancamentoTerca", "");
				const nome = input.value;
				const producaoInput = document.getElementById(`totalCClancamentoTerca${ref}`);
	
				if (producaoInput) {
					const producao = parseFloat(producaoInput.value.replace(",", ".")) || 0;
					nomeCClancamentoTercas.push(nome);
					totalCClancamentoTerca.push(producao);
				}
			});
	
			// // MOSTRAR VALORES NO CONSOLE
			// console.log("Áreas:", nomeCClancamentoTercas);
			// console.log("Produções:", totalCClancamentoTerca);
	
			const ctx = document.getElementById("LancamentosTercaGR").getContext('2d');
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, 250);
			gradientStroke.addColorStop(0, "rgba(0,161,91)");
			gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");
	
			let LancamentosTercaGR_New = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: nomeCClancamentoTercas,
					datasets: [{
						label: "Metragem cúbica",
						data: totalCClancamentoTerca,
						borderColor: gradientStroke,
						borderWidth: 0,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke
					}]
				},
				options: {
					legend: false,
					// responsive: true,
					animation: {
						onComplete: function() {
							var chartInstance = this.chart;
							var ctx = chartInstance.ctx;
							ctx.font = "12px Arial";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.textBaseline = "bottom";
	
							this.data.datasets.forEach((dataset, i) => {
								var meta = chartInstance.getDatasetMeta(i);
								meta.data.forEach((bar, index) => {
									var data = dataset.data[index];
									ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	};
	
	document.addEventListener("DOMContentLoaded", function() {
		LancamentosTercaGR();
	});



	var LancamentosQuartaGR = function() {
		if (jQuery('#LancamentosQuartaGR').length > 0) {
	
			const nomeCClancamentoQuartas = [];
			const totalCClancamentoQuarta = [];
	
			document.querySelectorAll('input[id^="nomeCClancamentoQuarta"]').forEach(input => {
				const ref = input.id.replace("nomeCClancamentoQuarta", "");
				const nome = input.value;
				const producaoInput = document.getElementById(`totalCClancamentoQuarta${ref}`);
	
				if (producaoInput) {
					const producao = parseFloat(producaoInput.value.replace(",", ".")) || 0;
					nomeCClancamentoQuartas.push(nome);
					totalCClancamentoQuarta.push(producao);
				}
			});
	
			// // MOSTRAR VALORES NO CONSOLE
			// console.log("Áreas:", nomeCClancamentoQuartas);
			// console.log("Produções:", totalCClancamentoQuarta);
	
			const ctx = document.getElementById("LancamentosQuartaGR").getContext('2d');
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, 250);
			gradientStroke.addColorStop(0, "rgba(0,161,91)");
			gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");
	
			let LancamentosQuartaGR_New = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: nomeCClancamentoQuartas,
					datasets: [{
						label: "Metragem cúbica",
						data: totalCClancamentoQuarta,
						borderColor: gradientStroke,
						borderWidth: 0,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke
					}]
				},
				options: {
					legend: false,
					// responsive: true,
					animation: {
						onComplete: function() {
							var chartInstance = this.chart;
							var ctx = chartInstance.ctx;
							ctx.font = "12px Arial";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.textBaseline = "bottom";
	
							this.data.datasets.forEach((dataset, i) => {
								var meta = chartInstance.getDatasetMeta(i);
								meta.data.forEach((bar, index) => {
									var data = dataset.data[index];
									ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	};
	
	document.addEventListener("DOMContentLoaded", function() {
		LancamentosQuartaGR();
	});


	var LancamentosQuintaGR = function() {
		if (jQuery('#LancamentosQuintaGR').length > 0) {
	
			const nomeCClancamentoQuintas = [];
			const totalCClancamentoQuinta = [];
	
			document.querySelectorAll('input[id^="nomeCClancamentoQuinta"]').forEach(input => {
				const ref = input.id.replace("nomeCClancamentoQuinta", "");
				const nome = input.value;
				const producaoInput = document.getElementById(`totalCClancamentoQuinta${ref}`);
	
				if (producaoInput) {
					const producao = parseFloat(producaoInput.value.replace(",", ".")) || 0;
					nomeCClancamentoQuintas.push(nome);
					totalCClancamentoQuinta.push(producao);
				}
			});
	
			// // MOSTRAR VALORES NO CONSOLE
			// console.log("Áreas:", nomeCClancamentoQuintas);
			// console.log("Produções:", totalCClancamentoQuinta);
	
			const ctx = document.getElementById("LancamentosQuintaGR").getContext('2d');
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, 250);
			gradientStroke.addColorStop(0, "rgba(0,161,91)");
			gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");
	
			let LancamentosQuintaGR_New = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: nomeCClancamentoQuintas,
					datasets: [{
						label: "Metragem cúbica",
						data: totalCClancamentoQuinta,
						borderColor: gradientStroke,
						borderWidth: 0,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke
					}]
				},
				options: {
					legend: false,
					// responsive: true,
					animation: {
						onComplete: function() {
							var chartInstance = this.chart;
							var ctx = chartInstance.ctx;
							ctx.font = "12px Arial";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.textBaseline = "bottom";
	
							this.data.datasets.forEach((dataset, i) => {
								var meta = chartInstance.getDatasetMeta(i);
								meta.data.forEach((bar, index) => {
									var data = dataset.data[index];
									ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	};
	
	document.addEventListener("DOMContentLoaded", function() {
		LancamentosQuintaGR();
	});
	
	var LancamentosSextaGR = function() {
		if (jQuery('#LancamentosSextaGR').length > 0) {
	
			const nomeCClancamentoSextas = [];
			const totalCClancamentoSexta = [];
	
			document.querySelectorAll('input[id^="nomeCClancamentoSexta"]').forEach(input => {
				const ref = input.id.replace("nomeCClancamentoSexta", "");
				const nome = input.value;
				const producaoInput = document.getElementById(`totalCClancamentoSexta${ref}`);
	
				if (producaoInput) {
					const producao = parseFloat(producaoInput.value.replace(",", ".")) || 0;
					nomeCClancamentoSextas.push(nome);
					totalCClancamentoSexta.push(producao);
				}
			});
	
			// // MOSTRAR VALORES NO CONSOLE
			// console.log("Áreas:", nomeCClancamentoSextas);
			// console.log("Produções:", totalCClancamentoSexta);
	
			const ctx = document.getElementById("LancamentosSextaGR").getContext('2d');
			const gradientStroke = ctx.createLinearGradient(0, 0, 0, 250);
			gradientStroke.addColorStop(0, "rgba(0,161,91)");
			gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");
	
			let LancamentosSextaGR_New = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: nomeCClancamentoSextas,
					datasets: [{
						label: "Metragem cúbica",
						data: totalCClancamentoSexta,
						borderColor: gradientStroke,
						borderWidth: 0,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke
					}]
				},
				options: {
					legend: false,
					// responsive: true,
					animation: {
						onComplete: function() {
							var chartInstance = this.chart;
							var ctx = chartInstance.ctx;
							ctx.font = "12px Arial";
							ctx.fillStyle = "#000";
							ctx.textAlign = "center";
							ctx.textBaseline = "bottom";
	
							this.data.datasets.forEach((dataset, i) => {
								var meta = chartInstance.getDatasetMeta(i);
								meta.data.forEach((bar, index) => {
									var data = dataset.data[index];
									ctx.fillText(data.toFixed(2), bar._model.x, bar._model.y - 5);
								});
							});
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes: [{
							barPercentage: 0.5
						}]
					}
				}
			});
		}
	};
	
	document.addEventListener("DOMContentLoaded", function() {
		LancamentosSextaGR();
	});



	var barChart3 = function(){
		//stalked bar chart
		if(jQuery('#barChart_3').length > 0 ){
			const barChart_3 = document.getElementById("barChart_3").getContext('2d');
			//generate gradient
			const barChart_3gradientStroke = barChart_3.createLinearGradient(50, 100, 50, 50);
			barChart_3gradientStroke.addColorStop(0, "rgba(0,161,91)");
			barChart_3gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");

			const barChart_3gradientStroke2 = barChart_3.createLinearGradient(50, 100, 50, 50);
			barChart_3gradientStroke2.addColorStop(0, "rgba(98, 126, 234, 1)");
			barChart_3gradientStroke2.addColorStop(1, "rgba(98, 126, 234, 1)");

			const barChart_3gradientStroke3 = barChart_3.createLinearGradient(50, 100, 50, 50);
			barChart_3gradientStroke3.addColorStop(0, "rgba(238, 60, 60, 1)");
			barChart_3gradientStroke3.addColorStop(1, "rgba(238, 60, 60, 1)");
			
			barChart_3.height = 100;

			let barChartData = {
				defaultFontFamily: 'Poppins',
				labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
				datasets: [{
					label: 'Red',
					backgroundColor: barChart_3gradientStroke,
					hoverBackgroundColor: barChart_3gradientStroke, 
					data: [
						'12',
						'12',
						'12',
						'12',
						'12',
						'12',
						'12'
					]
				}, {
					label: 'Green',
					backgroundColor: barChart_3gradientStroke2,
					hoverBackgroundColor: barChart_3gradientStroke2, 
					data: [
						'12',
						'12',
						'12',
						'12',
						'12',
						'12',
						'12'
					]
				}, {
					label: 'Blue',
					backgroundColor: barChart_3gradientStroke3,
					hoverBackgroundColor: barChart_3gradientStroke3, 
					data: [
						'12',
						'12',
						'12',
						'12',
						'12',
						'12',
						'12'
					]
				}]

			};

			new Chart(barChart_3, {
				type: 'bar',
				data: barChartData,
				options: {
					legend: {
						display: false
					}, 
					title: {
						display: false
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true
						}]
					}
				}
			});
		}
	}
	var lineChart1 = function(){
		
		
		if(jQuery('#lineChart_1').length > 0 ){


		//basic line chart
			const lineChart_1 = document.getElementById("lineChart_1").getContext('2d');

			Chart.controllers.line = Chart.controllers.line.extend({
				draw: function () {
					draw.apply(this, arguments);
					let nk = this.chart.chart.ctx;
					let _stroke = nk.stroke;
					nk.stroke = function () {
						nk.save();
						nk.shadowColor = 'rgba(255, 0, 0, .2)';
						nk.shadowBlur = 10;
						nk.shadowOffsetX = 0;
						nk.shadowOffsetY = 10;
						_stroke.apply(this, arguments)
						nk.restore();
					}
				}
			});
			
			lineChart_1.height = 100;

			new Chart(lineChart_1, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [25, 20, 60, 41, 66, 45, 80],
							borderColor: 'rgba(0,161,91)',
							borderWidth: "2",
							backgroundColor: 'transparent',  
							pointBackgroundColor: 'rgba(0,161,91)'
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 10
							}
						}],
						xAxes: [{
							ticks: {
								padding: 5
							}
						}]
					}
				}
			});
			
		}
	}
	
	var lineChart2 = function(){
		//gradient line chart
		if(jQuery('#lineChart_2').length > 0 ){
			
			const lineChart_2 = document.getElementById("lineChart_2").getContext('2d');
			//generate gradient
			const lineChart_2gradientStroke = lineChart_2.createLinearGradient(500, 0, 100, 0);
			lineChart_2gradientStroke.addColorStop(0, "rgba(0,161,91)");
			lineChart_2gradientStroke.addColorStop(1, "rgba(0,161,91, 0.5)");

			Chart.controllers.line = Chart.controllers.line.extend({
				draw: function () {
					draw.apply(this, arguments);
					let nk = this.chart.chart.ctx;
					let _stroke = nk.stroke;
					nk.stroke = function () {
						nk.save();
						nk.shadowColor = 'rgba(0, 0, 128, .2)';
						nk.shadowBlur = 10;
						nk.shadowOffsetX = 0;
						nk.shadowOffsetY = 10;
						_stroke.apply(this, arguments)
						nk.restore();
					}
				}
			});
				
			lineChart_2.height = 100;

			new Chart(lineChart_2, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [25, 20, 60, 41, 66, 45, 80],
							borderColor: lineChart_2gradientStroke,
							borderWidth: "2",
							backgroundColor: 'transparent', 
							pointBackgroundColor: 'rgba(0,161,91, 0.5)'
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 10
							}
						}],
						xAxes: [{ 
							ticks: {
								padding: 5
							}
						}]
					}
				}
			});
		}
	}
	var lineChart3 = function(){
		//dual line chart
		if(jQuery('#lineChart_3').length > 0 ){
			const lineChart_3 = document.getElementById("lineChart_3").getContext('2d');
			//generate gradient
			const lineChart_3gradientStroke1 = lineChart_3.createLinearGradient(500, 0, 100, 0);
			lineChart_3gradientStroke1.addColorStop(0, "rgba(0,161,91)");
			lineChart_3gradientStroke1.addColorStop(1, "rgba(0,161,91, 0.5)");

			const lineChart_3gradientStroke2 = lineChart_3.createLinearGradient(500, 0, 100, 0);
			lineChart_3gradientStroke2.addColorStop(0, "rgba(255, 92, 0, 1)");
			lineChart_3gradientStroke2.addColorStop(1, "rgba(255, 92, 0, 1)");

			Chart.controllers.line = Chart.controllers.line.extend({
				draw: function () {
					draw.apply(this, arguments);
					let nk = this.chart.chart.ctx;
					let _stroke = nk.stroke;
					nk.stroke = function () {
						nk.save();
						nk.shadowColor = 'rgba(0, 0, 0, 0)';
						nk.shadowBlur = 10;
						nk.shadowOffsetX = 0;
						nk.shadowOffsetY = 10;
						_stroke.apply(this, arguments)
						nk.restore();
					}
				}
			});
				
			lineChart_3.height = 100;

			new Chart(lineChart_3, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [25, 20, 60, 41, 66, 45, 80],
							borderColor: lineChart_3gradientStroke1,
							borderWidth: "2",
							backgroundColor: 'transparent', 
							pointBackgroundColor: 'rgba(0,161,91, 0.5)'
						}, {
							label: "My First dataset",
							data: [5, 20, 15, 41, 35, 65, 80],
							borderColor: lineChart_3gradientStroke2,
							borderWidth: "2",
							backgroundColor: 'transparent', 
							pointBackgroundColor: 'rgba(254, 176, 25, 1)'
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 10
							}
						}],
						xAxes: [{ 
							ticks: {
								padding: 5
							}
						}]
					}
				}
			});
		}
	}
	var lineChart03 = function(){
		//dual line chart
		if(jQuery('#lineChart_3Kk').length > 0 ){
			const lineChart_3Kk = document.getElementById("lineChart_3Kk").getContext('2d');
			//generate gradient
			
			Chart.controllers.line = Chart.controllers.line.extend({
				draw: function () {
					draw.apply(this, arguments);
					let nk = this.chart.chart.ctx;
					let _stroke = nk.stroke;
					nk.stroke = function () {
						nk.save();
						nk.shadowColor = 'rgba(0, 0, 0, 0)';
						nk.shadowBlur = 10;
						nk.shadowOffsetX = 0;
						nk.shadowOffsetY = 10;
						_stroke.apply(this, arguments)
						nk.restore();
					}
				}
			});
				
			lineChart_3Kk.height = 100;

			new Chart(lineChart_3Kk, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [90, 60, 80, 50, 60, 55, 80],
							borderColor: 'rgba(58,122,254,1)',
							borderWidth: "3",
							backgroundColor: 'rgba(0,0,0,0)', 
							pointBackgroundColor: 'rgba(0, 0, 0, 0)'
						}
					]
				},
				options: {
					legend: false, 
					elements: {
							point:{
								radius: 0
							}
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 10
							},
							borderWidth:3,
							display:false,
							lineTension:0.4,
						}],
						xAxes: [{ 
							ticks: {
								padding: 5
							},
							
						}]
					}
				}
			});
		}

	}	
	var areaChart1 = function(){	
		//basic area chart
		if(jQuery('#areaChart_1').length > 0 ){
			const areaChart_1 = document.getElementById("areaChart_1").getContext('2d');
    
			areaChart_1.height = 100;

			new Chart(areaChart_1, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [25, 20, 60, 41, 66, 45, 80],
							borderColor: 'rgba(0, 0, 1128, .3)',
							borderWidth: "1",
							backgroundColor: 'rgba(255,167,215,1)', 
							pointBackgroundColor: 'rgba(0, 0, 1128, .3)'
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 10
							}
						}],
						xAxes: [{ 
							ticks: {
								padding: 5
							}
						}]
					}
				}
			});
		}
	}
	var areaChart2 = function(){	
		//gradient area chart
		if(jQuery('#areaChart_2').length > 0 ){
			const areaChart_2 = document.getElementById("areaChart_2").getContext('2d');
			//generate gradient
			const areaChart_2gradientStroke = areaChart_2.createLinearGradient(0, 1, 0, 500);
			areaChart_2gradientStroke.addColorStop(0, "rgba(238, 60, 60, 0.2)");
			areaChart_2gradientStroke.addColorStop(1, "rgba(238, 60, 60, 0)");
			
			areaChart_2.height = 100;

			new Chart(areaChart_2, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [25, 20, 60, 41, 66, 45, 80],
							borderColor: "#ff2625",
							borderWidth: "4",
							backgroundColor: areaChart_2gradientStroke
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 5
							}
						}],
						xAxes: [{ 
							ticks: {
								padding: 5
							}
						}]
					}
				}
			});
		}    
	}    

	var areaChart3 = function(){	
		//gradient area chart
		if(jQuery('#areaChart_3').length > 0 ){
			const areaChart_3 = document.getElementById("areaChart_3").getContext('2d');
    
			areaChart_3.height = 100;

			new Chart(areaChart_3, {
				type: 'line',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
					datasets: [
						{
							label: "My First dataset",
							data: [25, 20, 60, 41, 66, 45, 80],
							borderColor: 'rgb(0,161,91)',
							borderWidth: "1",
							backgroundColor: 'rgba(255,167,215,1)'
						}, 
						{
							label: "My First dataset",
							data: [5, 25, 20, 41, 36, 75, 70],
							borderColor: 'rgb(255, 92, 0)',
							borderWidth: "1",
							backgroundColor: 'rgba(255, 92, 0, .5)'
						}
					]
				},
				options: {
					legend: false, 
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true, 
								max: 100, 
								min: 0, 
								stepSize: 20, 
								padding: 10
							}
						}],
						xAxes: [{ 
							ticks: {
								padding: 5
							}
						}]
					}
				}
			});
		}
	}

	var radarChart = function(){	
		if(jQuery('#radar_chart').length > 0 ){
			//radar chart
			const radar_chart = document.getElementById("radar_chart").getContext('2d');

			const radar_chartgradientStroke1 = radar_chart.createLinearGradient(500, 0, 100, 0);
			radar_chartgradientStroke1.addColorStop(0, "rgba(54, 185, 216, .5)");
			radar_chartgradientStroke1.addColorStop(1, "rgba(75, 255, 162, .5)");

			const radar_chartgradientStroke2 = radar_chart.createLinearGradient(500, 0, 100, 0);
			radar_chartgradientStroke2.addColorStop(0, "rgba(68, 0, 235, .5");
			radar_chartgradientStroke2.addColorStop(1, "rgba(68, 236, 245, .5");

			// radar_chart.height = 100;
			new Chart(radar_chart, {
				type: 'radar',
				data: {
					defaultFontFamily: 'Poppins',
					labels: [["Eating", "Dinner"], ["Drinking", "Water"], "Sleeping", ["Designing", "Graphics"], "Coding", "Cycling", "Running"],
					datasets: [
						{
							label: "My First dataset",
							data: [65, 59, 66, 45, 56, 55, 40],
							borderColor: '#f21780',
							borderWidth: "1",
							backgroundColor: radar_chartgradientStroke2
						},
						{
							label: "My Second dataset",
							data: [28, 12, 40, 19, 63, 27, 87],
							borderColor: '#f21780',
							borderWidth: "1",
							backgroundColor: radar_chartgradientStroke1
						}
					]
				},
				options: {
					legend: false,
					maintainAspectRatio: false, 
					scale: {
						ticks: {
							beginAtZero: true
						}
					}
				}
			});
		}
	}
	var pieChart = function(){
		//pie chart
		if(jQuery('#pie_chart').length > 0 ){
			//pie chart
			const pie_chart = document.getElementById("pie_chart").getContext('2d');
			// pie_chart.height = 100;
			new Chart(pie_chart, {
				type: 'pie',
				data: {
					defaultFontFamily: 'Poppins',
					datasets: [{
						data: [45, 25, 20, 10],
						borderWidth: 0, 
						backgroundColor: [
							"rgba(0,161,91, .9)",
							"rgba(0,161,91, .7)",
							"rgba(255,167,215,1)",
							"rgba(0,0,0,0.07)"
						],
						hoverBackgroundColor: [
							"rgba(0,161,91, .9)",
							"rgba(0,161,91, .7)",
							"rgba(255,167,215,1)",
							"rgba(0,0,0,0.07)"
						]

					}],
					labels: [
						"one",
						"two",
						"three", 
						"four"
					]
				},
				options: {
					responsive: true, 
					legend: false, 
					maintainAspectRatio: false
				}
			});
		}
	}
    var doughnutChart = function(){
		if(jQuery('#doughnut_chart').length > 0 ){
			//doughut chart
			const doughnut_chart = document.getElementById("doughnut_chart").getContext('2d');
			// doughnut_chart.height = 100;
			new Chart(doughnut_chart, {
				type: 'doughnut',
				data: {
					weight: 5,	
					defaultFontFamily: 'Poppins',
					datasets: [{
						data: [45, 25, 20],
						borderWidth: 3, 
						borderColor: "rgba(255,255,255,1)",
						backgroundColor: [
							"rgba(0,161,91)",
							"rgba(98, 126, 234, 1)",
							"rgba(238, 60, 60, 1)"
						],
						hoverBackgroundColor: [
							"rgba(0,161,91, 0.9)",
							"rgba(98, 126, 234, .9)",
							"rgba(238, 60, 60, .9)"
						]

					}],
					// labels: [
					//     "green",
					//     "green",
					//     "green",
					//     "green"
					// ]
				},
				options: {
					weight: 1,	
					 cutoutPercentage: 70,
					responsive: true,
					maintainAspectRatio: false
				}
			});
		}
	}
	var polarChart = function(){
		if(jQuery('#polar_chart').length > 0 ){
			//polar chart
			const polar_chart = document.getElementById("polar_chart").getContext('2d');
			// polar_chart.height = 100;
			new Chart(polar_chart, {
				type: 'polarArea',
				data: {
					defaultFontFamily: 'Poppins',
					datasets: [{
						data: [15, 18, 9, 6, 19],
						borderWidth: 0, 
						backgroundColor: [
							"rgba(0,161,91)",
							"rgba(98, 126, 234, 1)",
							"rgba(238, 60, 60, 1)",
							"rgba(54, 147, 255, 1)",
							"rgba(255, 92, 0, 1)"
						]

					}]
				},
				options: {
					responsive: true, 
					maintainAspectRatio: false
				}
			});

		}
	}



	/* Function ============ */
	return {
		init:function(){
		},
		
		
		load:function(){
			// barChart1();	
			barChart2();
			// barChart3();	
			// lineChart1();	
			// lineChart2();		
			// lineChart3();
			// lineChart03();
			// areaChart1();
			// areaChart2();
			// areaChart3();
			// radarChart();
			// pieChart();
			// doughnutChart(); 
			// polarChart(); 
			// AreaNV1();
			// LancamentosSegundaGR();
			// LancamentosTercaGR();
			// LancamentosQuartaGR();
			// LancamentosQuintaGR();
			// LancamentosSextaGR();
			// graficolancamentosterca();
		},
		
		resize:function(){
			// barChart1();	
			// barChart2();
			// barChart3();	
			// lineChart1();	
			// lineChart2();		
			// lineChart3();
			// lineChart03();
			// areaChart1();
			// areaChart2();
			// areaChart3();
			// radarChart();
			// pieChart();
			// doughnutChart(); 
			// polarChart(); 
		}
	}

}();

jQuery(document).ready(function(){
});
	
jQuery(window).on('load',function(){
	dlabSparkLine.load();
});

jQuery(window).on('resize',function(){
	//dlabSparkLine.resize();
	setTimeout(function(){ dlabSparkLine.resize(); }, 1000);
});
	
})(jQuery);