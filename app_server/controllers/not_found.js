//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    fs.readFile('../docs/404notfound.html', "utf8", function(err, data) {
        responder.send(res, err, data, 404);
    });
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}