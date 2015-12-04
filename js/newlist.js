Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

var username = sessionStorage.getItem("username");
var habitIconPathHash = {
    'icon1': '../img/sleep.jpg',
    'icon2': '../img/salad.jpg',
    'icon3': '../img/run.jpg',
    'icon4': '../img/gym.jpg',
    'icon5': '../img/study.jpg',
    'icon6': '../img/smoke.jpg',
    'icon7': '../img/7.jpg',
    'icon8': '../img/8.jpg',
    'icon9': '../img/9.jpg'
};

var results = getHabits();

function addHabitClick() {
    location.href="add.html?username=" + username;
}

// Query habits from database
function getHabits() {
    var Habit = Parse.Object.extend("Habit");
    var query = new Parse.Query(Habit);
    query.equalTo("username", username);
    query.find({
        success: function(results) {
            displayHabits(results);
        },
        error: function(error) {
            alert("An error occurred while trying to retrieve your habits.")
        }
    });
}

function displayHabits(results) {
    for(i = 0; i < results.length; i++) {
        var object = results[i];
        var habitTitle = object.get('title');
        var iconString = object.get('icon');
        var objectId = object.id;

        document.getElementsByClassName("habit-name")[0].innerHTML = habitTitle;
        $(document.getElementsByClassName("op-done")[0]).attr("onclick", "clickCounter()");
        $(document.getElementsByClassName("habit-icon")[0]).attr("src", habitIconPathHash[iconString]);
        $(document.getElementsByClassName("op-edit")[0]).attr("onclick", "location.href=\"edit.html?" + objectId + "\"");
        $(document.getElementsByClassName("op-del")[0]).attr("onclick", "location.href=\"delete.html?" + objectId + "\"");

        var clonedHabitContainer = $(".habits-container.template").clone().removeClass("template");
        clonedHabitContainer.appendTo( "#habits" );

    }
}

function checkClicked(habit){
    var limit = habit.get('dailyFreq');
    var done = habit.get('dailyHabitCounter');

     if (done >= limit){
       return;
    }

    done = done + 1;
     habit.set('dailyHabitCounter', done);
    document.getElementById("statusmsg").innerHTML =
       "You have done this " + currDone.toString() + " times today!";
     document.getElementById("statusbar").value = currDone.toString();

    if (done >= limit){
           document.getElementById("statusmsg").innerHTML =
       "You are done";
     }
    else {
                 document.getElementById("statusmsg").innerHTML =
       "You are done";
    }

  }
        function clickCounter() {
            if(typeof(Storage) !== "undefined") {
                if (localStorage.clickcount) {
                    localStorage.clickcount = Number(localStorage.clickcount)+1;
                } else {
                    localStorage.clickcount = 1;
                }
                document.getElementById("statusmsg").innerHTML = "Completed <b>" + localStorage.clickcount + "/1</b> for today!";
            } else {
                document.getElementById("statusmsg").innerHTML = "Sorry, your browser does not support web storage...";
            }
        }

