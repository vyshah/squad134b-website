Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

var username = sessionStorage.getItem("username");
var habitIconPathHash = {
    'icon1': '../img/sleep.jpg',
    'icon2': '../img/salad.jpg',
    'icon3': '../img/run.jpg'
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
        $(document.getElementsByClassName("op-done")[0]).attr("onclick", "location.href=#successModal'");
        $(document.getElementsByClassName("habit-icon")[0]).attr("src", habitIconPathHash[iconString]);
        $(document.getElementsByClassName("op-edit")[0]).attr("onclick", "location.href=\"edit.html?" + objectId + "\"");
        $(document.getElementsByClassName("op-del")[0]).attr("onclick", "location.href=\"delete.html?" + objectId + "\"");

        var clonedHabitContainer = $("col_1of3.template").clone().removeClass("template");
        clonedHabitContainer.appendTo("#inner_container");
    }
}
