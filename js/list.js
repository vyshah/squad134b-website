var username = location.search.substring(1).split("=")[1];

function addHabitClick() {
    location.href="add.html?username=" + username;
}

function getHabits() {

}