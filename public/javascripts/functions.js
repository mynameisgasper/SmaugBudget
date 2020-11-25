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