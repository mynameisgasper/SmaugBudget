function disableButton() {
  var amount1 = amount(document.getElementById("Amount"));
  var check1 = check(document.getElementById("Payee"));
  var category = document.getElementById("selectCategory");

  if (amount1 == 0 || check1 == 0) {
    return false;
  }
  else {
    return true;
  }
}

function disableButton2() {
  var amount1 = amount(document.getElementById("Amount2"));
  var check1 = check(document.getElementById("Payee2"));

  if (amount1 == 0 || check1 == 0) {
    return false;
  }
  else {
    return true;
  }
}

function check(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[A-Za-z0-9]+$"); 
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("alerts").innerHTML ='<div class="tekst" style="color:red">Input may only contain letters A-Z and numbers.</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("alerts").innerHTML = "";
      return 1;
    }
}
function check2(field, id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[A-Za-z0-9]+$"); 
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("alarm" + id).innerHTML ='<div class="tekst" style="color:red">Input may only contain letters A-Z and numbers.</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("alarm" + id).innerHTML = "";
      return 1;
    }
}

function amount2(field, id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("amm" + id).innerHTML ='<div class="tekst" style="color:red">Input may only contain decimal numbers separated by \'.\' with max 2 decimal places.</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("amm" + id).innerHTML = "";
      return 1;
    }
}
function amount(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("amm").innerHTML ='<div class="tekst" style="color:red">Input may only contain decimal numbers separated by \'.\' with max 2 decimal places.</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("amm").innerHTML = "";
      return 1;
    }
}