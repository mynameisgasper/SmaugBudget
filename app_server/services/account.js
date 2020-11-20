//Dependencies
var fs = require('fs');
var responder = require('../api/responder');

function respond(res) {
    fs.readFile('../docs/account.html', "utf8", function(err, data) {
        responder.send(res, err, data, 200);
    });
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}