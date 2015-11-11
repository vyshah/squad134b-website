$(document).ready(function () {
    function init() {
        if (localStorage["title"]) {
            $('#title').val(localStorage["title"]);
        }
        if (localStorage["others"]) {
            $('#others').val(localStorage["others"]);
        }
        if (localStorage["mon"]) {
            $('#mon').val(localStorage["mon"]);
        }
        if (localStorage["tues"]) {
            $('#tues').val(localStorage["tues"]);
        }
        if (localStorage["wed"]) {
           $('#wed').val(localStorage["wed"]);
        }
        if (localStorage["thurs"]) {
           $('#thurs').val(localStorage["thurs"]);
        }
        if (localStorage["fri"]) {
           $('#fri').val(localStorage["fri"]);
        }
        if (localStorage["sat"]) {
           $('#sat').val(localStorage["sat"]);
        }
        if (localStorage["sun"]) {
           $('#sun').val(localStorage["sun"]);
        }
    }
    init();
});

$('.stored').keyup(function() {
    localStorage[$(this).attr('name')] = $(this).val();
});

$('#save').click(function() {
  window.localStorage.clear();
  $('#localStorage').get(0).reset();
});
