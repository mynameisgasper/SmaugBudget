window.onload = function() {
    const parsedTable = parseTable(getRows());
    document.querySelector(".totaltext").innerHTML = "<h5>Total spent: " + parsedTable.sum.toFixed(2); + "€</h5>";
    loadGraphs(groupByCategories(parsedTable));
}

function getRows() {
    return document.getElementById('table').tBodies[0].rows;
}

function parseTable(rows) {
    const parsedTable = {
        sum: 0,
        data: []
    };

    for (let row of rows) {
        if(row.style.display != 'none'){
            const idNum = row.cells[0].id.substring(4);
            const year = parseInt(document.getElementById('year' + idNum).innerHTML);
            const month = convertMonthsToName(document.getElementById('month' + idNum).innerHTML);
            const day = parseInt(document.getElementById('day' + idNum).innerHTML);
            const category = document.getElementById('category' + idNum).innerHTML;
            const receiver = document.getElementById('receiver' + idNum).innerHTML;
            const currency = document.getElementById('currency' + idNum).innerHTML;
            const price = parseFloat(document.getElementById('price' + idNum).innerHTML);

            parsedTable.data.push({
                id: idNum,
                year: year,
                month: month,
                day: day,
                category: category,
                receiver: receiver,
                currency: currency,
                value: price
            });
            parsedTable.sum += price;
        }
    }
    return parsedTable;
}

//DATE PICKER
$(function() {
    var today = new Date();
    var yyyy = today.getFullYear();

    $('input[name="daterange"]').daterangepicker({
        showDropdowns: true,
        minYear: 1990,
        maxYear: yyyy,
        autoApply: true,
        opens: 'left',
        locale: {
            format: "DD/MM/YYYY",
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            fromLabel: "From",
            toLabel: "To",
            customRangeLabel: "Custom",
            weekLabel: "W",
            daysOfWeek: [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            monthNames: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            firstDay: 1,
            startDate: "10/15/1990",
            endDate: "10/21/2020",
            drops: "auto"
        }

    }, function(start, end, label) {
        //filterbyDate(start.format('DD/MM/YYYY'), end.format('DD/MM/YYYY'))
        start =  start.format('DD/MM/YYYY')
        end = end.format('DD/MM/YYYY')
        dateStart = start.split("/");
        dateEnd = end.split("/");

        ddStart = dateStart[0];
        mmStart = dateStart[1];
        yyyyStart = dateStart[2];

        ddEnd = dateEnd[0];
        mmEnd = dateEnd[1];
        yyyyEnd = dateEnd[2];

        table = document.getElementById("table");
        tr = table.getElementsByTagName("tr");

        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
            td = tr[i].getElementsByTagName("td")[0];

            txtValue = td.innerText.split("\n");
            ddCheck = txtValue[2];
            mmCheck = txtValue[1];
            yyyyCheck = txtValue[0];

            
            if (mmCheck == 'JAN') mmCheck = 1;
            else if (mmCheck == 'FEB') mmCheck = 2;
            else if (mmCheck == 'MAR') mmCheck = 3;
            else if (mmCheck == 'APR') mmCheck = 4;
            else if (mmCheck == 'MAY') mmCheck = 5;
            else if (mmCheck == 'JUN') mmCheck = 6;
            else if (mmCheck == 'JUL') mmCheck = 7;
            else if (mmCheck == 'AUG') mmCheck = 8;
            else if (mmCheck == 'SEP') mmCheck = 9;
            else if (mmCheck == 'OCT') mmCheck = 10;
            else if (mmCheck == 'NOV') mmCheck = 11;
            else if (mmCheck == 'DEC') mmCheck = 12;
            
            if (yyyyCheck < yyyyStart || yyyyCheck > yyyyEnd) {
                tr[i].style.display = "none";
            } 
            else if (yyyyCheck == yyyyStart && mmCheck < mmStart){
                tr[i].style.display = "none";
            }
            else if (yyyyCheck == yyyyStart && mmCheck == mmStart && ddCheck < ddStart){
                tr[i].style.display = "none";
            }
            else if (yyyyCheck == yyyyEnd && mmCheck > mmEnd){
                tr[i].style.display = "none";
            }
            else if (yyyyCheck == yyyyEnd && mmCheck == mmEnd && ddCheck > ddEnd){
                tr[i].style.display = "none";
            }
            else {
                tr[i].style.display = "";
            }
        }
        const parsedTable = parseTable(getRows());
        console.log(parsedTable);
        document.querySelector(".totaltext").innerHTML = "<h5>Total spent: " + parsedTable.sum.toFixed(2); + "€</h5>";
        loadGraphs(groupByCategories(parsedTable));

    });
});


function groupByCategories(parsedTable) {
    const groups = [];
    for (let entry of parsedTable.data) {
        const group = findGroupByCategory(groups, entry.category);
        if (group != null) {
            group.sum += parseInt(entry.value);
        }
        else {
            groups.push({
                name: entry.category,
                sum: entry.value
            });
        }
    }

    return groups;
}

function findGroupByCategory(groups, category) {
    for (let group of groups) {
        if (group.name == category) return group;
    }

    return null;
}

function groupByMonth(parsedTable) {
    const groups = [];

    for (let entry of parsedTable.data) {
        const group = findGroupByMonth(groups, entry.month);
        if (group != null) {
            group.sum += parseInt(entry.value);
        }
        else {
            groups.push({
                name: entry.month,
                sum: entry.value
            });

        }
    }

    return groups;
}

function findGroupByMonth(groups, month) {
    for (let group of groups) {
        if (group.name == month) return group;
    }

    return null;
}

function convertMonthsToName(month) {
    switch (month) {
        case 'JAN': return "January";
        case 'FEB': return "February";
        case 'MAR': return "March";
        case 'APR': return "April";
        case 'MAY': return "May";
        case 'JUN': return "June";
        case 'JUL': return "July";
        case 'AUG': return "August";
        case 'SEP': return "September";
        case 'OCT': return "October";
        case 'NOV': return "November";
        case 'DEC': return "December";
    }
}
// FORM VALIDATIONI
function disableButton2(id) {
    var amount1 = amount3(document.getElementById("Amount3"+id),id);
    var name = nameAdd2(document.getElementById("Payee2"+id),id);
    var date = dateCheck2(document.getElementById("inputDate"),id);
  
    if (amount1 == 0 || name == 0 || date == 0) {
      return false;
    }
    else {
      return true;
    }
  }


function nameAdd2(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    if(!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
      $('.tt1').toast('show')
      return 0;
    }
    else {
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
    if(!field.value.match(regex)) {
        field.style.setProperty("border-color", "red", "important");
      $('.tt2').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt2').toast('hide')
      return 1;
    }
}

function dateCheck2(field) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] < yyyy) { 
        $('.tt7').toast('hide');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) { 
            $('.tt7').toast('hide');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] <= dd) { 
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
//SEARCH FUNCTION
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



//HIDE WELCOME
$(window).on("load", function() {
    document.querySelector('#search').addEventListener('keyup', searchFunction, false);
    if (sessionStorage.getItem(page) === "false") {
        hideWelcome();
    }
});
