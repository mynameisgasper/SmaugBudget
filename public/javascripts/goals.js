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

function disableButton() {
  var amount1 = amount(document.getElementById("Amount"));
  var name = nameAdd(document.getElementById("Goal"));

  if (amount1 == 0 || name == 0) {
    return false;
  }
  else {
    return true;
  }
}

function disableButton2(id) {
  var amount1 = amount3(document.getElementById("Amount3"),id);
  var name = nameAdd2(document.getElementById("Goal3"),id);

  if (amount1 == 0 || name == 0) {
    return false;
  }
  else {
    return true;
  }
}

function disableButton3(id) {
  var amount1 = amount2(document.getElementById("Amount2"),id);

  if (amount1 == 0) {
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
      $('.tt3').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt3').toast('hide')
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
      $('.tt2').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt2').toast('hide')
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
      $('.tt6').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt6').toast('hide')
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
      $('.tt4').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt4').toast('hide')
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
      $('.tt5').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt5').toast('hide')
      return 1;
    }
}