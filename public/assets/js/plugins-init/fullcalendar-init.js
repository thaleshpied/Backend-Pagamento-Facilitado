"use strict";

function fullCalender(){

    const baseUrl = document.getElementById('base-url')?.getAttribute('data-url') || '';
    const rotaDados = baseUrl + "getOrdensPendentesConfirmacaoCalendario"; 

    /* carregar eventos dinâmicos */
    fetch(rotaDados)
        .then(response => response.json())
        .then(json => {

            // MAPEAMENTO DO JSON → EVENTOS DO FULLCALENDAR
            const dynamicEvents = json.data.map(item => {
                return {
                    title: item.LABEL,
                    start: formatarData(item.DATAENTREGA), 
                    allDay: true,
                    extendedProps: {
                        idmov: item.IDMOV,
                        fornecedor: item.FORNECEDOR,
                        comprador: item.COMPRADOR
                    }
                };
            });

            initCalendar(dynamicEvents);
        })
        .catch(err => console.error("Erro ao carregar eventos:", err));
}


// Função que cria o calendário com os eventos carregados
function initCalendar(eventsList){

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
		locale: 'pt-br',
        headerToolbar: {
            left: 'title,prev,next',
            right: 'today',
            center: 'dayGridMonth,dayGridWeek,dayGridDay'
			},
			buttonText: {
				today: 'Hoje',
				month: 'Mês',
				week: 'Semana',
				day: 'Dia'
        },

        selectable: true,
        selectMirror: true,
        editable: true,
        droppable: true,

        drop: function(arg) {
            if (document.getElementById('drop-remove')?.checked) {
                arg.draggedEl.parentNode.removeChild(arg.draggedEl);
            }
        },

        // Agora abre na data atual e na visão semanal sem horas
        initialDate: new Date(),
        initialView: 'dayGridWeek',

        weekNumbers: false,
        navLinks: true,
        nowIndicator: true,

        views: {
            dayGridWeek: {
                hiddenDays: [0, 6] // Ocultar sábado e domingo
            }
        },

        // EVENTOS DINÂMICOS
        events: eventsList
    });

    calendar.render();
}


// Converte "DD-MM-YYYY" → "YYYY-MM-DD"
function formatarData(dataBr) {
    const partes = dataBr.split("-");
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}


// Executa após carregar a página
jQuery(window).on('load',function(){
    setTimeout(function(){
        fullCalender();	
    }, 300);
});