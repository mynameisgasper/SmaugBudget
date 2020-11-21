/*
    Change currency display
*/

$(document).ready(function() {
    var selector = document.getElementsByClassName("currencySelector");
    var currency = document.getElementsByClassName("currencyDisplay");
    console.log(currency);
    for (var i = 0; i < selector.length; i++) {
        $("#" + selector[i].id).on("change", function(event) {
            $("#currency" + event.currentTarget.id.substring(14))[0].innerHTML = event.currentTarget.selectedOptions[0].innerHTML;
        });
    }
});

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

function amount3(field, id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById(id+"amm").innerHTML ='<div class="tekst" style="color:red">Input may only contain decimal numbers separated by \'.\' with max 2 decimal places.</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById(id+"amm").innerHTML = "";
      return 1;
    }
}

function nameAdd(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById("txt1").innerHTML ='<div class="tekst" style="color:red">Input may only contain letters, numbers and some special characters. Length allowed: 1-20</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById("txt1").innerHTML = "";
      return 1;
    }
}

function nameAdd2(field,id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      document.getElementById(id+"txt").innerHTML ='<div class="tekst" style="color:red">Input may only contain letters, numbers and some special characters. Length allowed: 1-20</div>';
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      document.getElementById(id+"txt").innerHTML = "";
      return 1;
    }
}