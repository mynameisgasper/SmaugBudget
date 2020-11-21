//Dependencies
var dictionary = require('./Dictionary');

function respond(res) {
    res.render('bills', ({
        bills: true,
        fileName: 'bills',
        welcomeMessage: 'Here you can add recurring bills. Fill in the form, submit and it will be added to an envelope repeteadly!',
        bill: [{
                id: 0,
                year: 2020,
                month: 'DEC',
                day: 10,
                category: 'Cat',
                company: 'Meow d.o.o.',
                price: '80',
                currency: '€'
            },
            {
                id: 1,
                year: 2020,
                month: 'DEC',
                day: 09,
                category: 'Gas',
                company: 'Petrol d.d',
                price: '500',
                currency: '€'
            },
            {
                id: 2,
                year: 2020,
                month: 'DEC',
                day: 09,
                category: 'Groceries',
                company: 'Mercator',
                price: '200',
                currency: '€'
            }
        ],
        card: [{
                title: 'Bills Total',
                color: 'bg-primary',
                count: 2,
                icon: 'fa-paperclip'
            },
            {
                title: 'Bills This Week',
                color: 'bg-warning',
                count: 1,
                icon: 'fa-calendar'
            }
        ],
        categories: [
            { id: 1, category: "Furniture" },
            { id: 2, category: "Electronics" },
            { id: 3, category: "Trip" },
            { id: 4, category: "Party" },
            { id: 5, category: "Wedding" },
            { id: 6, category: "Car" },
            { id: 7, category: "Gas" },
            { id: 8, category: "Other" },
        ]
    }));
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}