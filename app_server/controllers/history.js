//Dependencies
var dictionary = require('./Dictionary');

var data = {
    fileName: 'history',
    message: dictionary.getTranslation("messageHistory"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageHistory"),
    graph: {
        used: true,
        name: 'HistoryChart'
    },
    dateRangePicker: {
        used: true
    },
    totalExpenses: 335,

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
        data.expense = generateExpenses(session.user.expense);
        res.render('history', data);
    } else {
        res.redirect('/');
    }
}

function translateMonth(month) {
    switch(month) {
        case '01': return "JAN";
        case '02': return "FEB";
        case '03': return "MAR";
        case '04': return "APR";
        case '05': return "MAY";
        case '06': return "JUN";
        case '07': return "JUL";
        case '08': return "AUG";
        case '09': return "SEP";
        case '10': return "OCT";
        case '11': return "NOV";
        case '12': return "DEC";
    }
}

function generateExpenses(expense) {
    var expensesArray = []
    for (var exp of expense) {
        var date = exp.date.split('T')[0].split('-');

        expensesArray.push({
            id: exp._id,
            year: date[0],
            month: date[1],
            monthName: translateMonth(date[1]),
            day: date[2],
            category: exp.category.name,
            recipient: exp.recipient,
            value: exp.value,
            currency: exp.currency,
        });
    }
    
    return expensesArray;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}