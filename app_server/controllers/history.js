//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

var data = {
    title: 'history',
    graph: {
        used: true,
        name: 'HistoryChart'
    },
    dateRangePicker: {
        used: true
    },
    expenses: [
        {
            id: 0,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '25',
            category: 'Gas',
            receiver: 'Petrol',
            value: '50',
            currency: '$'
        },
        {
            id: 1,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '25',
            category: 'Phone',
            receiver: 'A1',
            value: '40',
            currency: '$'
        },
        {
            id: 2,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '26',
            category: 'Groceries',
            receiver: 'Mercator',
            value: '150',
            currency: '$'
        },
        {
            id: 3,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '28',
            category: 'Entertainment',
            receiver: 'Kolosej',
            value: '32',
            currency: '$'
        },
        {
            id: 4,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '28',
            category: 'Eating out',
            receiver: 'Pop\'s Place',
            value: '63',
            currency: '$'
        },
        {
            id: 5,
            year: '2020',
            monthName: 'APR',
            month: '04',
            day: '1',
            category: 'Groceries',
            receiver: 'Mercator',
            value: '120',
            currency: '$'
        }
    ]
}

function respond(res) {
    res.render('history', data);
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}