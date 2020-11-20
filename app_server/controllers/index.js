
//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('index', ({
        fileName: 'index',
        index: {
            used: true
        }
    }));
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}