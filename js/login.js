
var errorFlag = false; 


function addUser() {

    var userEmail = document.getElementById('usermail').value;  
    Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");
    

    var Users = Parse.Object.extend("Users");
    var users = new Users();

    users.save({
        username: userEmail}, 
        {
            success: function(userObject) {
          alert('The save was successful');
        },
        error: function(userObject, error) {
          // The save failed.  Error is an instance of Parse.Error.
          // Do something if you want to do on error
        }
        });
    
}

function onClickSignUp() {

   inputValidation();

   if (errorFlag ==false)
   { 
		var signUpText = document.getElementById("signInMessage");
		signUpText.style.display = "block";
   }
   addUser();
}

function loginClick() {

	inputValidation();

	if(errorFlag == false)
	{	
		window.location = "../src/welcome.html";
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

	validate_email(userEmail, 'Incorrect Email Format');
	validatePassword(pass, passObj);
}


function IsEmpty(objectfield,stringfield)
{
    
    if(objectfield=="" || typeof objectfield == 'undefined')
    {
        alert("Oops.. Please fill out the value of "+stringfield);
        objectfield.style.background = 'Yellow';
        errorFlag = true;
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
        alert(error);
        return false;
 
    } else if ((fld.length < 7) || (fld.length > 15)) {
        error = "The password is the wrong length. \n";
        passObj.style.background = 'Yellow';
        errorFlag = true;
        alert(error);
        return false;
 
    } else if (illegalChars.test(fld)) {
        error = "The password contains illegal characters.\n";
        passObj.style.background = 'Yellow';
        errorFlag = true;
        alert(error);
        return false;
 
    } else if ( (fld.search(/[a-zA-Z]+/)==-1) || (fld.search(/[0-9]+/)==-1) ) {
        error = "The password must contain at least one numeral.\n";
        passObj.style.background = 'Yellow';
        errorFlag = true;
        alert(error);
        return false;
 
    } else {
        passObj.style.background = 'White';
    }
   return true;
}