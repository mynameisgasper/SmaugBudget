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

        data.card = generateCards(session.user, data.setMonthNumber);
        data.setMonth = getCurrentMonth(data.setMonthNumber);
        data.currentMonth = getCurrentMonth(d.getMonth());
        data.envelope = session.user.envelopes;
        data.category = getCategories(session.user.envelopes);


        res.render('envelopes', data);
    } else {
        res.redirect('/');
    }
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

function getCategories(envelopes) {
    var category = [];
    var j = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (uniqueCategory(category, envelopes[i].category)) {
            category[j] = envelopes[i].category
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