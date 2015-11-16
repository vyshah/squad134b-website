function showNotification() {
    var timer;
    var timeLimit = 1000 * 5;
    $(window).blur(function(e) {
        timer = setTimeout(timeout, timeLimit);
    });
    
    $(window).focus(function(e) {
        alert('Hi!')
     });
}
