(function($) {
    "use strict"

    // Daterange picker
    $('.input-daterange-datepicker').daterangepicker({
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-danger',
        format: 'DD/MM/YYYY h:mm A',
        cancelClass: 'btn-inverse'
    });
    $('.input-daterange-timepicker').daterangepicker({
        timePicker: true,
        format: 'DD/MM/YYYY h:mm A',
        timePickerIncrement: 30,
        timePicker12Hour: true,
        timePickerSeconds: false,
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-danger',
        cancelClass: 'btn-inverse',
        minDate: '01/01/2024',
        maxDate: '01/01/2026'
    });
    $('.input-limit-datepicker').daterangepicker({
        format: 'DD/MM/YYYY',
        minDate: '01/01/2024',
        maxDate: '01/01/2025',
        buttonClasses: ['btn', 'btn-sm'],
        applyClass: 'btn-danger',
        cancelClass: 'btn-inverse'
        // dateLimit: {
        //     days: 6
        // } REMOVIDO LIMITADOR DE DIAS 
    });
})(jQuery);

