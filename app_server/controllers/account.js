//Dependencies
var dictionary = require('./Dictionary');
var connections = require('../../app_api/models/connections.json');
var Client = require('node-rest-client').Client;

var data = {
    encryption: true,
    fileName: "account",
    data_firstName: "",
    data_lastName: "",
    data_email: "",
    data_connections: connections,
    data_envelopes: [],
    data_currency: []
}

var translationKeys = {
    //translations main
    title: "account_title",
    logout: "logout",
    saveChanges: "saveChanges",
    name: "name",
    edit: "edit",
    close: "close",
    remove: "remove",
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
    dark: "dark",
    //translations account
    username: "username",
    firstName: "firstName",
    lastName: "lastName",
    password: "password",
    changePassword: "changePassword",
    email: "email",
    changeImage: "changeImage",
    connections: "connections",
    addConnections: "addConnections",
    members: "members",
    active: "active",
    application: "application",
    darkMode: "darkMode",
    language: "language",
    currency: "currency",
    oldPassword: "oldPassword",
    newPassword: "newPassword",
    confirmPassword: "confirmPassword",
    connectionName: "connectionName",
    envelopes: "envelopes",
    editConnection: "editConnection",
    dragAndDropOr: "dragAndDropOr",
    selLanguage: "selLanguage",

    //validation
    HINT: "HINT",
    nameHint: "nameHint",
    surnameHint: "surnameHint",
    emailHint: "emailHint",
    passwordHint: "passwordHint",
    passwordNoMatch: "passwordNoMatch"
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
        data.data_firstName = session.user.firstname;
        data.data_lastName = session.user.lastname;
        data.data_email = session.user.email;
        data.data_defCurrency = session.user.defaultCurrency;
        data.categories = session.user.categories;
        for (var i = 0; i < data.categories.length; i++) {
            data.categories[i].hexColor = rgbToHex(data.categories[i].color);
        }
        getCurrencies();

        getUserConnections(res, session);
        getEnvelopesForDropdown(res, session);
        res.render('account', data);
    } else {
        res.redirect('/');
    }
}

function getCurrencies() {
    data.data_currency = [
        { key: "EUR", name: "EURO" },
        { key: "USD", name: "US Dollar" },
        { key: "INR", name: "Indian Rupee" },
        { key: "AUD", name: "Australian Dollar" },
        { key: "CAD", name: "Canadian Dollar" },
        { key: "SGD", name: "Singapore Dollar" },
        { key: "RUB", name: "Russian Ruble" },
        { key: "BGN", name: "Bulgarian Lev" },
        { key: "BRL", name: "Brazilian Real" },
        { key: "CHF", name: "Swis Franc" },
        { key: "CNY", name: "Chinese Yuan Renmibi" },
        { key: "CZK", name: "Czech Koruna" },
        { key: "DKK", name: "Danish Krone" },
        { key: "HKD", name: "Hong Kong Dollar" },
        { key: "HRK", name: "Croatian Kuna" },
        { key: "HUF", name: "Hungarian Forint" },
        { key: "IDR", name: "Indonesian Rupiah" },
        { key: "ILS", name: "Israeli Shekel" },
        { key: "ISK", name: "Icelandic Krona" },
        { key: "JPY", name: "Japanese Yen" },
        { key: "KRW", name: "South Korean Won" },
        { key: "MXN", name: "Mexican Peso" },
        { key: "MYR", name: "Malaysian Ringgit" },
        { key: "NOK", name: "Norwegian Krone" },
        { key: "NZD", name: "New Zeland Dollar" },
        { key: "PHP", name: "Philipine Peso" },
        { key: "PLN", name: "Polish Zloty" },
        { key: "RON", name: "Romanian Leu" },
        { key: "SEK", name: "Swedish Krona" },
        { key: "THB", name: "Thai Baht" },
        { key: "TRY", name: "Turkish Lira" },
        { key: "ZAR", name: "South African Rand" }
    ];
}

function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'changeName': {
            changeName(req, res, session);
            break;
        }
        case 'changeLanguage': {
            changeLanguage(req, res, session);
            break;
        }
        case 'changeCurrency': {
            changeCurrency(req, res, session);
            break;
        }
        case 'changeColorCategory': {
            changeColorCategory(req, res, session);
            break;
        }
        case 'addConnection': {
            addConnection(req, res, session);
            break;
        }
        case 'deleteCategory': {
            deleteCategory(req, res, session);
            break;
        }
        case 'changePassword': {
            changePassword(req, res, session);
            break;
        }
        case 'toggleActive': {
            toggleActive(req, res, session);
            break;
        }
        case 'removeConnection': {
            removeConnection(req, res, session);
            break;
        }
    }
}

function removeConnection(req, res, session) {
    const data = {
        connection_id: req.body.connection_id,
        email: session.user.email,
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/removeConnection", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function toggleActive(req, res, session) {
    const data = {
        connection_id: req.body.connection_id,
        email: session.user.email,
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/toggleVisible", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function changeColorCategory(req, res, session) {
    const data = {
        colorPicker: req.body.colorPicker,
        category_id: req.body.id,
        user_id: session.user._id,
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/changeColorCategory", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account#currencyChangeLbl');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function deleteCategory(req, res, session) {
    const data = {
        category_id: req.body.id,
        user_id: session.user._id,
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/deleteCategory", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account#currencyChangeLbl');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function addConnection(req, res, session) {
    const data = {
        connectionName: req.body.connectionName,
        users: JSON.stringify(req.body.editPerson),
        envelopes: JSON.stringify(req.body.selEnvelopes),
        email: "premium@smaug.com"
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    var client = new Client();
    client.post("http://" + req.headers.host + "/api/addConnection", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function changeName(req, res, session) {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: session.user.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/updateUser", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function changeLanguage(req, res, session) {
    const data = {
        language: req.body.language,
        email: session.user.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/updateUser", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function changeCurrency(req, res, session) {
    const data = {
        currency: req.body.currency,
        email: session.user.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/setCurrency", args,
        function(data, response) {
            if (response.statusCode == 200) {

                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

function getNewUsers(req, res, session, connectionName) {
    var allUsers = "wait";
    var client = new Client();
    client.get("http://" + req.headers.host + "/api/getNewUsers?email=KRzoneee@gmail.com&connectionName='" + connectionName + "'", function(resData, response) {
        allUsers = resData;
    });
    while (allUsers === "wait");
    var user = session.user;
    var connection = user.connections.find(con => con.name === connectionName);
    var users;
    if (connection) {
        users = connection.users.find(u => u.email !== user.email);
    } else {
        users = [];
    }

    var dataTren = [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].profilePic == null) {
            dataTren.push({
                id: users[i]._id,
                firstName: users[i].firstname,
                lastName: users[i].lastname
                    //pfp: base64_encode(path.resolve("public/images/Default_pfp.png"))
            });
        } else {
            dataTren.push({
                id: users[i]._id,
                firstName: users[i].firstname,
                lastName: users[i].lastname
                    //pfp: base64_encode(path.resolve(user.profilePic))
            });
        }
    }
}

function getUserConnections(res, session) {
    data.data_connections = session.user.connections;
    for (var i = 0; i < data.data_connections.length; i++) {
        data.data_connections[i].user = data.data_connections[i].user.filter(e => e.email !== session.user.email);
        if (data.data_connections[i].hostUser.email !== session.user.email) {
            data.data_connections[i].name = data.data_connections[i].guestName;
        }
    }
}

function getEnvelopesForDropdown(res, session) {
    data.data_envelopes = session.user.envelopes.filter(e => e.month === "NOV");
    for (var i = 0; i < data.data_connections.length; i++) {
        for (var j = 0; j < data.data_envelopes.length; j++) {
            var found = data.data_connections[i].envelopes.findIndex(e => e.category.name === data.data_envelopes[j].category.name);
            
            if (found == -1) {
                var tren = JSON.parse(JSON.stringify(data.data_envelopes[j]));
                tren.selected = false;
                data.data_connections[i].envelopes.push(tren);
            } else {
                data.data_connections[i].envelopes[found].selected = true;
            }
        }
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    rgb = rgb.substring(4, rgb.length - 1)
        .replace(/ /g, '')
        .split(',');
    return "#" + componentToHex(parseInt(rgb[0])) + componentToHex(parseInt(rgb[1])) + componentToHex(parseInt(rgb[2]));
}

function changePassword(req, res, session) {
    const data = {
        oldPassword: req.body.oldPassword,
        newPassword1: req.body.newPassword1,
        newPassword2: req.body.newPassword2,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/changePassword", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/account');
            } else {
                res.redirect('/account#error');
            }
        }
    );
}

module.exports = {
    get: function(req, res) {
        if (req.method == 'POST') {
            respond(res, req.session);
        } else {
            respond(res, req.session);
        }
    },
    post: function(req, res) {
        parseRequestBody(req, res, req.session);
    }
}