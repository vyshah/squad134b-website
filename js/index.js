//Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");
//var username =
//
//console.log(username);
//sessionStorage.setItem('username', username);

Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");


$(document).on("scroll", function () {
  if ($(document).scrollTop() > 100) {
    $("header").addClass("small");
  } else {
    $("header").removeClass("small");
  }
});

$(document).ready(function(){

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
  
        var userEmail = document.getElementById('usermail').value;  
        var pass = document.getElementById('password').value;
        Parse.User.logIn(userEmail, pass, {
           success: function(user) {

             window.location = "newlist.html";
           },
          error: function(user, error) {
           console.log(error);
           console.log(user);
           alert("Incorrect username or password!");
           window.location = "index.html";

           }
      });    
    }
  }
});

});
