//Dependencies
var fs = require('fs');
var responder = require('../api/responder');

function respond(req, res) {
    var confirmationCode = req.query.code;
    if (confirmationCodeValid(confirmationCode)) {
        fs.readFile('../docs/email_confirmation.html', "utf8", function(err, data) {
            responder.send(res, err, data, 200);
        });
    }
}

function confirmationCodeValid(confirmationCode) {
    return true;
}

module.exports = {
    get: function(req, res) {
        respond(req, res);
    }
}