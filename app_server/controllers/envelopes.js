//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('envelopes', {
        fileName: 'envelopes',
        welcomeMessage: 'This is the best way to track your monthly and weekly spanding per category. Start by clicking Add Envelope.',
        envelope: [{
                title: 'Gas',
                progress: 69,
                totalSet: 250,
                totalCurrent: 172.5,
                color: '#0096ff',
                bgColor: '#9ebde3'
            },
            {
                title: 'Groceries',
                progress: 50,
                totalSet: 350,
                totalCurrent: 175,
                color: 'green',
                bgColor: 'lightgreen'
            },
            {
                title: 'House Utilities',
                progress: 33,
                totalSet: 180,
                totalCurrent: 60,
                color: 'purple',
                bgColor: 'plum'
            },
            {
                title: 'Entertainment',
                progress: 90,
                totalSet: 108,
                totalCurrent: 120,
                color: '#ffbb33',
                bgColor: '#fdce6f'
            }
        ],
        card: [{
                title: 'Envelopes Total',
                color: 'bg-primary',
                count: 3,
                icon: 'fa-envelope'
            },
            {
                title: 'Almost Empty',
                color: 'bg-warning',
                count: 1,
                icon: 'fa-exclamation-triangle'
            },
            {
                title: 'Empty',
                color: 'bg-danger',
                count: 1,
                icon: 'fa-radiation'
            }
        ]
    });
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}