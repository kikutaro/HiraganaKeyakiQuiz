$(document).ready(function(){
    $('#q1a1').click(function() {
        $('.ui.basic.modal.cross').modal({
            centered: true
        }).modal('show');
    });
    $('#q1a2').click(function() {
        $('.ui.basic.modal.cross').modal({
            centered: true
        }).modal('show');
    });
    $('#q1a3').click(function() {
        $('.ui.basic.modal.tick').modal({
            centered: true
        }).modal('show');
    });
    $('#q1a4').click(function() {
        $('.ui.basic.modal.cross').modal({
            centered: true
        }).modal('show');
    });
    $('#question').transition({
        debug     : true,
        animation : 'pulse',
        duration  : 1000,
        interval  : 200
    });
    $('.ui.dropdown').dropdown();
});