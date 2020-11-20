$(window).on('beforeunload', function() {
  $('body').hide();
  $(window).scrollTop(0);
});
function validateSignUp() {

  //var email1 = document.getElementById(email1up);
  //var email2 = document.getElementById(email2up);

  var password1 = document.getElementById(password1up);

  var regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  var passReg = regpass.test(password1);
  alert("password: " + passReg);
}

function emailCheck() {
  var email1 = document.getElementById("email1up");
  var email2 = document.getElementById("email2up");
  if (email1.value != email2.value) {
    email1.style.borderColor = "red";
    email2.style.borderColor = "red";
  }
}