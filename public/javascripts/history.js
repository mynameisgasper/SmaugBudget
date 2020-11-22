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

function disableButton() {
    var amount1 = amount(document.getElementById("Amount"));
    var name = check(document.getElementById("Payee"));
    if (amount1 == 0 || name == 0) {
      return false;
    }
    else {
      return true;
    }
}

function disableButton2(id) {
    var amount1 = amount3(document.getElementById("Amount2"),id);
    var name = check2(document.getElementById("Goal2"),id);
  
    if (amount1 == 0 || name == 0) {
      return false;
    }
    else {
      return true;
    }
  }

function amount(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika!
    //črkev male,velike,številke ne veljajo števila kot so .73, 
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      $('.tt4').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt4').toast('hide')
      return 1;
    }
}

function nameAdd(field) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      $('.tt3').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt3').toast('hide')
      return 1;
    }
}

function nameAdd2(field,id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
    //uppercase, lowercase, številke, posebni znaki, dolžina od 1-20
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      $('.tt1').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt1').toast('hide')
      return 1;
    }
}


function amount3(field, id) {
  
    //var field = document.getElementById("PayeeModal");
    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 
    //decimalna števila z največj 2ma decimalnima mestoma ločilo je pika, prva mora biti številka!
    //črkev male,velike,številke
    console.log(regex.test(field.value));
    if(!field.value.match(regex)) {
      field.style.borderColor = "red";
      $('.tt2').toast('show')
      return 0;
    }
    else {
      field.style.borderColor = "#ced4da";
      $('.tt2').toast('hide')
      return 1;
    }
}
