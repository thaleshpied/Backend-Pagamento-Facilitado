// (function($) {
//     "use strict"

//     //date picker classic default
//     $('.datepicker-default').pickadate();

// })(jQuery);

// (function($) {
//     "use strict"

//     // Inicializa o Pickadate com formato ajustado
//     $('.datepicker-default').pickadate({
//         format: 'yyyy/mm/dd',  // Formato de exibição
//         formatSubmit: 'yyyy/mm/dd',  // Formato para envio ao backend
//         // hiddenName: true, // Garante que o valor formatado para o backend seja enviado
//         // selectMonths: true,
//         // selectYears: true,
//         today: 'Hoje',
//         clear: 'Limpar',
//         close: 'Fechar',
//         closeOnSelect: true // Mantém o calendário aberto após selecionar
//     });

// })(jQuery);


(function($) {
    "use strict"

    $('.datepicker-default').pickadate({
        format: 'yyyy/mm/dd',  // Formato de exibição
        formatSubmit: 'yyyy-mm-dd',  // Formato para envio ao backend
        hiddenName: true, // Garante que o valor formatado para o backend seja enviado
        // selectMonths: true,
        // selectYears: true,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Fechar',
        closeOnSelect: true, // Mantém o calendário aberto após selecionar

        // Disparar mudança no input ao limpar a data
        onSet: function(context) {
            if (context.clear) { // Se o usuário clicou em "Limpar"
                $(this.$node).val(''); // Garante que o input seja atualizado
                $(this.$node).trigger('change'); // Dispara o evento change
            }
        }
    });

    // Evento onchange para capturar mudança no input
    $('#datepicker').on('change', function() {
        console.log('Novo valor:', $(this).val()); // Aqui você pode atualizar a lógica que precisa
    });

    // // ATUALIZANDO PREVISÃO DE DESMONTAGEM 
    // $('.datepicker-default').pickadate2({
    //     format: 'yyyy/mm/dd',  // Formato de exibição
    //     formatSubmit: 'yyyy-mm-dd',  // Formato para envio ao backend
    //     hiddenName: true, // Garante que o valor formatado para o backend seja enviado
    //     // selectMonths: true,
    //     // selectYears: true,
    //     today: 'Hoje',
    //     clear: 'Limpar',
    //     close: 'Fechar',
    //     closeOnSelect: true, // Mantém o calendário aberto após selecionar

    //     // Disparar mudança no input ao limpar a data
    //     onSet: function(context) {
    //         if (context.clear) { // Se o usuário clicou em "Limpar"
    //             $(this.$node).val(''); // Garante que o input seja atualizado
    //             $(this.$node).trigger('change'); // Dispara o evento change
    //         }
    //     }
    // });

    // Evento onchange para capturar mudança no input
    $('#datepicker').on('change', function() {
        console.log('Novo valor:', $(this).val()); // Aqui você pode atualizar a lógica que precisa
    });

    // // ATUALIZANDO DATA MONTAGEM 
    // $('.datepicker-default').pickadate3({
    //     format: 'yyyy/mm/dd',  // Formato de exibição
    //     formatSubmit: 'yyyy-mm-dd',  // Formato para envio ao backend
    //     hiddenName: true, // Garante que o valor formatado para o backend seja enviado
    //     // selectMonths: true,
    //     // selectYears: true,
    //     today: 'Hoje',
    //     clear: 'Limpar',
    //     close: 'Fechar',
    //     closeOnSelect: true, // Mantém o calendário aberto após selecionar

    //     // Disparar mudança no input ao limpar a data
    //     onSet: function(context) {
    //         if (context.clear) { // Se o usuário clicou em "Limpar"
    //             $(this.$node).val(''); // Garante que o input seja atualizado
    //             $(this.$node).trigger('change'); // Dispara o evento change
    //         }
    //     }
    // });

    // Evento onchange para capturar mudança no input
    $('#datepicker').on('change', function() {
        console.log('Novo valor:', $(this).val()); // Aqui você pode atualizar a lógica que precisa
    });

    // // ATUALIZANDO DATA DESMOTNAGEM 
    // $('.datepicker-default').pickadate4({
    //     format: 'yyyy/mm/dd',  // Formato de exibição
    //     formatSubmit: 'yyyy-mm-dd',  // Formato para envio ao backend
    //     hiddenName: true, // Garante que o valor formatado para o backend seja enviado
    //     // selectMonths: true,
    //     // selectYears: true,
    //     today: 'Hoje',
    //     clear: 'Limpar',
    //     close: 'Fechar',
    //     closeOnSelect: true, // Mantém o calendário aberto após selecionar

    //     // Disparar mudança no input ao limpar a data
    //     onSet: function(context) {
    //         if (context.clear) { // Se o usuário clicou em "Limpar"
    //             $(this.$node).val(''); // Garante que o input seja atualizado
    //             $(this.$node).trigger('change'); // Dispara o evento change
    //         }
    //     }
    // });

    // Evento onchange para capturar mudança no input
    $('#datepicker').on('change', function() {
        console.log('Novo valor:', $(this).val()); // Aqui você pode atualizar a lógica que precisa
    });

})(jQuery);
