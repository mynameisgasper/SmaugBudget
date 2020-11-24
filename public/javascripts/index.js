$(window).on('beforeunload', function() {
    $('body').hide();
    $(window).scrollTop(0);
});

function disableButton() {
    var button = document.getElementById("buttonup");
    var name = nameRegex();
    var surname = surnameRegex();
    var email = emailCheckSignUp();
    var password = passwordCheckSignUp();
    var password2 = passwordStrength();

    if (button == 0 || name == 0 || surname == 0 || email == 0 || password == 0 || password2 == 0) {
        return false;
    } else {

        return true;
    }
}

function nameRegex() {

    var username = document.getElementById("nameup");
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
    var username = document.getElementById("surnameup");
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

function passwordCheckSignUp() {
    var pass1 = document.getElementById("password1up");
    var pass2 = document.getElementById("password2up");
    if (pass1.value != pass2.value) {
        pass2.style.borderColor = "red";
        $('.tt3').toast('show')
        return 0;
    } else {
        pass2.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}

function passwordStrength() {
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
    var pass = document.getElementById("password1up");
    if (pass.value.match(strongRegex)) {
        pass.style.borderColor = "green";
        $('.tt4').toast('hide')
        return 1;
    } else if (pass.value.match(mediumRegex)) {

        pass.style.borderColor = "orange";
        $('.tt4').toast('hide')
        return 1;
    } else {
        pass.style.borderColor = "red";
        $('.tt4').toast('show')
        return 0;
    }
}

function emailCheckSignUp() {
    var email1 = document.getElementById("email1up");
    var email2 = document.getElementById("email2up");
    if (email1.value != email2.value) {
        email1.style.borderColor = "red";
        email2.style.borderColor = "red";
        $('.tt5').toast('show')
        return 0;
    } else {
        email1.style.borderColor = "#ced4da";
        email2.style.borderColor = "#ced4da";
        $('.tt5').toast('hide')
        return 1;
    }
}

function submitForm() {
    //disableButton();
}

function passwordLoginSubmit(obj) {
    var password = document.getElementById('passwordin');
    var hashOne = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne.update(password.value);
    var hash = hashOne.getHash("HEX");
    password.value = hash;
}

function passwordRegisterSubmit(obj) {
    var password = document.getElementById('password1up');
    var hashOne = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne.update(password.value);
    var hash = hashOne.getHash("HEX");
    password.value = hash;
}