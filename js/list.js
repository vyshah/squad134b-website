Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

var username = sessionStorage.getItem("username");
var habitIconPathHash = {
    'icon1': '../img/sleep.jpg',
    'icon2': '../img/salad.jpg',
    'icon3': '../img/run.jpg'
};

var results = getHabits();

function addHabitClick() {
     mixpanel.track("Add button pressed");
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
        $(document.getElementsByClassName("opdone")[0]).attr("onclick", "checkClicked(object)");
        $(document.getElementsByClassName("habit-icon")[0]).attr("src", habitIconPathHash[iconString]);
        $(document.getElementsByClassName("op op-edit")[0]).attr("onclick", "location.href=\"edit.html?" + objectId + "\"");
        $(document.getElementsByClassName("op op-del")[0]).attr("onclick", "location.href=\"delete.html?" + objectId + "\"");

        var clonedHabitContainer = $(".habit-container.template").clone().removeClass("template");
        clonedHabitContainer.appendTo("#habit-list");
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
      location.href=#successModal2;
    }
    else {
      location.href=#successModal;
    }

  }
}
