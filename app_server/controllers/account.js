//Dependencies
var dictionary = require('./Dictionary');
var globalVar = require('../../app_api/models/globalVar.json');
var connections = require('../../app_api/models/connections.json');
var Client = require('node-rest-client').Client;

var data = {
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
    emailHint: "emailHint"
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
        data.categories = session.user.categories;

        for (var i = 0; i < data.categories.length; i++) {
            data.categories[i].hexColor = rgbToHex(data.categories[i].color);
        }

        getUserConnections(res, session);

        //console.log(data.data_connections);
        getEnvelopesForDropdown(res, session);
        console.log(data);
        res.render('account', data);
    } else {
        res.redirect('/');
    }
}

function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'changeName':
            {
                changeName(req, res, session);
                break;
            }
        case 'changeLanguage':
            {
                changeLanguage(req, res, session);
                break;
            }

    }
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

function getNewUsers(req, res, session, connectionName) {
    var allUsers = "wait";
    var client = new Client();
    client.get("http://" + req.headers.host + "/api/getNewUsers?email=KRzoneee@gmail.com&connectionName='" + connectionName + "'", function(resData, response) {
        allUsers = resData;
    });
    while (allUsers === "wait");
    var user = session.user;
    console.log(allUsers);
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
    console.log(dataTren);

}

function getUserConnections(res, session) {
    data.data_connections = session.user.connections;
}

function getEnvelopesForDropdown(res, session) {
    data.data_envelopes = session.user.envelopes;
    for (var i = 0; i < data.data_connections.length; i++) {
        for (var j = 0; j < data.data_envelopes; j++) {
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