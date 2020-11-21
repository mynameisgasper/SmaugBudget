//Dependencies
var fs = require('fs');
var responder = require('../routes/responder');
var dictionary = require('./Dictionary');

function respond(res) {
    res.render('utility', ({
        utility: true,
        fileName: 'Utility',
        welcomeMessage: 'Welcome to utilities. Here you can find some useful gadgets.',
        //translations navbar
        DASHBOARD: dictionary.getTranslation("DASHBOARD"),
        ENVELOPES: dictionary.getTranslation("ENVELOPES"),
        GOALS: dictionary.getTranslation("GOALS"),
        BILLS: dictionary.getTranslation("BILLS"),
        HISTORY: dictionary.getTranslation("HISTORY"),
        UTILITIES: dictionary.getTranslation("UTILITIES"),
        user: dictionary.getTranslation("user"),
        settings: dictionary.getTranslation("settings"),
        appearance: dictionary.getTranslation("appearance"),
        light: dictionary.getTranslation("light"),
        dark: dictionary.getTranslation("dark"),
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