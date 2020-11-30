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
        var file = readURL(this);
        if (file) {
            $('#submitPfp')[0].removeAttribute("disabled"); 
        } else {
            $('#submitPfp')[0].setAttribute("disabled", "disabled"); 
        }
    });
    //$("#pfpNavBar")[0].setAttribute("src", $("#profile-pic")[0].style.backgroundImage.substring(5, $("#profile-pic")[0].style.backgroundImage.length - 2))

    $('#submitPfp').click(function(e){
        var form = document.getElementById('userPfp'); // give the form an ID
        var xhr  = new XMLHttpRequest();              // create XMLHttpRequest
        var data = new FormData(form);                // create formData object
    
    
        xhr.onload = function() {
            console.log(this.responseText); // whatever the server returns
            $("#changePfp").modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
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

    $('select').selectpicker();

});

function changeLanguage(language) {
    $("#languageChange")[0].innerText = language;
    var xhr  = new XMLHttpRequest();                       

    xhr.onload = function() {
        console.log(this.responseText); 
        location.reload();
    }

    xhr.open("POST", "/account");      // open connection
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("formType=changeLanguage&language="+language);                     // send data
}

function changeCurrency(curr) {
    $("#currencyChange")[0].innerText = curr;
    var xhr  = new XMLHttpRequest();                       

    xhr.onload = function() {
        console.log(this.responseText); 
    }

    xhr.open("POST", "/account");      // open connection
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("formType=changeCurrency&currency="+curr);                     // send data
}

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

        return true;
    } else {
        return false;
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
        username.style.setProperty("border-color", "red", "important");
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
        username.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show')
        return 0;
    } else {
        username.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}

function ConNameRegex(element) {

    var regex = new RegExp("^([a-zA-Z0-9 ]){1,20}$");
    if (!element.value.match(regex)) {
        element.style.setProperty("border-color", "red", "important");
        $('.tt5').toast('show');
        return 0;
    } else {
        element.style.borderColor = "#ced4da";
        $('.tt5').toast('hide');
        return 1;
    }
}

function disableButton2(button) {
    var form = button.parentNode.parentNode;
    var name = ConNameRegex(button.parentNode.parentNode.getElementsByClassName("connectionName")[0]);

    if (name == 0) {
        return false;
    } else {
        var inputs = form.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled");
        }
        
        return true;
    }
}

var counter = 0;

function addMemberBtn(button) {
    button.parentNode.parentNode.parentNode.innerHTML = '<tr id="edit-addConTr{{_id}}" class="collapse show">' +
    '<th>' +
    '  <input type="text" name="editPerson[]" placeholder="" value="' + $("#editPersonNew")[0].value + '" class="form-control col-sm-9 col-md-9 col-lg-9 col-xl-9" disabled>' +
    '</th>' +
    '<th>' +
    '  <button type="button" class="btn btn-danger" onclick="removeConUser(this)" style="float: right;" data-toggle="collapse" data-target="#edit-addConTr{{_id}}" aria-expanded="false" aria-controls="collapseExample">' +
    '   <i class="fas fa-trash-alt"></i>' +
    '  </button>' +
    '</th>' +
    '</tr>' + $("#editPersonNew")[0].parentNode.parentNode.parentNode.innerHTML;

    $("#editPersonNew")[0].value = "";
}

function checkIfAdded(button) {
    var inputs = button.parentNode.parentNode.parentNode.getElementsByTagName("input");
    var last = "editPersonNew";
    for (var i = 0; i < inputs.length; i++) {
        if ((inputs[i].id != last) && (inputs[i].value == $("#"+last)[0].value)) {
            return true;
        }
    }

    var xhr  = new XMLHttpRequest();              // create XMLHttpRequest
        // create formData object
    
    
    xhr.onload = function() {
        console.log(xhr.status); // whatever the server returns
        if (xhr.status == 200) {
            addMemberBtn(button);
        } else {
            return true;
        }
    }

    xhr.open("post", "/api/getUserEmail");      // open connection
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("email=" + $("#"+last)[0].value);                     // send data
}

function removeConUser(element) {
    element.parentNode.parentNode.remove();
}

function passwordStrength(element) {
    //var button = document.getElementById("buttonup");
    //var email1 = document.getElementById(email1up);
    //var email2 = document.getElementById(email2up);

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    /* STRONG Passwords must be 
     * - At least 8 characters long, max length anything
     * - Include at least 1 lowercase letter
     * - 1 capital letter
     * - 1 number
     * - 1 special character => !@#$%^&**/

    /* MEDIUM Passwords must be 
     * - At least 6 characters long, max length anything
     * - Include at least 1 lowercase letter AND 1 capital letter
     *  OR
     * - Include at least 1 lowercase letter AND 1 numeric character
     *  OR
     * - Include at least 1 uppercase letter AND 1 numeric character*/
    var pass = element;
    if (pass.value.match(strongRegex)) {
        pass.style.setProperty("border-color", "green", "important");
        $('.tt3').toast('hide')
        return 1;
    } else if (pass.value.match(mediumRegex)) {

        pass.style.setProperty("border-color", "orange", "important");
        $('.tt3').toast('hide')
        return 1;
    } else {
        pass.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show')
        return 0;
    }
}

function passwordCheckSignUp() {
    var pass1 = document.getElementById("newPassword");
    var pass2 = document.getElementById("confirmPassword");
    if (pass1.value != pass2.value) {
        pass1.style.setProperty("border-color", "red", "important");
        pass2.style.setProperty("border-color", "red", "important");
        $('.tt4').toast('show')
        return 0;
    } else {
        pass1.style.borderColor = "#ced4da";
        pass2.style.borderColor = "#ced4da";
        $('.tt4').toast('hide')
        return 1;
    }
}

function passwordSubmit(obj) {
    var password1 = document.getElementById('oldPassword');
    var hashOne1 = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne1.update(password1.value);
    document.getElementById('oldPasswordHash').value = hashOne1.getHash("HEX");

    var password2 = document.getElementById('newPassword');
    var hashOne2 = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne2.update(password2.value);
    document.getElementById('newPasswordHash1').value = hashOne2.getHash("HEX");

    var password3 = document.getElementById('confirmPassword');
    var hashOne3 = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne3.update(password3.value);
    document.getElementById('newPasswordHash2').value = hashOne3.getHash("HEX");
}
