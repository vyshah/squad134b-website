Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP","1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8"),$(document).on("scroll",function(){$(document).scrollTop()>100?$("header").addClass("small"):$("header").removeClass("small")}),$(document).ready(function(){$(".focus").focus(),$(document).keypress(function(e){if(13==e.which){sessionStorage.setItem("username",document.getElementById("usermail").value);var s=$(".user"),o=$(".pass");if($(".focus").focus(),s.hasClass("visible"))s.removeClass("visible").fadeOut(function(){o.addClass("visible").fadeIn(function(){$(".cool").focus()})});else if(o.hasClass("visible")){o.removeClass("visible").fadeOut(function(){s.addClass("visible").fadeIn(onClickSignup())});var n=document.getElementById("usermail").value,o=document.getElementById("password").value;Parse.User.logIn(n,o,{success:function(e){window.location="newlist.html"},error:function(e,s){console.log(s),console.log(e),alert("Incorrect username or password!"),window.location="index.html"}})}}})});