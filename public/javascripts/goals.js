/*
    Change currency display
*/

$(document).ready(function() {
    var selector = document.getElementsByClassName("currencySelector");
    var currency = document.getElementsByClassName("currencyDisplay");
    for (var i = 0; i < selector.length; i++) {
        $("#" + selector[i].id).on("change", function(event) {
            $("#currency" + event.currentTarget.id.substring(14))[0].innerHTML = event.currentTarget.selectedOptions[0].innerHTML;
        });
    }
});

function disableButton() {
    var amount1 = amount5(document.getElementById("Amount"));
    var name = nameAdd(document.getElementById("Goal"));
    var date = dateCheckAddGoal(document.getElementById("inputDateAddGoal"));
    var category = categoryCheckAddGoal(document.getElementById("inputCategory"));

    if (amount1 == 0 || name == 0 || date == 0 || category == 0) {
        return false;
    } else {
        return true;
    }
}

function disableButton2(id) {
    console.log("asd");
    var amount1 = amount77(document.getElementById("amount3"), id);
    var name = nameAdd2(document.getElementById("Goal3"), id);
    var date = dateCheck(document.getElementById("inputDate"), id);

    if (amount1 == 0 || name == 0 || date == 0) {
        return false;
    } else {
        return true;
    }
}

function disableButton3(id) {
    var amount1 = amount2(document.getElementById("Amount2"), id);

    if (amount1 == 0) {
        return false;
    } else {
        return true;
    }
}

function disableButton4() {
    var amount = amount2(document.getElementById("Amount2"));

    if (amount == 0 ) {
        return false;
    } else {
        return true;
    }
}


function categoryCheckAddGoal(field){
    if(field.value == "Select Category"){
        field.style.setProperty("border-color", "red", "important");
        $('.tt69').toast('show');
        return 0;
    }
    else {
        field.style.borderColor = "#ced4da";
        $('.tt69').toast('hide');
        return 1;
    }
}


function amount5(field) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt3').toast('show');
        return 0;
    } else {
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

function amount77(field, id) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt6').toast('show')
        console.log("222");
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt6').toast('hide')
        return 1;
    }
}

function nameAdd(field) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt4').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt4').toast('hide')
        return 1;
    }
}

function nameAdd2(field, id) {

    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$");
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt5').toast('show')
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt5').toast('hide')
        return 1;
    }
}

function dateCheck(field, id) {
    console.log(field.value);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");
    console.log(field.value);

    if(inputDate == ""){
        $('.tt7').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }

    if (inputDate[0] > yyyy) {
        $('.tt7').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] > mm) {
            $('.tt7').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] >= dd) {
                $('.tt7').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('.tt7').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('.tt7').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('.tt7').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
}

function dateCheckAddGoal(field) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if(inputDate == ""){
        $('#mjav').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }

    if (inputDate[0] > yyyy) {
        $('#mjav').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] > mm) {
            $('#mjav').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] >= dd) {
                $('#mjav').toast('hide');
                field.style.borderColor = "#ced4da";
                return 1;
            } else {
                $('#mjav').toast('show');
                field.style.setProperty("border-color", "red", "important");
                return 0;
            }
        } else {
            $('#mjav').toast('show');
            field.style.setProperty("border-color", "red", "important");
            return 0;
        }
    } else {
        $('#date-hint').toast('show');
        field.style.setProperty("border-color", "red", "important");
        return 0;
    }
}

function removeGoal(id) {
    document.getElementById('goal' + id).style.display = 'none';
}

$(window).on("load", function() {
    if (localStorage.getItem(page) === "false") {
        hideWelcome();
    }
});

$(window).ready(function(){
    $(".goalModal").on('hidden.bs.modal', function () {
        $('#mjav').toast('hide');
        $('.tt5').toast('hide');
        $('.tt6').toast('hide');
        $('.tt7').toast('hide');
        $('.tt420').toast('hide');
    });
});

function nameAddCheck(field, goals){
    console.log(field.value);
    console.log(goals);
}

