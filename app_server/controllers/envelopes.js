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
        data.envelope = session.user.envelopes;
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

    var client = new Client();
    client.post("http://localhost:8080/api/addEnvelope", args,
        function(data, response) {
            console.log(response.statusCode);
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/envelopes');
            } else {
                res.redirect('/envelopes#error');
            }
        }
    );
}

function addExpense(body, res, session) {
    const data = {
        inputAmount: body.inputAmount,
        category: body.inputCategory,
        user: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/addExpense", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/envelopes');
        } else {
            res.redirect('/envelopes#error');
        }
    });
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}