var n = -1;
function check(field,id) {

  if (field.id == "price"+id) {
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("amm").innerHTML ='<div class="tekst" style="color:red">Input may only contain decimal numbers separated by \'.\' with max 2 decimal places.</div>';
      n = 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("amm").innerHTML = "";
      n = 1;
    }
  }

  if (field.id == "paid"+id) {
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("amm").innerHTML ='<div class="tekst" style="color:red">Input may only contain decimal numbers separated by \'.\' with max 2 decimal places.</div>';
      n = 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("amm").innerHTML = "";
      n = 1;
    }
  }
}
function disableButton(id) {
  if (n == 0) {
    return false;
  }
  else {
    return true;
  }
}