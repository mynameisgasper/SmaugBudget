//Dependencies
var dictionary = require('./Dictionary');
var notFound404 = require('./not_found');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'envelopes',
    message: dictionary.getTranslation("messageEnvelopes"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageEnvelopes"),

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

var translationKeys = {
    message: "messageEnvelopes",
    welcomeMessage: "welcomeMessageEnvelopes",

    /* 
     * Translations Main
     */
    logout: "logout",

    /* 
     * Translations Navbar 
     */
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

function respond(res, session, req) {
    if (session.user) {
        if (session.user.language) {
            data = {...data, ...translate(session.user.language) };
        } else {
            data = {...data, ...translationKeys };
        }
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

        data.card = generateCards(session.user, data.setMonthNumber);
        data.setMonth = getCurrentMonth(data.setMonthNumber);
        data.currentMonth = getCurrentMonth(d.getMonth());
        data.envelope = session.user.envelopes;
        data.category = getCategories(session.user.categories);
        data.currency = session.user.defaultCurrency;
        data.conEnvelopes = getConEnvelopes(session.user.email, session.user.connections);
        
        res.render('envelopes', data);
    } else {
        res.redirect('/');
    }
}

function getConEnvelopes(email, connections) {
    var tren = [];
    if (connections) {
        tren = connections.filter(c => c.hostUser.email !== email && c.active);
    }
    return tren;
}

function generateCards(user, month) {
    var monthString = getCurrentMonth(month);
    var totalEnvelopes = getTotalEnvelopes(user.envelopes, monthString);
    var totalAlmostEmptyEnvelopes = getTotalAlmostEmptyEnvelopes(user.envelopes, monthString);
    var totalEmptyEnvelopes = getTotalEmptyEnvelopes(user.envelopes, monthString);
    var mostEmpty = getMostEmpty(user.envelopes, monthString);
    var almostEmpty = getAlmostEmpty(user.envelopes, monthString);

    if (totalEmptyEnvelopes == 1 && totalEnvelopes > 0) {
        var commentEmpty = user.envelopes[mostEmpty[1]].category.name + " is empty!";
    } else if (totalEnvelopes > 0 && totalEmptyEnvelopes > 1) {
        var commentEmpty = "Multiple envelopes are empty!";
    } else if (totalEnvelopes == 0) {
        var commentEmpty = "You don't have any envelopes!";
    } else {
        var commentEmpty = "No empty envelopes!"
    }

    if (totalAlmostEmptyEnvelopes == 1 && totalEnvelopes > 0) {
        var commentAlmostEmpty = user.envelopes[almostEmpty].category.name + " is almost empty!";
    } else if (totalEnvelopes > 0 && totalAlmostEmptyEnvelopes > 1) {
        var commentAlmostEmpty = "Multiple envelopes are almost empty!";
    } else if (totalEnvelopes == 0) {
        var commentAlmostEmpty = "You don't have any envelopes!";
    } else {
        var commentAlmostEmpty = "No almost empty envelopes!"
    }


    return [{
            id: 1,
            title: 'Envelopes Total',
            color: 'bg-primary',
            icon: 'fa-envelope',
            count: totalEnvelopes
        },
        {
            id: 2,
            title: 'Almost Empty',
            color: 'bg-warning',
            count: totalAlmostEmptyEnvelopes,
            icon: 'fa-exclamation-triangle',
            comment: commentAlmostEmpty
        },
        {
            id: 3,
            title: 'Empty',
            color: 'bg-danger',
            count: totalEmptyEnvelopes,
            icon: 'fa-radiation',
            comment: commentEmpty
        }
    ]

}

function getTotalEnvelopes(envelopes, month) {
    var counter = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].month === month) {
            counter++;
        }
    }
    return counter;
}

function getTotalAlmostEmptyEnvelopes(envelopes, month) {
    var counter = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress < 100 && envelopes[i].progress > 85 && envelopes[i].month === month) {
            counter++;
        }
    }
    return counter;
}

function getTotalEmptyEnvelopes(envelopes, month) {
    var counter = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress >= 100 && envelopes[i].month === month) {
            counter++;
        }
    }
    return counter;
}

function getMostEmpty(envelopes, month) {
    var currentMax = [0, -1];
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress >= 100 && envelopes[i].month === month) {
            if (currentMax[0] < envelopes[i].progress) {
                currentMax = [envelopes[i].progress, i];
            }
        }
    }
    return currentMax;
}

function getAlmostEmpty(envelopes, month) {
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress < 100 && envelopes[i].progress > 74 && envelopes[i].month === month) {
            return i;
        }
    }
    return -1;
}

function getCategories(categories) {
    var category = [];
    var j = 0;
    for (var i = 0; i < categories.length; i++) {
        if (uniqueCategory(category, categories[i])) {
            category[j] = categories[i];
            j++;
        }

    }

    return category;
}

function uniqueCategory(categories, category) {
    if (categories == null) {
        return true;
    }
    for (var i = 0; i < categories.length; i++) {
        if (categories[i]._id === category._id) {
            return false;
        }
    }
    return true;
}


function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'addExpense':
            {
                addExpense(req, res, session);
                break;
            }
        case 'addEnvelope':
            {
                addEnvelope(req, res, session);
                break;
            }
        case 'deleteEnvelope':
            {
                deleteEnvelope(req, res, session);
                break;
            }
        case 'editEnvelope':
            {
                editEnvelope(req, res, session);
                break;
            }
    }
}


function addEnvelope(req, res, session) {
    let data = {}
    if (req.body.categoryAddEnvelope == undefined) {
        data = {
            colorPicker: 'default',
            categoryAddEnvelope: req.body.chooseCategoryEnvelope,
            inputAmount: req.body.inputAmount,
            month: req.body.setMonth,
            id: session.user._id
        }
    } else {
        data = {
            colorPicker: req.body.colorPicker,
            categoryAddEnvelope: req.body.categoryAddEnvelope,
            inputAmount: req.body.inputAmount,
            month: req.body.setMonth,
            id: session.user._id
        }
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
    client.post("http://" + req.headers.host + "/api/addEnvelope", args,
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

function addExpense(req, res, session) {
    const data = {
        inputAmount: req.body.inputAmount,
        category: req.body.inputCategory,
        recipient: req.body.recipient,
        date: req.body.date,
        user: session.user._id,
        inputCurrency: req.body.inputCurrency,
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
    client.post("http://" + req.headers.host + "/api/addExpense", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/envelopes' + redirectLocation);
        } else {
            res.redirect('/envelopes#error');
        }
    });
}

function deleteEnvelope(req, res, session) {
    const data = {
        user: session.user._id,
        envelope_id: req.body.id
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
    client.post("http://" + req.headers.host + "/api/deleteEnvelope", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;
            res.redirect('/envelopes' + redirectLocation);
        } else {
            res.redirect('/envelopes#error');
        }
    });

}

function editEnvelope(req, res, session) {
    const data = {
        inputAmount: req.body.inputAmount,
        colorPicker: req.body.colorPicker,
        id: req.body.id,
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
    client.post("http://" + req.headers.host + "/api/editEnvelope", args, function(data, response) {
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
        parseRequestBody(req, res, req.session);
    }
}