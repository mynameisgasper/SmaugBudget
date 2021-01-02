function loadDarkMode() {
    
    if (localStorage.getItem('dark') === "false") {
        removeDarkModeCss();
    }
    else {
        addDarkModeCss();
    }
}

var darkMode = {
    isSet: false
};

function removeForLogout() {
    if (document.getElementById("darkmode")) {
        document.getElementById("darkmode").disabled = true;
        document.getElementById("darkmode").remove();
    }
}

function toggleDarkMode() {
    if (localStorage.getItem('dark') === "false") {
        //turn off darkmode
        addDarkModeCss();
    }
    else {
        //turn on darkmode
        removeDarkModeCss();
    }
    if (document.getElementById("darkmodeEnable")) {
        if (localStorage.getItem('dark') === "false") {
            $("#darkmodeEnable")[0].checked = false;
        }
        else {
            $("#darkmodeEnable")[0].checked = true;
        }
    }
}

function addDarkModeCss() {
    if (!document.getElementById('darkmode')) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        //link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'assets/stylesheets/darkmode.css');
        link.setAttribute('id', 'darkmode')
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    document.getElementById('appearanceDark').removeAttribute("style");
    document.getElementById('appearanceLight').setAttribute("style", "display: none");
    darkMode.isSet = true;
    localStorage.setItem('dark',"true");
}

function removeDarkModeCss() {
    if (document.getElementById("darkmode")) {
        document.getElementById("darkmode").disabled = true;
        document.getElementById("darkmode").remove();
    }

    document.getElementById('appearanceLight').removeAttribute("style");
    document.getElementById('appearanceDark').setAttribute("style", "display: none");
    darkMode.isSet = false;
    localStorage.setItem('dark',"false");
}