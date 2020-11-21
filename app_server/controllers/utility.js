//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('utility', ({
    utility: true,
    fileName: 'Utility',
        welcomeMessage: 'Welcome to utilities. Here you can find some useful gadgets.',
        Friend: [{
            Group: 'Fri group',
            Next: 'Kranjec',
            Balance: '+15,3'
        }]
    }));
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}