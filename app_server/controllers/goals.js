//Dependencies
var dictionary = require('./Dictionary');

var data = {
    fileName: 'goals',
    message: dictionary.getTranslation("messageGoals"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageGoals"),
    goal: [{
            id: 0,
            title: 'iPhone',
            progress: 100,
            target: 1200,
            targetLeft: 0,
            monthlyTarget: 0,
            category: 'Electronics',
            color: '#00cf1d',
            year: '2021',
            month: '06',
            day: '12',
        },
        {
            id: 1,
            title: 'Ferrari F8 Tributo',
            progress: 69,
            target: 1500,
            targetLeft: 1500,
            monthlyTarget: 1000,
            category: 'Car',
            year: '2021',
            month: '03',
            day: '25',
        }
    ],
    card: [{
            id: 1,
            title: 'Goals Total',
            color: 'bg-primary',
            count: 3,
            icon: 'fa-bullseye'
        },
        {
            id: 2,
            title: 'Goals Completed',
            color: 'green-panel',
            count: 1,
            icon: 'fa-check-circle',
            comment: 'iPhone 12 Pro completed!'
        }
    ],
    categories: [
        { id: 1, category: "Furniture" },
        { id: 2, category: "Electronics" },
        { id: 3, category: "Trip" },
        { id: 4, category: "Party" },
        { id: 5, category: "Wedding" },
        { id: 6, category: "Car" },
        { id: 7, category: "Other" },
    ],
    //translations main
    logout: dictionary.getTranslation("logout"),
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
    dark: dictionary.getTranslation("dark")

};

function respond(res, session) {
    if (session.user) {
        res.render('goals', data);
    } else {
        res.redirect('/');
    }
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}