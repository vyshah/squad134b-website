var username = location.search.substring(1).split("=")[1];

Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");


var results = getHabits();
displayHabits(results);

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
    var html = '';
    for(i = 0; i < results.length; i++) {
        var object = results[i];
        var habitTitle = object.get('title');
        var habitIcon = object.get('icon');

        // HTML
        html    += '<li>'
            +       '<ul class="habit-info\">'
            +           '<li><div class="habit-name">' + habitTitle + '</div></li>'
            +           '<hr class="habitdivider"><br>'
            +           '<li><img class="habit-icon" src="../img/sleep.jpg" alt="habit icon"></li>'
            +       '</ul>'
            +       '<div class="message">'
            +           '<span class="message-total">'
            +               '<strong>2</strong> days in a row! Best Record: <strong>5</strong><br>'
            +               '<p></p>'
            +               '<p class="styled">'
            +                   '<meter min="0" max="100" low="25" high="75" optimum="100" value="80">'
            +               '</p><br>'
            +               '<span class="message-today" id="result"></span>'
            +           '</span><br>'
            +       '</div>'
            +       '<div class="habit-op">'
            +           '<button type="button" class="op op-done" onclick="location.href=\'#successModal\'" title="done">'
            +               '<img src="../img/done.svg" alt="Done">'
            +           '</button>'
            +           '<button type="button" class="op op-edit" onclick="location.href=\'edit.html\'" title="edit habit">'
            +               '<img src="../img/edit.svg" alt="Edit">'
            +           '</button>'
            +           '<button type="button" class="op op-del" title="delete habit" onclick="location.href=\'#openModal\'">'
            +               '<img src="../img/delete.svg" alt="Del">'
            +           '</button>'
            +       '</div>'
            +       '<div id="openModal" class="modalbg">'
            +           '<div class="dialog">'
            +               '<a href="#close" title="Close" class="close"><center><p class="entypo-cancel-circled"></p></center></a>'
            +               '<center><h2>Are you sure you want to delete?</h2></center><p></p>'
            +               '<center><button type="button" class="op op-del" onclick="deleteHabitModal(this);" title="delete habit">'
            +                   '<img src="../img/delete.svg" alt="Del">'
            +               '</button></center>'
            +           '</div>'
            +       '</div>'
            +       '<div id="successModal" class="modalbg">'
            +           '<div class="dialog">'
            +               '<a href="#close" title="Close" class="close"><center><p class="entypo-cancel-circled"></p></center></a>'
            +               '<center><h2>Congratulations!</h2>Great job on completing this habit.<P></P></center>'
            +               '<center><button type="button" class="op op-done" onclick="clickCounter();" title="done">'
            +                   '<a href="#close"><img src="../img/done.svg" alt="Done"></a>'
            +               '</button></center>'
            +           '</div>'
            +       '</div>'
            +   '</li>'
        ;
    }

    document.getElementById("habit-list").innerHTML = html;
}
