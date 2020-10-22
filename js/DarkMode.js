var darkMode = false;

function toggleDarkMode() {
    if (darkMode) {
        //turn off darkmode
        removeDarkModeCss();
    }
    else {
        //turn on darkmode
        addDarkModeCss();
    }
}

function addDarkModeCss() {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '../css/darkmode.css');
    link.setAttribute('id', 'darkmode')
    document.getElementsByTagName('head')[0].appendChild(link);
    
    document.getElementById('appearance').innerHTML = '<i class="fas fa-adjust"></i>Appearance: Dark';
    darkMode = true;
}

function removeDarkModeCss() {
    document.getElementById("darkmode").remove();

    document.getElementById('appearance').innerHTML = '<i class="fas fa-adjust"></i>Appearance: Light';
    darkMode = false;
}