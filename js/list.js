var username = location.search.substring(1).split("=")[1];

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
            alert("An error occurred while trying to retreieve your habits.")
        }
    });
}

function displayHabits(results) {
    for(i = 0; i < results.length; i++) {
        console.log(results[i]);
    }
}