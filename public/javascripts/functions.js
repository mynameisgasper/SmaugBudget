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
                $.get('/api/converter', {curr1:currency1, curr2:currency2, amm1:amount}, function (data, textStatus, jqXHR) {
                    console.log(data);
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