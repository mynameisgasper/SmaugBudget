//Dependencies
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    bills: true,
    fileName: 'bills',
    message: dictionary.getTranslation("messageBills"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageBills"),
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
        data.categories = session.user.categories;
        data.card = generateCards(session.user.bills);
        data.bill = generateBills(session.user.bills);
        res.render('bills', data);
    } else {
        res.redirect('/');
    }
}

function parseRequestBody(body, res, session) {
    switch (body.formType) {
        case 'addBill': {
            addBill(body, res, session);
            break;
        }
        case 'editBill': {
            editBill(body, res, session);
            break;
        }
    }
}


function addBill(body, res, session) {
    const data = {
        inputCategory: body.inputCategory,
        Payee: body.Payee,
        Amount: body.Amount,
        inputDateAddBill: body.inputDateAddBill,
        rad: body.rad,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/addBill", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/bills');
            } else {
                res.redirect('/bills#error');
            }
        }
    );
}

function editBill(body, res, session) {
    const data = {
        billId: body.billId,
        inputCategory: body.inputCategory,
        payee: body.Payee2,
        amount: body.Amount2,
        date: body.inputDate,
        repeat: body.radio,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.put("http://localhost:8080/api/editBill", args, function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/bills');
            } else {
                res.redirect('/bills#error');
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

function generateBills(bills) {
    var billsArray = []
    for (var bill of bills) {
        var date = bill.date.split('T')[0].split('-');

        billsArray.push({
            id: bill._id,
            year: date[0],
            month: date[1],
            monthName: translateMonth(date[1]),
            day: date[2],
            category: bill.category.name,
            recipient: bill.recipient,
            value: bill.value,
            currency: bill.currency,
            repeat: bill.repeating
        });
    }
    
    return billsArray;
}

function generateCards(bills) {
    return [
        {
            id: 1,
            title: 'Bills Total',
            color: 'bg-primary',
            count: bills.length,
            icon: 'fa-paperclip'
        },
        {
            id: 2,
            title: 'Bills This Week',
            color: 'bg-warning',
            count: 1,
            icon: 'fa-calendar',
            comment: "January 25: Petrol $80"   
        }
    ];
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}