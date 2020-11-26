window.onload = function() {
    const parsedTable = parseTable(getRows());
    loadGraphs(groupByCategories(parsedTable));
}

function getRows() {
    return document.getElementById('expeseTable').tBodies[0].rows;
}

function parseTable(rows) {
    const parsedTable = {
        sum: 0,
        data: []
    };

    for (let row of rows) {
        const idNum = parseInt(row.cells[0].id.replace('date', ''));
        const year = parseInt(document.getElementById('year' + idNum).innerHTML);
        const month = convertMonthsToName(document.getElementById('month' + idNum).innerHTML);
        const day = parseInt(document.getElementById('day' + idNum).innerHTML);
        const category = document.getElementById('category' + idNum).innerHTML;
        const receiver = document.getElementById('receiver' + idNum).innerHTML;
        const currency = document.getElementById('currency' + idNum).innerHTML;
        const price = parseInt(document.getElementById('price' + idNum).innerHTML);

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

    return parsedTable;
}

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
    const groups = [
    ];

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

function disableButton2(id) {
    var amount1 = amount3(document.getElementById("Amount2"),id);
    var name = check2(document.getElementById("Goal2"),id);
    var date = dateCheck2(document.getElementById("inputDate"),id);
  
    if (amount1 == 0 || name == 0) {
      return false;
    }
    else {
      return true;
    }
  }


function nameAdd2(field,id) {
  
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
      $('.tt1').toast('none')
      return 1;
    }
}


function amount3(field, id) {
  
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
      $('.tt2').toast('none')
      return 1;
    }
}

function dateCheck2(field,id) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = field.value.split("-");

    if (inputDate[0] < yyyy) { 
        $('.tt7').toast('none');
        field.style.borderColor = "#ced4da";
        return 1;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) { 
            $('.tt7').toast('none');
            field.style.borderColor = "#ced4da";
            return 1;
        } else if (inputDate[1] == mm) {
            /* 
            ? IF DAY IS >= NOW */
            if (inputDate[2] <= dd) { 
                $('.tt7').toast('none');
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

$(window).on("load", function() {
    if (sessionStorage.getItem(page) === "false") {
        hideWelcome();
    }
});
