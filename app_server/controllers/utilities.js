//Dependencies
var dictionary = require('./Dictionary');

var data = {
    utility: true,
    fileName: 'utilities',
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
    Friend: [{
        Group: 'Fri group',
        Next: 'Kranjec',
        Balance: '+15,3'
    }]
};

var translationKeys = {
    message: "messageUtilities",
    welcomeMessage: "welcomeMessageUtilities",
    //translations main
    logout: "logout",
    //translations navbar
    DASHBOARD: "DASHBOARD",
    ENVELOPES: "ENVELOPES",
    GOALS: "GOALS",
    BILLS: "BILLS",
    HISTORY: "HISTORY",
    UTILITIES: "UTILITIES",
    user: "user",
    settings: "settings",
    appearance: "appearance",
    light: "light",
    dark: "dark"
}

function translate (language) {
    Object.keys(translationKeys).forEach(function(key) {
        translationKeys[key] = dictionary.getTranslation(translationKeys[key], language);
    });
}

function respond(res, session) {
    if (session.user) {
        if (session.user.language) {
            translate(session.user.language);
        }
        data = {...data, ...translationKeys};
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