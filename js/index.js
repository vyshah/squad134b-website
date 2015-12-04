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

});
