//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('goals', {
        fileName: 'goals',
        welcomeMessage: 'Here you can add saving goals you want to achieve. Click Add Goal, fill in the form, submit and you`re done!',
        goal: [{
                id: 0,
                title: 'iPhone',
                progress: 100,
                target: 1200,
                targetLeft: 0,
                monthlyTarget: 0,
                category: 'Electronics',
                color: '#00cf1d',
                year: '2021',
                month: '06',
                day: '12',
            },
            {
                id: 1,
                title: 'Ferrari F8 Tributo',
                progress: 69,
                target: 1500,
                targetLeft: 1500,
                monthlyTarget: 1000,
                category: 'Car',
                year: '2021',
                month: '03',
                day: '25',
            }
        ],
        card: [{
                title: 'Goals Total',
                color: 'bg-primary',
                count: 3,
                icon: 'fa-bullseye'
            },
            {
                title: 'Goals Completed',
                color: 'green-panel',
                count: 1,
                icon: 'fa-check-circle'
            }
        ],
        categories: [
            { id: 1, category: "Furniture" },
            { id: 2, category: "Electronics" },
            { id: 3, category: "Trip" },
            { id: 4, category: "Party" },
            { id: 5, category: "Wedding" },
            { id: 6, category: "Car" },
            { id: 7, category: "Other" },
        ],

    });
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}