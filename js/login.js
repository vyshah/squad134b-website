function resetPassword(){var e=document.getElementById("usermail").value;Parse.User.requestPasswordReset(e,{success:function(){alert("Password reset sent successfully to email")},error:function(e){alert("Error: "+e.code+" "+e.message+" in the box above")}})}function addUser(){if(1==errorFoundPass||1==errorFoundEmail||1==errorFoundEmpty)return!1;var e=document.getElementById("usermail").value,r=document.getElementById("password").value,o=new Parse.User;o.set("username",e),o.set("password",r),o.set("email",e),o.signUp(null,{success:function(e){if(alert("SignUp was sucessful"),0==errorFlag){var r=document.getElementById("signInMessage");r.innerHTML="Sign Up Successful! Login ",r.style.display="block"}},error:function(e,r){errorFlag=!0,emailInParseE=!0,alert("The email is already associated with an account. Please try a different one or Login.");var o=document.getElementById("signInMessage");o.innerHTML="Email already taken. Try a different one or Login ",o.style.display="block"}})}function onClickSignUp(){var e=inputValidation();0==e&&waitForItSign()}function waitForItSign(){isPaused?setTimeout(function(){waitForIt()},1e3):(console.log("before error flag after inputValidation"),0==errorFlag&&addUser())}function loginClick(){var e=inputValidation();0==e&&userParseCheck()}function waitForItLogin(){var e=document.getElementById("usermail").value,r=document.getElementById("password").value;isPaused?setTimeout(function(){waitForIt()},800):(console.log("before error flag after inputValidation"),0==errorFlag&&(sessionStorage.setItem("username",document.getElementById("usermail").value),Parse.User.logIn(e,r,{success:function(e){window.location="../src/welcome.html"},error:function(e,r){console.log(r),console.log(e),alert("Incorrect username or password!")}})))}function userParseCheck(){var e=new Parse.Query(Parse.User),r=document.getElementById("usermail").value;e.equalTo("username",r),e.find({success:function(e){return console.log("speace"),console.log(e),e.length>0?void waitForItLogin():(alert("Username not found. Sign Up"),1)},error:function(e,r){return console.log(r),console.log("Username not found. Sign Up"),1}})}function inputValidation(){var e=0;isPaused=!0,errorFlag=!1,console.log("Inside Input inputValidation");var r=document.getElementById("usermail").value,o=document.getElementById("password"),a=document.getElementById("password").value;return IsEmpty(r,"Email"),IsEmpty(a,"Password"),0==errorFoundEmpty?(validate_email(r,"Incorrect Email Format"),0==errorFoundEmail?validatePassword(a,o):(errorFoundEmail=!1,e=1)):(errorFoundEmpty=!1,errorFoundEmail=!1,errorFoundPass=!1,e=1),1==errorFoundPass&&(errorFoundPass=!1,e=1),1==errorFlag&&(errorFlag=!1,e=1),console.log("leaving inputValidation"),isPaused=!1,e}function IsEmpty(e,r){return""==e||"undefined"==typeof e?(alert("Oops.. Please fill out the value of "+r),e.style.background="Yellow",errorFlag=!0,errorFoundEmpty=!0,!1):!0}function validate_email(field,alerttxt){with(field)return apos=field.indexOf("@"),dotpos=field.lastIndexOf("."),apos<1||dotpos-apos<2?(alert(alerttxt),errorFlag=!0,errorFoundEmail=!0,!1):!0}function validatePassword(e,r){var o="",a=/[\W_]/;if(""==e)return r.style.background="Yellow",o="You didn't enter a password.\n",errorFlag=!0,errorFoundPass=!0,alert(o),!1;if(e.length<7||e.length>15)return mixpanel.track("Password wrong length"),o="The password is the wrong length. \n",r.style.background="Yellow",errorFlag=!0,errorFoundPass=!0,alert(o),!1;if(a.test(e))mixpanel.track("Password incorrect characters"),o="The password contains illegal characters.\n";else{if(-1==e.search(/[a-zA-Z]+/)||-1==e.search(/[0-9]+/))return o="The password must contain at least one numeral and one character.\n",mixpanel.track("Password no numeral"),r.style.background="Yellow",errorFlag=!0,errorFoundPass=!0,alert(o),!1;r.style.background="White"}return!0}function loginClickWelcomeEmail(){status=inputValidationWEmail();var e=1;return 0==status&&(e=0,e=userParseCheck()),alert(status),alert(e),e}function inputValidationWEmail(){var e=0;isPaused=!0,errorFlag=!1,console.log("Inside Input inputValidationEmail");var r=document.getElementById("usermail").value;return IsEmpty(r,"Email"),0==errorFoundEmpty?(validate_email(r,"Incorrect Email Format"),0==errorFoundEmail||(errorFoundEmail=!1,e=1)):(errorFoundEmpty=!1,errorFoundEmail=!1,e=1),1==errorFlag&&(errorFlag=!1,e=1),console.log("leaving inputValidationEmail"),isPaused=!1,e}function inputValidationWPass(){var e=0;isPaused=!0,errorFlag=!1,console.log("Inside Input inputValidationPass");var r=document.getElementById("password"),o=document.getElementById("password").value;return IsEmpty(o,"Password"),0==errorFoundEmpty?validatePassword(o,r):(errorFoundEmpty=!1,errorFoundPass=!1,e=1),1==errorFoundPass&&(errorFoundPass=!1,e=1),1==errorFlag&&(errorFlag=!1,e=1),console.log("leaving inputValidationPass"),isPaused=!1,e}var errorFlag=!1,errorFoundEmpty=!1,errorFoundEmail=!1,errorFoundPass=!1,isPaused=!1,wait=!1;Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP","1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");







