$(document).ready(function() {
    //fix "," at the start of connections
    var selector = document.getElementsByClassName("fixFirst");
    for (var i in selector) {
        if (selector[i].innerText) {
            selector[i].innerText = selector[i].innerText.substring(2);
        }
    }

    //pfp
    $("#addPfp").change(function(){
        readURL(this);
    });
    //$("#pfpNavBar")[0].setAttribute("src", $("#profile-pic")[0].style.backgroundImage.substring(5, $("#profile-pic")[0].style.backgroundImage.length - 2))

    $('#submitPfp').click(function(e){
        var form = document.getElementById('userPfp'); // give the form an ID
        var xhr  = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(form);                // create formData object
    
    
        xhr.onload = function() {
            console.log(this.responseText); // whatever the server returns
        }
    
        xhr.open("post", form.action);      // open connection
        xhr.send(data);                     // send data
    });

    

    //darkmode
    if (localStorage.getItem('dark') === "false") {
        $("#darkmodeEnable")[0].checked = false;
    }
    else {
        $("#darkmodeEnable")[0].checked = true;
    }
    $("#darkmodeEnable").on("change", function () {
        toggleDarkMode();
    });
});

function updateUserInfo() {
    var forms = document.forms["userInfo"];
    console.log(forms);
    disableButton();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            
            $('#profile-pic').attr('style', "background-image: url('" + e.target.result + "')").fadeIn('slow');
            $("#pfpNavBar")[0].setAttribute("src", e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function disableButton() {
    var button = document.getElementById("userInfoButton");
    var name = nameRegex();
    var surname = surnameRegex();

    if (button == 0 || name == 0 || surname == 0) {
        return false;
    } else {

        return true;
    }
}

function nameRegex() {

    var username = document.getElementById("nameInput");
    var regex = new RegExp("^([a-zA-Z])+$");
    if (!username.value.match(regex)) {
        username.style.borderColor = "red";
        $('.tt1').toast('show');
        return 0;
    } else {
        username.style.borderColor = "#ced4da";
        $('.tt1').toast('hide');
        return 1;
    }
}

function surnameRegex() {
    var username = document.getElementById("lastnameInput");
    var regex = new RegExp("^([a-zA-Z])+$");
    if (!username.value.match(regex)) {
        username.style.borderColor = "red";
        $('.tt2').toast('show')
        return 0;
    } else {
        username.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}
