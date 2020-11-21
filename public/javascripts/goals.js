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