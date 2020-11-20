function validateSignUp() {

  //var email1 = document.getElementById(email1up);
  //var email2 = document.getElementById(email2up);

  var password1 = document.getElementById(password1up);

  var regpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  var passReg = regpass.test(password1);
  alert("password: " + passReg);
}