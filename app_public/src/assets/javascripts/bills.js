function disableButton() {
  var amount1 = amount(document.getElementById("Amount"));
  var check1 = check(document.getElementById("Payee"));
  var date1 = dateCheckAddBill(document.getElementById("inputDateAddBill"));
  if (amount1 == 0 || check1 == 0 || date1 == 0) {
    return false;
  }
  else {
    return true;
  }
}

function disableButton2(id) {
  var amount1 = amount(document.getElementById("Amount2"+id));
  var check1 = check(document.getElementById("Payee2"+id));
  var date1 = dateCheckAddBill(document.getElementById("inputDate"+id));
  console.log(amount1 + " " + check1 + " " + date1);
  if (amount1 == 0 || check1 == 0 || date1) {
    return false;
  }
  else {
    return true;
  }
}

function check(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,20}$"); 
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.setProperty("border-color", "red", "important");
      $('.tt1').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt1').toast('hide');
      return 1;
    }
}
function check2(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,20}$"); 
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.setProperty("border-color", "red", "important");
      $('.tt3').toast('show');
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt3').toast('hide');
      return 1;
    }
}

function amount2(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if(!field.value.match(regex)) {
      field.style.setProperty("border-color", "red", "important");
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
    if(!field.value.match(regex)) {
      field.style.setProperty("border-color", "red", "important");
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
      $('.tt5').toast('hide');
      field.style.borderColor = "#ced4da";
      return 1;
  } else if (inputDate[0] == yyyy) {
      if (inputDate[1] > mm) {
          $('.tt5').toast('hide');
          field.style.borderColor = "#ced4da";
          return 1;
      } else if (inputDate[1] == mm) {
          /* 
          ? IF DAY IS >= NOW */
          if (inputDate[2] >= dd) {
              $('.tt5').toast('hide');
              field.style.borderColor = "#ced4da";
              return 1;
          } else {
              $('.tt5').toast('show');
              field.style.setProperty("border-color", "red", "important");
              return 0;
          }
      } else {
          $('.tt5').toast('show');
          field.style.setProperty("border-color", "red", "important");
          return 0;
      }
  } else {
      $('.tt5').toast('show');
      field.style.setProperty("border-color", "red", "important");
      return 0;
  }
}

function dateCheckEditBill(field) {
  id = field.id.substr(9);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var inputDate = field.value.split("-");

  if (inputDate[0] > yyyy) {
      $(".tt6").toast('hide');
      field.style.borderColor = "#ced4da";
      return 1;
  } else if (inputDate[0] == yyyy) {
      if (inputDate[1] > mm) {
        $(".tt6").toast('hide');
          field.style.borderColor = "#ced4da";
          return 1;
      } else if (inputDate[1] == mm) {
          /* 
          ? IF DAY IS >= NOW */
          if (inputDate[2] >= dd) {
            $(".tt6").toast('hide');
              field.style.borderColor = "#ced4da";
              return 1;
          } else {
            $(".tt6").toast('show');
              field.style.setProperty("border-color", "red", "important");
              return 0;
          }
      } else {
        $(".tt6").toast('show');
          field.style.setProperty("border-color", "red", "important");
          return 0;
      }
  } else {
    $(".tt6").toast('show');
      field.style.setProperty("border-color", "red", "important");
      return 0;
  }
}

function searchFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[2];

      txtValue = td.textContent || td.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
      } else {
          txtValue = td2.textContent || td2.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}

$(window).on("load", function() {
  document.querySelector('#search').addEventListener('keyup', searchFunction, false);
  if (localStorage.getItem(page) === "false") {
    hideWelcome();
  }
});

$(window).ready(function(){
  $(".billModal").on('hidden.bs.modal', function () {
      $('.tt3').toast('hide');
      $('.tt4').toast('hide');
      $('.tt5').toast('hide');
  });
});
