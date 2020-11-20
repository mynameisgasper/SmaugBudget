//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('history', {
        title: 'history',
        graph: {
            used: true,
            name: 'HistoryChart'
        },
        dateRangePicker: {
            used: true
        }
    });
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}