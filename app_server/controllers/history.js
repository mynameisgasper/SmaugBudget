//Dependencies
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

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
        data.categories = session.user.categories;
        data.expense = generateExpenses(session.user.expense);
        console.log(data.expense);
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

function editExpense(body, res, session) {

    const data = {
        expId: body.id,
        expCategory: body.kategorija,
        payee: body.prejemnik,
        amount: body.vsota,
        date: body.datumcek,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/editExpense", args, function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/history');
            } else {
                console.log(response.statusCode);
                res.redirect('/history#error');
            }
        }
    );
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
    expensesArray.sort(compare)
    
    return expensesArray;
}

function compare (a,b) { //1 menjava, -1 ni menjava
    if ( a.year < b.year ){
        return 1;
    }
    else if ( a.year == b.year) {
        if (a.month < b.month) {
            return 1;
        }
        else if (a.month == b.month) {
            if (a.day < b.day) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            return -1;
        }
    }
    else {
        return -1;
    }
    return 0;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        editExpense(req.body, res, req.session);
    }
}