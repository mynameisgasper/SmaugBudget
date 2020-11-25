function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function disableButton() {
    var amount1 = amount2(document.getElementById("Amount2"));

    if (amount1 == 0) {
        return false;
    } else {
        return true;
    }
}

function disableButton2() {
    var amount1 = amount(document.getElementById("Amount"));

    if (amount1 == 0) {
        return false;
    } else {
        return true;
    }
}

function disableButton3(id) {
    var amount1 = amount3(document.getElementById("Amount3"), id);

    if (amount1 == 0) {
        return false;
    } else {
        return true;
    }
}

function amount(field) {
    console.log(field.value)
        //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.borderColor = "red";
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
}

function amount2(field) {
    console.log(field.value)
        //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.borderColor = "red";
        $('.tt2').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide')
        return 1;
    }
}

function amount3(field, id) {
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.borderColor = "red";
        $('.tt3').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}

function deleteEnvelope(id) {
    document.getElementById('envelope' + id).style.display = 'none';
}

$(window).on("load", function() {
    if (sessionStorage.getItem(page) === "false") {
        hideWelcome();
    }
});