//Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");
//var username =
//
//console.log(username);
//sessionStorage.setItem('username', username);



$(document).ready(function(){

    $(document).scrollTop() =0;
 $('.focus').focus();
 $(document).keypress(function(e) {
  if(e.which == 13) {
    sessionStorage.setItem('username', document.getElementById('usermail').value)
    var user = $('.user');
    var pass = $('.pass');
    $('.focus').focus();
    if(user.hasClass('visible')){

      user.removeClass('visible').fadeOut(function(){
        pass.addClass('visible').fadeIn(function(){
          $('.cool').focus();
        });

      });
    }else if(pass.hasClass('visible')){

      pass.removeClass('visible').fadeOut(function(){
        user.addClass('visible').fadeIn(onClickSignup());
      });
                window.location = "newlist.html";
      
    }
  }
});

 $(document).on("scroll", function () {
  if ($(document).scrollTop() > 100) {
    $("header").addClass("small");
  } else {
    $("header").removeClass("small");
  }
});

});
