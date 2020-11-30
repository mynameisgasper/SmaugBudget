function checkName(field){
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-: ]{1,16}$");
    console.log("prišeč")
    if (!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
        $('.tt5').toast('show');
        console.log("slabo " + field.value)
        return 0;
    } else {
        field.style.borderColor = "#ced4da";
        $('.tt5').toast('hide');
        console.log("dobr" +  field.value)
        return 1;
    }
}

function checkValue(field) {
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
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

function checkValue2(value, field){
    console.log(value + " " + field);
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    if(!value.match(regex)){
        field.style.setProperty("border-color", "red", "important");
        $('.tt1').toast('show')
        return 0;
    }
}

function disableButton(id) {
    var table = document.getElementById('table' + id);
    console.log(table);
    var check = true;
    var sumPrice = 0;
    var sumPaid = 0;
    for(var i = 1; i < table.rows.length; i++){
        var testValue = checkValue2(table.rows[i].cells[1].children[0].value, table.rows[i].cells[1]);
        if(testValue == 0){
            check = false;
            return false;
        }
        testValue = checkValue2(table.rows[i].cells[2].children[0].value, table.rows[i].cells[2]);
        if(testValue == 0){
            check = false;
            return false;
        }
        sumPrice += parseInt(table.rows[i].cells[1].children[0].value);
        sumPaid += parseInt(table.rows[i].cells[2].children[0].value);
    }
    if(sumPrice != sumPaid){
        $('.tt69').toast('show');
        return false;
    }
    else{
        $('.tt69').toast('hide');
        return true;
    }
}

function disableButton2() {
    var groupName = checkName(document.getElementById("inputGroupName"));
    if(groupName == 0)
        return false;

    var check = true;
    console.log("count" + counter);
    for(var i = 1; i <= counter; i++){
        var testName = checkName(document.getElementById("inputMember" + i));
        if(testName == 0){
            $('.tt6').toast('show');
            check = false
            return false;
        }
        $('.tt6').toast('hide');
    }
    return check;
}

function convertCurrency() {
    var currency1 = document.getElementById("curr1");
    var currency2 = document.getElementById("curr2");
    var amount = document.getElementById("Amount");
    var amount2 = document.getElementById("Amount2");

    if (currency1.value === currency2.value) {
        amount2.innerHTML = amount.value;
    } else {
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

$(window).on("load", function() {
    if (localStorage.getItem(page) === "false") {
        hideWelcome();
    }
});



var counter = 1;

function addNewInput() {
    if (counter >= 10) {
        alert("Only 10 members allowed");
    } else {
        counter++;
        var form = document.getElementById('inputMemberBody');
        var input = '<input type="text" onfocusout="checkName(this)" style="margin-top:4%" class="form-control" id="inputMember' + counter + '" placeholder="Member ' + counter + ' " name="inputMember' + counter + '"></input>';
        form.innerHTML = form.innerHTML + input;
        document.getElementById('counter').value = counter;
    }

}