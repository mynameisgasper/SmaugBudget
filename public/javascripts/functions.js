var path = window.location.pathname;
var page = path.split("/").pop();

$(window).on("load", function() {
    if (sessionStorage.getItem(page) === "false") {
        hideWelcome();
    }
})

function hideWelcome() {
    document.getElementById('welcome-alert-section').style.display = 'none';
    document.querySelectorAll('#cards-section')[0].style.marginTop = 15 + 'vh';
    sessionStorage.setItem(page, "false");
}