var path = window.location.pathname;
var page = path.split("/").pop();

function hideWelcome() {
    document.getElementById('welcome-alert-section').style.display = 'none';
    document.querySelectorAll('#cards-section')[0].style.marginTop = 15 + 'vh';
    sessionStorage.setItem(page, "false");
}

Template.registerHelper("log", function(something) {
    console.log(something);
})
