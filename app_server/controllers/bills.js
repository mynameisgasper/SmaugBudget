//Dependencies
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    bills: true,
    fileName: 'bills'
};

var translationKeys = {
    message: "messageBills",
    welcomeMessage: "welcomeMessageBills",
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
    const nearBills = getBillsInTheNext7Days(bills);
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
            count: nearBills.length,
            icon: 'fa-calendar',
            comment: generateComment(nearBills)   
        }
    ];
}

function getBillsInTheNext7Days(bills) {
    const currentTime = new Date();
    var billsArray = [];

    for (var bill of bills) {
        const billDate = new Date(Date.parse(bill.date)).getTime();
        const diff = (billDate - currentTime.getTime()) / 86400000;
        
        if (diff < 7) {
            billsArray.push(bill);
        }
    }
    return billsArray;
}

function generateComment(bills) {
    var comment = '';
    for (var bill of bills) {
        const billDate = new Date(Date.parse(bill.date));
        const dtfUK = new Intl.DateTimeFormat('UK', { year: 'numeric', month: '2-digit', day: '2-digit' });
        comment += bill.recipient + " - " + dtfUK.format(billDate);
    }

    return comment;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}