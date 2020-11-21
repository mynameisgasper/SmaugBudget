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