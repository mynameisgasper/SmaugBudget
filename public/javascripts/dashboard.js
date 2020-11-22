function disableButton() {
  var amount1 = amount(document.getElementById("Amount"));
  var date1 = date(document.getElementById("Date"));

  if (amount1 == 0|| date1 == 0) {
    return false;
  }
  else {
    return true;
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

function date(field) {
  
    if(field.value < 1 || field.value > 28) {
      field.style.borderColor = "red";
      document.getElementById("dat").innerHTML ='<div class="tekst" style="color:red">Only numbers between 1 and 28 allowed.</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("dat").innerHTML = "";
      return 1;
    }
}