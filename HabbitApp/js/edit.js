Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

var username = sessionStorage.getItem("username");
var objectId = location.search.substring(1);

var oldHabitTitle = null;
var iconString = null;
var habitToEdit = null;

window.onload = getHabitToEdit();

function getHabitToEdit() {
    var Habit = Parse.Object.extend("Habit");
    var query = new Parse.Query(Habit);
    query.get(objectId, {
        success: function (object) {
            habitToEdit = object;
            oldHabitTitle = object.get('title');
            iconString = object.get('icon');
            fillFields(oldHabitTitle, iconString);
        },
        error: function (object, error) {
            console.log(error);
        }
    });
}

function fillFields(title, icon) {
    document.getElementById("title").value = title;
    document.getElementById(icon).style.border="5px solid #42A5F5";
}

function selectImage(name) {
    //Clear all the other effects
    document.getElementById('icon1').style.border = "none";
    document.getElementById('icon2').style.border = "none";
    document.getElementById('icon3').style.border = "none";
    document.getElementById('icon4').style.border = "none";
    document.getElementById('icon5').style.border = "none";
    document.getElementById('icon6').style.border = "none";
    document.getElementById('icon7').style.border = "none";
    document.getElementById('icon8').style.border = "none";
    document.getElementById('icon9').style.border = "none";
    var image = document.getElementById(name);
    image.style.border = "5px solid #42A5F5";
    habitIcon = name;
}


function editHabit() {
    var habitTitle = document.getElementById('title').value;
    var dailyFreq = parseInt(document.getElementById('daily-frequency').value);

    var currDone = habitToEdit.get("dailyHabitCounter");
    if (currDone >= dailyFreq){
      currDone = dailyFreq;
    }

    // Set weekly frequency
    var weeklyFreq = {
        "sun": false,
        "mon": false,
        "tues": false,
        "wed": false,
        "thurs": false,
        "fri": false,
        "sat": false
    };
    Object.keys(weeklyFreq).forEach(function(key) {
        weeklyFreq[key] = document.getElementById(key).checked;
    });

    habitToEdit.set("title", habitTitle);
    habitToEdit.set("icon", iconString);
    habitToEdit.set("weeklyFreq", weeklyFreq);
    habitToEdit.set("dailyFreq", dailyFreq);
    habitToEdit.set("dailyHabitCounter", currDone);
    //alert(currDone);

    // If all the fields are filled out, save
    if(habitTitle != "" && iconString != null &&
        atLeastOneClicked(weeklyFreq)) {
          mixpanel.track("Habit has been edited");
        habitToEdit.save(null, {
            success: function (habit) {
                alert("Your habit has been edited!");
               // alert(currDone.toString());
                //document.getElementById("statusmsg").innerHTML =
                //  "You have done this " + currDone.toString() + " times today!";
               // document.getElementById("statusbar").value = currDone.toString();
               // document.getElementById("statusbar").max = dailyFreq.toString();

                window.location = "../src/newlist.html";
            },
            error: function (habit, error) {
                alert("Something went wrong. No changes were made to your habit.");
                window.location = "../src/newlist.html";
            }
        });
    } else {
        mixpanel.track("Error when editing");
        alert("One or more fields is missing!");
    }
}

function atLeastOneClicked(buttonHash) {
    var clicked = false;
    Object.keys(buttonHash).forEach(function(key) {
        if(buttonHash[key]) {
            clicked = true;
        }
    });
    return clicked;
}
