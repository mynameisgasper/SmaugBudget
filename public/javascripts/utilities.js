var n = -1;
function check(field,id) {

  if (field.id == "price"+id) {
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.setProperty("border-color", "red", "important");
      $('.tt1').toast('show')
      n = 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt1').toast('hide')
      n = 1;
    }
  }

  if (field.id == "paid"+id) {
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.setProperty("border-color", "red", "important");
      $('.tt1').toast('show')
      n = 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt1').toast('hide')
      n = 1;
    }
  }
}

function disableButton(id) {
  if (n === 0) {
    return false;
  }
  else {
    return true;
  }
}

function convertCurrency() {
  var currency1 = document.getElementById("curr1");
  var currency2 = document.getElementById("curr2");
  var amount = document.getElementById("Amount");
  var amount2 = document.getElementById("Amount2");

  if (currency1.value === currency2.value) {
    amount2.innerHTML = amount.value;
  }
  else {
    $.ajax({
      url: "/api/converter",
      type: "get", //send it through get method
      data: { 
        curr1: currency1.value, 
        curr2: currency2.value, 
        amm1: amount.value
      },
      success: function(response) {
        amount2.innerHTML = response.value;
      },
      error: function(xhr) {
        //Do Something to handle error
      }
    });
  }
  
}

$(window).on("load", function() {
  if (sessionStorage.getItem(page) === "false") {
    hideWelcome();
  }
});