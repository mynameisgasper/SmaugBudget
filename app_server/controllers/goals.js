//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('goals', {
        title: 'goals',
        welcomeMessage: 'Here you can add saving goals you want to achieve. Click Add Goal, fill in the form, submit and you`re done!',
        goal: [{
                title: 'iPhone',
                progress: 100,
                target: 1200,
                targetLeft: 0,
                monthlyTarget: 0,
                color: '#00cf1d'
            },
            {
                title: 'Ferrari F8 Tributo',
                progress: 69,
                target: 1500,
                targetLeft: 1500,
                monthlyTarget: 1000,
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
        ]
    });
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}