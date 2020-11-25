$(document).ready(function() {

  if(window.location.href.indexOf('#changeIncom') != -1) {
    $('#changeIncome').modal('show');
  }

});

function disableButton() {
  amount = document.getElementById("amount");
  date = document.getElementById("date");
  amount1(amount);
  date1(date);

  $.ajax({
    url: "/api/changeIncome",
    type: "post",
    data: { 
      date: date.value, 
      amount: amount.value
    },
    success: function(response) {

    },
    error: function(xhr) {
      
    }
  });

  if (amount == 0|| date == 0) {
    return false;
  }
  else {
    return true;
  }
}

function amount1(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      $('.tt1').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt1').toast('hide');
      return 1;
    }
}

function date1(field) {
  
    if(field.value < 1 || field.value > 28) {
      field.style.borderColor = "red";
      $('.tt2').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt2').toast('hide');
      return 1;
    }
}

var path = window.location.pathname;
var page = path.split("/").pop();

$(window).on("load", function() {
  if (sessionStorage.getItem(page) === "false") {
      hideWelcome();
  }

  if (window.location.pathname === '/utility') {
    document.getElementById("convert").onclick = function() {
      var currency1 = document.getElementById("curr1");
      var currency2 = document.getElementById("curr2");
      var amount = document.getElementById("Amount");
      var amount2 = document.getElementById("Amount2");
  
      if (currency1.value === currency2.value) {
      amount2.innerHTML = "1";
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
  }
})

function hideWelcome() {
    document.getElementById('welcome-alert-section').style.display = 'none';
    document.querySelectorAll('#cards-section')[0].style.marginTop = 15 + 'vh';
    sessionStorage.setItem(page, "false");
}