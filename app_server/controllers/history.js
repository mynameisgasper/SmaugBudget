//Dependencies
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'history',
    graph: {
        used: true,
        name: 'HistoryChart'
    },
    dateRangePicker: {
        used: true
    }
}

var translationKeys = {
    message: "messageHistory",
    welcomeMessage: "welcomeMessageHistory",
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

function translate(language) {
    var translatedKeys = JSON.parse(JSON.stringify(translationKeys));
    Object.keys(translationKeys).forEach(function(key) {
        translatedKeys[key] = dictionary.getTranslation(translatedKeys[key], language);
    });
    return translatedKeys;
}

function respond(res, session) {
    if (session.user) {
        if (session.user.language) {
            data = {...data, ...translate(session.user.language) };
        } else {
            data = {...data, ...translationKeys };
        }
        data.categories = session.user.categories;
        data.expense = generateExpenses(session.user.expense);
        data.currency = session.user.defaultCurrency;
        res.render('history', data);
    } else {
        res.redirect('/');
    }
}

function translateMonth(month) {
    switch (month) {
        case '01':
            return "JAN";
        case '02':
            return "FEB";
        case '03':
            return "MAR";
        case '04':
            return "APR";
        case '05':
            return "MAY";
        case '06':
            return "JUN";
        case '07':
            return "JUL";
        case '08':
            return "AUG";
        case '09':
            return "SEP";
        case '10':
            return "OCT";
        case '11':
            return "NOV";
        case '12':
            return "DEC";
    }
}

function editExpense(req, res, session) {

    const data = {
        expId: req.body.id,
        expCategory: req.body.kategorija,
        payee: req.body.prejemnik,
        amount: req.body.vsota,
        date: req.body.datumcek,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/editExpense", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/history');
        } else {
            console.log(response.statusCode);
            res.redirect('/history#error');
        }
    });
}

function translateMonth(month) {
    switch (month) {
        case '01':
            return "JAN";
        case '02':
            return "FEB";
        case '03':
            return "MAR";
        case '04':
            return "APR";
        case '05':
            return "MAY";
        case '06':
            return "JUN";
        case '07':
            return "JUL";
        case '08':
            return "AUG";
        case '09':
            return "SEP";
        case '10':
            return "OCT";
        case '11':
            return "NOV";
        case '12':
            return "DEC";
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
            color: exp.category.color,
        });
    }
    expensesArray.sort(compare)

    return expensesArray;
}

function compare(a, b) { //1 menjava, -1 ni menjava
    if (a.year < b.year) {
        return 1;
    } else if (a.year == b.year) {
        if (a.month < b.month) {
            return 1;
        } else if (a.month == b.month) {
            if (a.day < b.day) {
                return 1;
            } else {
                return -1;
            }
        } else {
            return -1;
        }
    } else {
        return -1;
    }
    return 0;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        editExpense(req, res, req.session);
    }
}