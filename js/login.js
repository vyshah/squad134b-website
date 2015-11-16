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

    createNotification("test");

    console.log('reached');
    
	inputValidation();

	if(errorFlag == false)
	{	
		window.location = "../src/welcome.html?username=" + document.getElementById('usermail').value;
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

function createNotification(title) {

// Let's check if the browser supports notifications
    if (!"Notification" in window) {
      console.log("This browser does not support notifications.");
    }

    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      
      var img = '../gym-icon.png';
      var text = 'HEY! Your task "' + title + '" is now overdue.';
      var notification = new Notification('To do list', { body: text, icon: img });
      
      window.navigator.vibrate(500);
    }

    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {

        // Whatever the user answers, we make sure Chrome stores the information
        if(!('permission' in Notification)) {
          Notification.permission = permission;
        }

        // If the user is okay, let's create a notification
        if (permission === "granted") {
          var img = '/to-do-notifications/img/icon-128.png';
          var text = 'HEY! Your task "' + title + '" is now overdue.';
          var notification = new Notification('To do list', { body: text, icon: img });
          
          window.navigator.vibrate(500);
        }
      });
    }

    // At last, if the user already denied any notification, and you 
    // want to be respectful there is no need to bother him any more.

    // now we need to update the value of notified to "yes" in this particular data object, so the
    // notification won't be set off on it again

    // first open up a transaction as usual
    // var objectStore = db.transaction(['toDoList'], "readwrite").objectStore('toDoList');

    // // get the to-do list object that has this title as it's title
    // var objectStoreTitleRequest = objectStore.get(title);

    // objectStoreTitleRequest.onsuccess = function() {
    //   // grab the data object returned as the result
    //   var data = objectStoreTitleRequest.result;
      
    //   // update the notified value in the object to "yes"
    //   data.notified = "yes";
      
    //   // create another request that inserts the item back into the database
    //   var updateTitleRequest = objectStore.put(data);
      
    //   // when this new request succeeds, run the displayData() function again to update the display
    //   updateTitleRequest.onsuccess = function() {
    //     displayData();
      // }
    // }
}