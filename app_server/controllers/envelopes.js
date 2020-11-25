//Dependencies
var dictionary = require('./Dictionary');
var notFound404 = require('./not_found');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'envelopes',
    message: dictionary.getTranslation("messageEnvelopes"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageEnvelopes"),
    currentMonth: 'NOV',
    setMonth: 'NOV',
    envelope: [{
            id: 0,
            category: 'Gas',
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
            category: 'Groceries',
            progress: 50,
            totalSet: 350,
            totalCurrent: 175,
            color: 'rgb(0, 128, 0)',
            colorHex: '#008000',
            bgColor: 'rgba(0, 128, 0, 0.5)',
            month: 'OCT',
        },
        {
            id: 3,
            category: 'House Utilities',
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
            category: 'Entertainment',
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

function parseRequestBody(body, res, session) {
    switch (body.formType) {
        case 'addExpense':
            {
                addExpense(body, res, session);
                break;
            }
        case 'addEnvelope':
            {
                addEnvelope(body, res, session);
                break;
            }

    }
}


function addEnvelope(body, res, session) {
    console.log(session);
    const data = {
        colorPicker: body.colorPicker,
        categoryAddEnvelope: body.categoryAddEnvelope,
        inputAmount: body.inputAmount,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    console.log(args);

    var client = new Client();
    client.post("http://localhost:8080/api/addEnvelope"), args,
        function(data, response) {
            if (response.statusCode == 200) {
                console.log(data);
            } else {
                console.log("Something went wrong.");
            }
        }


}

function addExpense(body, res, session) {
    const data = {
        inputAmount: body.inputAmount,
        id: body.id,
    }

    console.log(data);

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    console.log(args);
    var client = new Client();
    client.post("http://localhost:8080/api/addExpense"), args,
        function(data, response) {
            if (response.statusCode == 200) {
                console.log("Done!");
            }
        }
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}