$(document).ready(function() {

    if (window.location.href.indexOf('#notpremium') != -1) {
        $('.premium-page').modal('show');
    }
    if (window.location.href.indexOf('#changeIncome') != -1) {
        $('#changeIncome').modal('show');
    }
});

function disableButton() {
    amount = document.getElementById("amount");
    date = document.getElementById("date");
    amount1(amount);
    date1(date);


    if (amount == 0 || date == 0) {
        return false;
    } else {
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
        $('#changeIncome').modal('hide');
        return true;
    }

}

function amount1(field) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.removeAttribute('borderColor');
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide');
        return 1;
    }
}

function date1(field) {

    if (field.value < 1 || field.value > 28) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show');
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide');
        return 1;
    }
}

function getLastWeekExpenses() {
    $.ajax({
        url: "/api/getLastMonthExpenses",
        type: "post",
        data: {
            userId: document.getElementById("id").value,
        },
        success: function(response) {
            parseResponse(response);
            return response;
        },
        error: function(xhr) {
            console.log(xhr);
        }
    });
}

function parseResponse(response) {
    var categories = [];
    var values = [];
    var colors = [];

    for (var object of response) {
        categories.push(object.name);
        values.push(object.sum);
        colors.push(object.color);
    }

    loadGraphs(categories, values, colors);
}

$(window).on("load", function() {
    if (localStorage.getItem(page) === "false") {
        hideWelcome();
    }

    getLastWeekExpenses();
});