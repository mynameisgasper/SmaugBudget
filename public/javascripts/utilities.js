var n = -1;
function check(field,id) {

  if (field.id == "price"+id) {
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
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
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
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

function currencyConverter() {
  var currency1 = document.getElementById("curr1");
  var currency2 = document.getElementById("curr2");
  var amount = document.getElementById("Amount");
  var amount2 = document.getElementById("Amount2");

  if (currency1.value === currency2.value) {
    amount2.innerHTML = "1";
  }
  else {
    //to do https://api.exchangeratesapi.io/latest?base=valuta
  }
}