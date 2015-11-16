var params = location.search.substring(1).split("=");

function onStart() {
    document.getElementById("icon3").style.border="5px solid #42A5F5";

}
window.onload = onStart;

function selectImage(name) {
    //Clear all the other effects
    document.getElementById('icon1').style.border = "none";
    document.getElementById('icon2').style.border = "none";
    document.getElementById('icon3').style.border = "none";
    var image = document.getElementById(name);
    image.style.border = "5px solid #42A5F5";
}