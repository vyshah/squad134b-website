
var errorFlag = false; 
var errorFoundEmpty = false;
var errorFoundEmail = false;
var errorFoundPass = false;


function addUser() {

    if (errorFoundPass == true || errorFoundEmail == true || errorFoundEmpty == true){
        return false;
    }
    var userEmail = document.getElementById('usermail').value;  
    var pass = document.getElementById('password').value;

    Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");
    
    var user = new Parse.User();
    user.set("username", userEmail);
    user.set("password", pass);
    user.set("email", userEmail);

    //var Users = Parse.Object.extend("Users");
   // var users = new Users();

   //user.set("phone", "415-392-0202");

    user.signUp(null, {
         success: function(user) {
            // Hooray! Let them use the app now.
            alert('SignUp was sucessful');
            },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            //alert("Error: " + error.code + " " + error.message);
            errorFlag = true;
            alert("The email has already been taken by another user. Please try a different one.");
            }
        });

}

function onClickSignUp() {
    

   inputValidation();
   //if no errors left, add user to database
     addUser();
    

   if (errorFlag == false)
   { 
		var signUpText = document.getElementById("signInMessage");
		signUpText.style.display = "block";
   }
   
}

function loginClick() {

	inputValidation();

	if(errorFlag == false)
	{	
		window.location = "../src/welcome.html?" + document.getElementById('usermail').value;
	}
}

function inputValidation()
{	
	errorFlag = false;

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
    }
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
        error = "The password is the wrong length. \n";
        passObj.style.background = 'Yellow';
        errorFlag = true;
        errorFoundPass =true;
        alert(error);
        return false;
 
    } else if (illegalChars.test(fld)) {
        error = "The password contains illegal characters.\n";
        passObj.style.background = 'Yellow';
        errorFlag = true;
        errorFoundPass =true;
        alert(error);
        return false;
 
    } else if ( (fld.search(/[a-zA-Z]+/)==-1) || (fld.search(/[0-9]+/)==-1) ) {
        error = "The password must contain at least one numeral.\n";
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