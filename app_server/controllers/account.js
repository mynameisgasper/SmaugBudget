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
    data_connections: connections
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
        data.data_firstName = session.user.firstname;
        data.data_lastName = session.user.lastname;
        data.data_email = session.user.email;
        res.render('account', data);
    }
    else {
        res.redirect('/');
    }
}

function parseRequestBody(reqBody, res, session) {
    console.log(reqBody);
    switch (reqBody.formType) {
        case 'changeName': {
            changeName(reqBody, res, session);
            break;
        }
        case 'changeLanguage': {
            changeLanguage(reqBody, res, session);
            break;
        }
        
    }
}

function changeName(body, res, session) {
    const data = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: session.user.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    
    var client = new Client();
    client.post("http://localhost:8080/api/updateUser", args,
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

function changeLanguage(body, res, session) {
    const data = {
        language: body.language,
        email: session.user.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    
    var client = new Client();
    client.post("http://localhost:8080/api/updateUser", args,
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
        parseRequestBody(req.body, res, req.session);
    }
}