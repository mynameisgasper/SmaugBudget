//Dependencies
var fs = require('fs');

function respond(res) {
    res.render('bills', ({
        title: 'bills',
        welcomeMessage:'Here you can add recurring bills. Fill in the form, submit and it will be added to an envelope repeteadly!',
        Bill: [{
            Year:2020,
            Month:12,
            Day:10,
            Category: 'Cat',
            Company: 'Meow d.o.o.',
            Price: '80',
            Currency: '€'
        },{
            Year:2020,
            Month:12,
            Day:09,
            Category: 'Gas',
            Company: 'Petrol d.d',
            Price: '500',
            Currency: '€'
        },{
            Year:2020,
            Month:12,
            Day:09,
            Category: 'Groceries',
            Company: 'Mercator',
            Price: '200',
            Currency: '€'
        }]
    }));
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}