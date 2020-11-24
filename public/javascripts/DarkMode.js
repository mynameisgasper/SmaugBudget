$( window ).on( "load", function() {
    
    if (localStorage.getItem('dark') === "false") {
        removeDarkModeCss();
    }
    else {
        addDarkModeCss();
    }
})

var darkMode = {
    isSet: false
};


function toggleDarkMode() {
    if (localStorage.getItem('dark') === "false") {
        //turn off darkmode
        addDarkModeCss();
    }
    else {
        //turn on darkmode
        removeDarkModeCss();
    }
}

function addDarkModeCss() {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', '../stylesheets/darkmode.css');
    link.setAttribute('id', 'darkmode')
    document.getElementsByTagName('head')[0].appendChild(link);
    
    document.getElementById('appearance').innerHTML = '<i class="fas fa-adjust"></i>Appearance: Dark';
    darkMode.isSet = true;
    localStorage.setItem('dark',"true");
    console.log("addDark " +localStorage.getItem('dark'));
}

function removeDarkModeCss() {
    if (document.getElementById("darkmode")) {
        document.getElementById("darkmode").remove();
    }

    document.getElementById('appearance').innerHTML = '<i class="fas fa-adjust"></i>Appearance: Light';
    darkMode.isSet = false;
    localStorage.setItem('dark',"false");
    console.log("removeDark "+localStorage.getItem('dark'));
}