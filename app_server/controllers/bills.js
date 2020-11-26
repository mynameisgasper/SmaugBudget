//Dependencies
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    bills: true,
    fileName: 'bills',
    message: dictionary.getTranslation("messageBills"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageBills"),
    bill: [{
            id: 0,
            year: 2020,
            month: 'DEC',
            day: 10,
            category: 'Cat',
            recipient: 'Meow d.o.o.',
            value: '80',
            currency: '€'
        },
        {
            id: 1,
            year: 2020,
            month: 'DEC',
            day: 09,
            category: 'Gas',
            recipient: 'Petrol d.d',
            value: '500',
            currency: '€'
        },
        {
            id: 2,
            year: 2020,
            month: 'DEC',
            day: 09,
            category: 'Groceries',
            recipient: 'Mercator',
            value: '200',
            currency: '€'
        }
    ],
    card: [{
            id: 1,
            title: 'Bills Total',
            color: 'bg-primary',
            count: 2,
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
        data.categories = session.user.categories;
        data.card = generateCards(session.user.bills);
        res.render('bills', data);
    } else {
        res.redirect('/');
    }
}

function parseRequestBody(body, res, session) {
    switch (body.formType) {
        case 'addBill':{
            addBill(body, res, session);
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
                res.redirect('/bills');
            } else {
                res.redirect('/bills#error');
            }
        }
    );
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