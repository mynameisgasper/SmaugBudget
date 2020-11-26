//Dependencies
var dictionary = require('./Dictionary');
var notFound404 = require('./not_found');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'envelopes',
    message: dictionary.getTranslation("messageEnvelopes"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageEnvelopes"),
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

function respond(res, session, req) {
    if (session.user) {
        var d = new Date();
        if (req.query.monthMinus == null && req.query.monthPlus == null) {
            data.setMonthNumber = d.getMonth();

        } else if (req.query.monthMinus != null) {
            data.setMonthNumber = req.query.monthMinus - 1;
            if (data.setMonthNumber < 0)
                data.setMonthNumber = data.setMonthNumber + 12;

        } else if (req.query.monthPlus != null) {
            data.setMonthNumber = parseInt(req.query.monthPlus) + 1;
            if (data.setMonthNumber > 11)
                data.setMonthNumber = data.setMonthNumber - 12;
        }
        data.setMonth = getCurrentMonth(data.setMonthNumber);
        data.currentMonth = getCurrentMonth(d.getMonth());
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
        case 'deleteEnvelope':
            {
                deleteEnvelope(body, res, session);
                break;
            }
        case 'editEnvelope':
            {
                editEnvelope(body, res, session);
                break;
            }
    }
}


function addEnvelope(body, res, session) {
    const data = {
        colorPicker: body.colorPicker,
        categoryAddEnvelope: body.categoryAddEnvelope,
        inputAmount: body.inputAmount,
        month: body.setMonth,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var referer = res.req.headers.referer;
    if (referer.indexOf("?") != -1)
        var redirectLocation = referer.substring(referer.indexOf("?"));
    else
        var redirectLocation = '';

    var client = new Client();
    client.post("http://localhost:8080/api/addEnvelope", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/envelopes' + redirectLocation);
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
        recipient: body.recipient,
        date: body.date,
        user: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var referer = res.req.headers.referer;
    if (referer.indexOf("?") != -1)
        var redirectLocation = referer.substring(referer.indexOf("?"));
    else
        var redirectLocation = '';

    var client = new Client();
    client.post("http://localhost:8080/api/addExpense", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/envelopes' + redirectLocation);
        } else {
            res.redirect('/envelopes#error');
        }
    });
}

function deleteEnvelope(body, res, session) {
    const data = {
        user: session.user._id,
        envelope_id: body.id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var referer = res.req.headers.referer;
    if (referer.indexOf("?") != -1)
        var redirectLocation = referer.substring(referer.indexOf("?"));
    else
        var redirectLocation = '';

    var client = new Client();
    client.post("http://localhost:8080/api/deleteEnvelope", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/envelopes' + redirectLocation);
        } else {
            res.redirect('/envelopes#error');
        }
    });

}

function editEnvelope(body, res, session) {
    const data = {
        inputAmount: body.inputAmount,
        colorPicker: body.colorPicker,
        id: body.id,
        user: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var referer = res.req.headers.referer;
    if (referer.indexOf("?") != -1)
        var redirectLocation = referer.substring(referer.indexOf("?"));
    else
        var redirectLocation = '';

    var client = new Client();
    client.post("http://localhost:8080/api/editEnvelope", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/envelopes' + redirectLocation);
        } else {
            res.redirect('/envelopes#error');
        }
    });
}

function getCurrentMonth(month) {
    var monthArray = new Array();
    monthArray[0] = "JAN";
    monthArray[1] = "FEB";
    monthArray[2] = "MAR";
    monthArray[3] = "APR";
    monthArray[4] = "MAY";
    monthArray[5] = "JUN";
    monthArray[6] = "JUL";
    monthArray[7] = "AUG";
    monthArray[8] = "SEP";
    monthArray[9] = "OCT";
    monthArray[10] = 'NOV';
    monthArray[11] = 'DEC';

    return monthArray[month];

}

module.exports = {
    get: function(req, res) {
        respond(res, req.session, req);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}