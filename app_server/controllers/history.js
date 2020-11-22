//Dependencies
var dictionary = require('./Dictionary');

var data = {
    fileName: 'history',
    welcomeMessage: 'This is the best way to check your past spending by time and category.',
    graph: {
        used: true,
        name: 'HistoryChart'
    },
    dateRangePicker: {
        used: true
    },
    totalExpenses: 335,
    expenses: [
        {
            id: 0,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '25',
            category: 'Gas',
            receiver: 'Petrol',
            value: '50',
            currency: '$'
        },
        {
            id: 1,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '25',
            category: 'Phone',
            receiver: 'A1',
            value: '40',
            currency: '$'
        },
        {
            id: 2,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '26',
            category: 'Groceries',
            receiver: 'Mercator',
            value: '150',
            currency: '$'
        },
        {
            id: 3,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '28',
            category: 'Entertainment',
            receiver: 'Kolosej',
            value: '32',
            currency: '$'
        },
        {
            id: 4,
            year: '2020',
            monthName: 'MAR',
            month: '03',
            day: '28',
            category: 'Eating out',
            receiver: 'Pop\'s Place',
            value: '63',
            currency: '$'
        },
        {
            id: 5,
            year: '2020',
            monthName: 'APR',
            month: '04',
            day: '1',
            category: 'Groceries',
            receiver: 'Mercator',
            value: '120',
            currency: '$'
        }
    ],
    categories: [
        { id: 1, category: "Furniture" },
        { id: 2, category: "Electronics" },
        { id: 3, category: "Trip" },
        { id: 4, category: "Party" },
        { id: 5, category: "Wedding" },
        { id: 6, category: "Car" },
        { id: 7, category: "Gas" },
        { id: 8, category: "Other" },
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
}

function respond(res, session) {
    if (session.user) {
        res.render('history', data);
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