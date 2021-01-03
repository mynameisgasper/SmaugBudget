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
        /*
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        //link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'assets/stylesheets/darkmode.css');
        link.setAttribute('id', 'darkmode')
        document.getElementsByTagName('head')[0].appendChild(link);
        */
       var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('id', 'darkmode');
        style.innerHTML = 'main{background:#242424!important;color:#d3d3d3!important}body a{text-decoration:none!important;color:#d3d3d3!important}body a:hover{text-decoration:none!important;color:#d3d3d3!important}body input{background:#2b2b2b!important;background-color:#2b2b2b!important;color:#fff!important;border-color:#595959!important}.fas:not(.fa-camera){color:#fff!important;opacity:.8!important}.collapse .card{background:#2b2b2b!important}.form-control{background-color:#d3d3d3}.close{color:#d3d3d3!important}.progress{opacity:.8!important}.btn-primary{opacity:.8!important}.modal-content{background:#2b2b2b!important;border-color:#595959!important}.modal input{background:#2b2b2b!important;color:#d3d3d3!important;border-color:#595959!important}.modal select{background:#2b2b2b!important;color:#fff!important;border-color:#595959!important}.modal textarea{background:#2b2b2b!important;color:#fff!important;border-color:#595959!important}.modal input:focus{background:#2b2b2b!important;color:#fff!important;border-color:#595959!important}.modal select:focus{background:#2b2b2b!important;color:#fff!important;border-color:#595959!important}.modal textarea:focus{background:#2b2b2b!important;color:#fff!important;border-color:#595959!important}.dropdown-menu{background:#2b2b2b!important}.dropdown-item{color:#d3d3d3!important}.dropdown-item:hover{background:#2b2b2b!important;color:#d3d3d3!important}.container{background:#2b2b2b!important;-webkit-box-shadow:0 1px 15px 1px #1e1e1e!important;-moz-box-shadow:0 1px 15px 1px #1e1e1e!important;box-shadow:0 1px 15px 1px #1e1e1e!important}#darkModeButton{color:#000!important}#darkModeContainerFullWidth{-webkit-box-shadow:none!important;-moz-box-shadow:none!important;box-shadow:none!important;background:#242424!important}.card-counter{opacity:.8!important;-webkit-box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important;-moz-box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important;box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important}.btn-primary{-webkit-box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important;-moz-box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important;box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important}.btn-success{-webkit-box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important;-moz-box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important;box-shadow:0 1px 15px 1px rgba(30,30,30,.5)!important}nav{-webkit-box-shadow:0 1px 15px 1px #1e1e1e!important;-moz-box-shadow:0 1px 15px 1px #1e1e1e!important;box-shadow:0 1px 15px 1px #1e1e1e!important}.footer{-webkit-box-shadow:0 1px 15px 1px #1e1e1e!important;-moz-box-shadow:0 1px 15px 1px #1e1e1e!important;box-shadow:0 1px 15px 1px #1e1e1e!important}.progress{-webkit-box-shadow:0 1px 15px 1px #1e1e1e!important;-moz-box-shadow:0 1px 15px 1px #1e1e1e!important;box-shadow:0 1px 15px 1px #1e1e1e!important}.table{color:#d3d3d3!important}#doughnut-canvas{border-color:#000!important}.bootstrap-tagsinput{background:#2b2b2b!important;border-color:#595959!important}.tabela td{color:#000!important}.tabela th{color:#fff!important}.tabela-balance #border-th{color:#000!important}.tabela-balance #border-td{color:#000!important}.tabela-balance th{color:#fff!important}.tabela-balance td{color:#fff!important}.alert{opacity:.85!important}';
        document.getElementsByTagName('head')[0].appendChild(style);
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