Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

var username = sessionStorage.getItem("username");
var objectId = location.search.substring(1);
var habitToDelete = null;

getHabitToDelete();

function getHabitToDelete() {
    var Habit = Parse.Object.extend("Habit");
    var query = new Parse.Query(Habit);
    query.get(objectId, {
        success: function (object) {
            habitToDelete = object;
            confirmDelete(habitToDelete);
        },
        error: function (object, error) {
            console.log(error);
        }
    });
}

function confirmDelete(habit) {
    var habitTitle = habit.get("title");
    document.getElementById("delete-confirmation").innerHTML = "Are you sure you want to delete your habit to \"" + habitTitle + "\"";
}

function deleteHabit() {
    habitToDelete.destroy({
        success: function(obj) {
            alert("Your habit was successfully deleted.");
            window.location = "../src/list.html";
        },
        error: function(obj) {
            alert("An error occurred. Your habit was not deleted.");
            window.location = "../src/list.html";
        }
    })
}