$(window).on('beforeunload', function() {
  $('body').hide();
  $(window).scrollTop(0);
});
function passwordStrength(password1) {

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
  * - Include at least 1 lowercase letter AND 1 number 
  *  OR
  * - Include at least 1 uppercase letter AND 1 special character => !@#$%^&**/
  if(password1.value.match(strongRegex)) {
    password1.borderColor = "green";
    document.getElementById("alerts").innerHTML = "";
  }
  else if(password1.value.match(mediumRegex)) {
    password1.borderColor = "orange";
    document.getElementById("alerts").innerHTML = "";
  }
  else {
    password1.borderColor = "red";
    document.getElementById("alerts").innerHTML = '<div class="alert alert-warning" role="alert">Strong passwords are at least 8 characters long, include at least 1 lowercase letter, 1 capital letter, 1 number and 1 special character => !@#$%^&**/</div>';
  }
}

function emailCheckSignUp() {
  var email1 = document.getElementById("email1up");
  var email2 = document.getElementById("email2up");
  if (email1.value != email2.value) {
    email1.style.borderColor = "red";
    email2.style.borderColor = "red";
    document.getElementById("alerts2").innerHTML = '<div class="alert alert-warning" role="alert">E-mails don\'t match!</div>';
  }
  else {
    email1.style.borderColor = "#ced4da";
    email2.style.borderColor = "#ced4da";
    document.getElementById("alerts2").innerHTML = "";
  }
}

function passwordCheckSignUp() {
  var pass1 = document.getElementById("password1up");
  var pass2 = document.getElementById("password2up");
  if (pass1.value != pass2.value) {
    pass1.style.borderColor = "red";
    pass2.style.borderColor = "red";
    var neki = document.getElementById("alerts3");
    neki.innerHTML = ('<div class="alert alert-warning" role="alert">Passwords don\'t match!</div>');
  }
  else {
    pass1.style.borderColor = "#ced4da";
    pass2.style.borderColor = "#ced4da";
    document.getElementById("alerts3").innerHTML = "";
  }
}