var errorFlag = false;
var errorFoundEmpty = false;
var errorFoundEmail = false;
var errorFoundPass = false;


var isPaused = false;

var wait = false;

Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

function resetPassword()
{

  var userEmail = document.getElementById('usermail').value;  

  Parse.User.requestPasswordReset(userEmail, {
    success: function() {
    alert("Password reset sent successfully to email");
    },
    error: function(error) {
      // Show the error message somewhere
      alert("Error: " + error.code + " " + error.message +" in the box above");
    }
  });

}
function addUser() {
    

    if (errorFoundPass == true || errorFoundEmail == true || errorFoundEmpty == true){
        return false;
    }
    var userEmail = document.getElementById('usermail').value;  
    var pass = document.getElementById('password').value;

    
    var user = new Parse.User();
    user.set("username", userEmail);
    user.set("password", pass);
    user.set("email", userEmail);

    //var Users = Parse.Object.extend("Users");
   // var users = new Users();

   //user.set("phone", "415-392-0202");   
    user.signUp( null, {
         success: function(user) {
            // Hooray! Let them use the app now.
            alert('SignUp was sucessful');
            //return emailInParse;
           
            if (errorFlag == false)
            {   var signUpText = document.getElementById("signInMessage");
                signUpText.innerHTML = "Sign Up Successful! Login "
                signUpText.style.display = "block";
            }
            
            },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            //alert("Error: " + error.code + " " + error.message);
            errorFlag = true;
            emailInParseE = true;
            alert("The email is already associated with an account. Please try a different one or Login.");
            //return emailInParse;
            var signUpText = document.getElementById("signInMessage")
            signUpText.innerHTML = "Email already taken. Try a different one or Login ";
            signUpText.style.display = "block";
            }
        });

}

function onClickSignUp() {

   var status = inputValidation(); //0 means all good, 1 means validation error
   //if no errors left, add user to database
   //console.log(isPaused);
   if  (status == 0) ///
    {
        waitForItSign();

    }    

   
};
function waitForItSign(){
        if (isPaused) {
            //console.log("about to set Timeout")

            setTimeout(function(){waitForIt()},1000);
        } else {

               console.log("before error flag after inputValidation")

                if (errorFlag == false)
                {

                    addUser();
                }
        }
}
function loginClick() {
 
	var status = inputValidation(); //will wait
    


    if (status == 0)
    {
        //checks database for user
        userParseCheck(); //will call the waitforItLogin()
       
    }

}
function waitForItLogin(){

        var userEmail = document.getElementById('usermail').value;  
        var pass = document.getElementById('password').value;
        if (isPaused) {
            //console.log("about to set Timeout")

            setTimeout(function(){waitForIt()},800);
        } else {

               console.log("before error flag after inputValidation")
                if(errorFlag == false)
                {
     
                   sessionStorage.setItem("username", document.getElementById('usermail').value);
             
                     Parse.User.logIn(userEmail, pass, {
                         success: function(user) {

                           window.location = "../src/welcome.html";
                         },
                        error: function(user, error) {
                         console.log(error);
                         console.log(user);
                         alert("Incorrect username or password!");
                         }
                    });   


                   
                }
             }
}

function userParseCheck(){

    var query = new Parse.Query(Parse.User);
    var userEmail = document.getElementById('usermail').value;  
    var state;
    query.equalTo("username",userEmail)
    //console.log(query.equalTo("username",userEmail))
    query.find({
    success: function(results) {
        console.log("speace");
        console.log(results);
        if (results.length > 0) //the array is full, then username is in database
        {
            //username is in database
             //state = 0;
             waitForItLogin();
              //0 is good
        }
        else{
            //state = 1; //bad
            alert("Username not found. Sign Up");
            return 1; //bad
        }
        

        },
    error: function (results, error){
        console.log(error);
        console.log("Username not found. Sign Up");
        return 1;
    }  
    });


}

function inputValidation()
{	
    var stat = 0;
    isPaused = true;
	errorFlag = false;
    console.log("Inside Input inputValidation")

	var userEmail = document.getElementById('usermail').value;	
	var passObj = document.getElementById('password');
	var pass = document.getElementById('password').value;

	IsEmpty(userEmail, 'Email');
	IsEmpty(pass, 'Password');
    if(errorFoundEmpty == false) {
	   validate_email(userEmail, 'Incorrect Email Format');
       if(errorFoundEmail == false){
	      validatePassword(pass, passObj);
         }
         else //if error found
         {
            errorFoundEmail = false;
            stat = 1;
         }
    }
    else //errors are found (print error and then reset flags)
    {
        errorFoundEmpty = false;
        errorFoundEmail = false;
        errorFoundPass = false;
        stat = 1;
        //return stat;
    }
    if (errorFoundPass == true)
    {
        errorFoundPass = false;
        stat = 1;
        //return stat;
    }
    if (errorFlag == true)
    {
        errorFlag = false;
        stat = 1;
        //return stat;
    }

    console.log("leaving inputValidation")
    isPaused = false;
    return stat;
    
}


function IsEmpty(objectfield,stringfield)
{
    
    if(objectfield=="" || typeof objectfield == 'undefined')
    { 
        alert("Oops.. Please fill out the value of "+stringfield);
        objectfield.style.background = 'Yellow';
        errorFlag = true;
        errorFoundEmpty = true;
        return false;


    }
    else
        return true;
}

function validate_email(field,alerttxt)
{
    with (field)
    {

        apos = field.indexOf("@");
        dotpos= field.lastIndexOf(".");
        if (apos<1||dotpos-apos<2){
            alert(alerttxt);
            errorFlag = true;
            errorFoundEmail = true;
            return false;
        }
        else {
            return true;
        }
    }
}

function validatePassword(fld, passObj ) {
    var error = "";
    var illegalChars = /[\W_]/; // allow only letters and numbers
 
    if (fld == "") {
        passObj.style.background = 'Yellow';
        error = "You didn't enter a password.\n";
        errorFlag = true;
        errorFoundPass =true;
        alert(error);
        return false;
 
    } else if ((fld.length < 7) || (fld.length > 15)) {
        mixpanel.track("Password wrong length");
        error = "The password is the wrong length. \n";
        passObj.style.background = 'Yellow';
        errorFlag = true;
        errorFoundPass =true;
        alert(error);
        return false;
 
    } else if (illegalChars.test(fld)) {
        mixpanel.track("Password incorrect characters");

        error = "The password contains illegal characters.\n";
        //passObj.style.background = 'Yellow';
        //errorFlag = true;
        //errorFoundPass =true;
        //alert(error);
        //return false;
 
    } else if ( (fld.search(/[a-zA-Z]+/)==-1) || (fld.search(/[0-9]+/)==-1) ) {
        error = "The password must contain at least one numeral and one character.\n";
        mixpanel.track("Password no numeral");
        passObj.style.background = 'Yellow';
        errorFlag = true;
        errorFoundPass =true;
        alert(error);
        return false;
 
    } else {
        passObj.style.background = 'White';
    }
   return true;
}

function loginClickWelcomeEmail() {
 
    status = inputValidationWEmail(); //will wait
    var out = 1;


    if (status == 0)
    {
        //checks database for user
        out = 0;
        out = userParseCheck(); //will call the waitforItLogin()
        // 0 is good
        // 1 is bad
    }


    alert(status);
    alert(out);
    return out;

}

function inputValidationWEmail()
{
    var stat = 0;
    isPaused = true;
    errorFlag = false;
    console.log("Inside Input inputValidationEmail")

    var userEmail = document.getElementById('usermail').value;  
    //var passObj = document.getElementById('password');
    //var pass = document.getElementById('password').value;

    IsEmpty(userEmail, 'Email');
    //IsEmpty(pass, 'Password');
    if(errorFoundEmpty == false) {
       validate_email(userEmail, 'Incorrect Email Format');
       if(errorFoundEmail == false){
          //validatePassword(pass, passObj);
         }
         else //if error found
         {
            errorFoundEmail = false;
            stat = 1;
         }
    }
    else //errors are found (print error and then reset flags)
    {
        errorFoundEmpty = false;
        errorFoundEmail = false;
        //errorFoundPass = false;
        stat = 1;
        //return stat;
    }
   /* if (errorFoundPass == true)
    {
        errorFoundPass = false;
        stat = 1;
        //return stat;
    }*/
    if (errorFlag == true)
    {
        errorFlag = false;
        stat = 1;
        //return stat;
    }

    console.log("leaving inputValidationEmail")
    isPaused = false;
    return stat;
}

function inputValidationWPass()
{
    var stat = 0;
    isPaused = true;
    errorFlag = false;
    console.log("Inside Input inputValidationPass")

    //var userEmail = document.getElementById('usermail').value;  
    var passObj = document.getElementById('password');
    var pass = document.getElementById('password').value;

    //IsEmpty(userEmail, 'Email');
    IsEmpty(pass, 'Password');
    if(errorFoundEmpty == false) {

          validatePassword(pass, passObj);

    }
    else //errors are found (print error and then reset flags)
    {
        errorFoundEmpty = false;
        //errorFoundEmail = false;
        errorFoundPass = false;
        stat = 1;
        //return stat;
    }
   if (errorFoundPass == true)
    {
        errorFoundPass = false;
        stat = 1;
        //return stat;
    }
    if (errorFlag == true)
    {
        errorFlag = false;
        stat = 1;
        //return stat;
    }

    console.log("leaving inputValidationPass")
    isPaused = false;
    return stat;
}







