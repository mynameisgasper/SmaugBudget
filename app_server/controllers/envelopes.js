//Dependencies
var dictionary = require('./Dictionary');

var data = {
    fileName: 'envelopes',
    message: dictionary.getTranslation("messageEnvelopes"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageEnvelopes"),
    currentMonth: 'NOV',
    envelope: [{
            id: 0,
            title: 'Gas',
            progress: 69,
            totalSet: 250,
            totalCurrent: 172.5,
            color: 'rgb(0, 150, 255)',
            colorHex: '#0096FF',
            bgColor: 'rgba(0, 150, 255, 0.5)',
            month: 'NOV',
        },
        {
            id: 1,
            title: 'Groceries',
            progress: 50,
            totalSet: 350,
            totalCurrent: 175,
            color: 'rgb(0, 128, 0)',
            colorHex: '#008000',
            bgColor: 'rgba(0, 128, 0, 0.5)',
            month: 'NOV',
        },
        {
            id: 3,
            title: 'House Utilities',
            progress: 33,
            totalSet: 180,
            totalCurrent: 60,
            color: 'rgb(128, 0, 128)',
            colorHex: '#800080',
            bgColor: 'rgba(128, 0, 128, 0.5)',
            month: 'NOV',
        },
        {
            id: 4,
            title: 'Entertainment',
            progress: 90,
            totalSet: 108,
            totalCurrent: 120,
            color: 'rgb(255, 187, 51)',
            colorHex: '#FFBB33',
            bgColor: 'rgba(255, 187, 51, 0.5)',
            month: 'NOV',
        }
    ],
    card: [{
            id: 1,
            title: 'Envelopes Total',
            color: 'bg-primary',
            count: 3,
            icon: 'fa-envelope'
        },
        {
            id: 2,
            title: 'Almost Empty',
            color: 'bg-warning',
            count: 1,
            icon: 'fa-exclamation-triangle',
            comment: "Entertainment: 108 of 120 € spent!"
        },
        {
            id: 3,
            title: 'Empty',
            color: 'bg-danger',
            count: 1,
            icon: 'fa-radiation',
            comment: "No envelopes over the limit!"

        }
    ],

    /* 
     * Translations Main
     */
    logout: dictionary.getTranslation("logout"),

    /* 
     * Translations Navbar 
     */
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
    dark: dictionary.getTranslation("dark")
};

function respond(res, session) {
    if (session.user) {
        res.render('envelopes', data);
    } else {
        res.redirect('/');
    }
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}