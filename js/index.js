function validateForm() {
  var x = document.forms["sign-in"]["username"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}