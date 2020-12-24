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
    var name1 = nameAddEnvelopes2(document.getElementById("Payee25"));
    var date1 = dateCheckEnvelopes2(document.getElementById("inputDate15"));


    if (amount1 == 0 || name1 == 0 || date1 == 0) {
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
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt1').toast('hide')
        return 1;
    }
}

function amount3(field) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}

function amount6(field) {
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt8').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt8').toast('hide')
        return 1;
    }
}


function amount5(field, id) {
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt3').toast('hide')
        return 1;
    }
}

function nameAdd(field) {
    if (!field.disabled) {
        //var field = document.getElementById("PayeeModal");
        var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,14}$");
        //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
        if (!field.value.match(regex)) {
            field.style.setProperty("border-color", "red", "important");
            $('.tt5').toast('show');
            return 0;
        } else {
            field.style.borderColor = "#ced4da";
            $('.tt5').toast('hide')
            return 1;
        }
    } else {
        return 1;
    }


}

function dateCheckEnvelopes2(field) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] < yyyy) {
        $('.tt4').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) {
            $('.tt4').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] <= dd) {
                $('.tt4').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('.tt4').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('.tt4').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('.tt4').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
}


function nameAddEnvelopes2(field) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-16
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt2').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt2').toast('hide')
        return 1;
    }
}


function checkCategory(that) {
    if (that.value == "other") {
        document.getElementById("ime").style.display = "block";
        document.getElementById("ime").disabled = false;
        document.getElementById("ime").focus();
        document.getElementById("colorPicker").disabled = false;
        document.getElementById("colorPicker").style.display = "block";
        document.getElementById("colorPickerLabel").style.display = "inline-block";


    } else {
        document.getElementById("ime").style.display = "none";
        document.getElementById("ime").disabled = true;
        document.getElementById("colorPicker").disabled = true;
        document.getElementById("colorPicker").style.display = "none";
        document.getElementById("colorPickerLabel").style.display = "none";


    }
}

function setCurrency() {
    document.getElementById('currencyPrepend').innerHTML = document.getElementById('inputCurrency').value;
}

function deleteEnvelope(id) {
    document.getElementById('envelope' + id).style.display = 'none';
}

$(window).on("load", function() {
    if (localStorage.getItem(page) === 'false') {
        hideWelcome();
    }
});

$(window).ready(function() {
    $(".editForm").on('hidden.bs.modal', function() {
        $('.tt8').toast('hide');
    });
});