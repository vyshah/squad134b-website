Parse.initialize("BoImLGZodfLfRb4hR2YkejAdYjtSnLriHunArwnP", "1oCKt23WJYH6jHrjtEqA8wCNRmva9Pfxuj32GLR8");

var username = sessionStorage.getItem("username");
var habitIcon = null;

$(document).ready(function () {
    function init() {
        if (localStorage["title"]) {
            $('#title').val(localStorage["title"]);
        }
        if (localStorage["others"]) {
            $('#others').val(localStorage["others"]);
        }
        if (localStorage["mon"]) {
            $('#mon').val(localStorage["mon"]);
        }
        if (localStorage["tues"]) {
            $('#tues').val(localStorage["tues"]);
        }
        if (localStorage["wed"]) {
           $('#wed').val(localStorage["wed"]);
        }
        if (localStorage["thurs"]) {
           $('#thurs').val(localStorage["thurs"]);
        }
        if (localStorage["fri"]) {
           $('#fri').val(localStorage["fri"]);
        }
        if (localStorage["sat"]) {
           $('#sat').val(localStorage["sat"]);
        }
        if (localStorage["sun"]) {
           $('#sun').val(localStorage["sun"]);
        }
    }
    init();
});

$('.stored').keyup(function() {
    localStorage[$(this).attr('name')] = $(this).val();
});

$('#save').click(function() {
    window.localStorage.clear();
    $('#localStorage').get(0).reset();
});

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
    iconString=name;
    habitIcon = name;
}


function addHabit() {
    mixpanel.track("Habit properly saved");
    var habitTitle = document.getElementById('title').value;
    var dailyFreq = parseInt(document.getElementById('daily-frequency').value);

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

    var Habit = new Parse.Object.extend("Habit");
    var habit = new Habit();
    habit.set("username", username);
    habit.set("title", habitTitle);
    habit.set("icon", habitIcon);
    habit.set("weeklyFreq", weeklyFreq);
    habit.set("dailyFreq", dailyFreq);
    //habit.set("dailyHabitCounter", 0);

    // If all the fields are filled out, save
    if(habitTitle != "" && habitIcon != null &&
       atLeastOneClicked(weeklyFreq)) {
        habit.save(null, {
            success: function (habit) {
                alert("Your habit has been saved!");
                window.location = "../src/newlist.html";
            },
            error: function (habit, error) {
                alert("Something went wrong. Your habit was not saved.");
                console.log(error);
                //window.location = "../src/newlist.html";
            }
        });
    } else {
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
