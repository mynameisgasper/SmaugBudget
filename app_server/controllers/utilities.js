//Dependencies
var dictionary = require('./Dictionary');

var data = {
    utility: true,
    fileName: 'utilities',
    welcomeMessage: 'Welcome to utilities. Here you can find some useful gadgets.',
    groupMember: [{
        id: 1,
        name: 'Grega',
        amount: '+5,00'
    },
    {   
        id: 2,
        name: 'Luka',
        amount: '-3,40'
    },
    {   
        id: 3,
        name: 'Miha',
        amount: '+2,47'
    },
    {
        id: 4,
        name: 'Gašper',
        amount: '-1,20'
    },
    {
        id: 5,
        name: 'Tim',
        amount: '+420,69'
    }],
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
};

function respond(res, session) {
    if (session.user) {
        res.render('utilities', data);
    }
    else {
        res.redirect('/');
    }
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}