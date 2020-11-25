function disableButton() {
  var amount1 = amount(document.getElementById("Amount"));
  var check1 = check(document.getElementById("Payee"));
  var date1 = dateCheckAddBill(document.getElementById("date-hintAdd"));

  if (amount1 == 0 || check1 == 0 || date1 == 0) {
    return false;
  }
  else {
    return true;
  }
}

function disableButton2() {
  var amount1 = amount(document.getElementById("Amount2"));
  var check1 = check(document.getElementById("Payee2"));
  var date1 = dateCheckAddBill(document.getElementById("date-hintEdit"));

  if (amount1 == 0 || check1 == 0 || date1) {
    return false;
  }
  else {
    return true;
  }
}

function check(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[A-Za-z0-9]{1,20}$"); 
    //črkev male,velike,številke
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
function check2(field, id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[A-Za-z0-9]{1,20}$"); 
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      $('.tt3').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt3').toast('hide');
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
      $('.tt4').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt4').toast('hide');
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
      $('.tt2').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt2').toast('hide');
      return 1;
    }
}

function dateCheckAddBill(field) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var inputDate = field.value.split("-");

  if (inputDate[0] > yyyy) {
      $('#date-hintAdd').toast('hide');
      field.style.borderColor = "#ced4da";
      return 1;
  } else if (inputDate[0] == yyyy) {
      if (inputDate[1] > mm) {
          $('#date-hintAdd').toast('hide');
          field.style.borderColor = "#ced4da";
          return 1;
      } else if (inputDate[1] == mm) {
          /* 
          ? IF DAY IS >= NOW */
          if (inputDate[2] >= dd) {
              $('#date-hintAdd').toast('hide');
              field.style.borderColor = "#ced4da";
              return 1;
          } else {
              $('#date-hintAdd').toast('show');
              field.style.borderColor = "red";
              return 0;
          }
      } else {
          $('#date-hintAdd').toast('show');
          field.style.borderColor = "red";
          return 0;
      }
  } else {
      $('#date-hintAdd').toast('show');
      field.style.borderColor = "red";
      return 0;
  }
}

function dateCheckEditBill(field, id) {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var inputDate = field.value.split("-");

  if (inputDate[0] > yyyy) {
      $('#date-hintEdit'+ id).toast('hide');
      field.style.borderColor = "#ced4da";
      return 1;
  } else if (inputDate[0] == yyyy) {
      if (inputDate[1] > mm) {
          $('#date-hintEdit'+ id).toast('hide');
          field.style.borderColor = "#ced4da";
          return 1;
      } else if (inputDate[1] == mm) {
          /* 
          ? IF DAY IS >= NOW */
          if (inputDate[2] >= dd) {
              $('#date-hintEdit'+ id).toast('hide');
              field.style.borderColor = "#ced4da";
              return 1;
          } else {
              $('#date-hintEdit'+ id).toast('show');
              field.style.borderColor = "red";
              return 0;
          }
      } else {
          $('#date-hintEdit'+ id).toast('show');
          field.style.borderColor = "red";
          return 0;
      }
  } else {
      $('#date-hintEdit'+ id).toast('show');
      field.style.borderColor = "red";
      return 0;
  }
}

$(window).on("load", function() {
  hideWelcome();
})

function hideWelcome() {
document.getElementById('welcome-alert-section').style.display = 'none';
document.querySelectorAll('#cards-section')[0].style.marginTop = 15 + 'vh';
sessionStorage.setItem(page, "false");
}