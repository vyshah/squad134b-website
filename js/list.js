var username = sessionStorage.getItem("username");
console.log(username);
var habitIconPathHash = {
    'icon1': '../img/sleep.jpg',
    'icon2': '../img/salad.jpg',
    'icon3': '../img/run.jpg'
};

Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");


var results = getHabits();

function addHabitClick() {
    location.href="add.html?username=" + username;
}

function editHabitClick(title) {
    location.href="edit.html?" + username + "|" + title; //+ "|" + icon;
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
        console.log(habitTitle);
        var iconString = object.get('icon');

        var clonedHabitContainer = $(".habit-container.template").clone().removeClass("template");

        document.getElementsByClassName("habit-name")[0].innerHTML = habitTitle;
        $(document.getElementsByClassName("habit-icon")[0]).attr("src", habitIconPathHash[iconString]);
        $(document.getElementsByClassName("op op-edit")[0]).attr("onclick", "location.href=\"edit.html?" + habitTitle + "|" + iconString + "\"");

        clonedHabitContainer.appendTo("#habit-list");
    }
}
