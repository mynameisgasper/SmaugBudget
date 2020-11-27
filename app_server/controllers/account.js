//Dependencies
var dictionary = require('./Dictionary');
var globalVar = require('../../app_api/models/globalVar.json');
var connections = require('../../app_api/models/connections.json');
var Client = require('node-rest-client').Client;

var data = {
    fileName: "account",
    //translations main
    title: dictionary.getTranslation("account_title"),
    logout: dictionary.getTranslation("logout"),
    saveChanges: dictionary.getTranslation("saveChanges"),
    name: dictionary.getTranslation("name"),
    edit: dictionary.getTranslation("edit"),
    close: dictionary.getTranslation("close"),
    remove: dictionary.getTranslation("remove"),
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
    dark: dictionary.getTranslation("dark"),
    //translations account
    username: dictionary.getTranslation("username"),
    firstName: dictionary.getTranslation("firstName"),
    lastName: dictionary.getTranslation("lastName"),
    password: dictionary.getTranslation("password"),
    changePassword: dictionary.getTranslation("changePassword"),
    email: dictionary.getTranslation("email"),
    changeImage: dictionary.getTranslation("changeImage"),
    connections: dictionary.getTranslation("connections"),
    addConnections: dictionary.getTranslation("addConnections"),
    members: dictionary.getTranslation("members"),
    active: dictionary.getTranslation("active"),
    application: dictionary.getTranslation("application"),
    darkMode: dictionary.getTranslation("darkMode"),
    language: dictionary.getTranslation("language"),
    currency: dictionary.getTranslation("currency"),
    oldPassword: dictionary.getTranslation("oldPassword"),
    newPassword: dictionary.getTranslation("newPassword"),
    confirmPassword: dictionary.getTranslation("confirmPassword"),
    connectionName: dictionary.getTranslation("connectionName"),
    envelopes: dictionary.getTranslation("envelopes"),
    editConnection: dictionary.getTranslation("editConnection"),
    dragAndDropOr: dictionary.getTranslation("dragAndDropOr"),
    selLanguage: dictionary.getTranslation("selLanguage"),
    
    //data
    data_firstName: "",
    data_lastName: "",
    data_email: "",
    data_connections: connections,

    //validation
    HINT: dictionary.getTranslation("HINT"),
    nameHint: dictionary.getTranslation("nameHint"),
    surnameHint: dictionary.getTranslation("surnameHint"),
    emailHint: dictionary.getTranslation("emailHint")
}

function respond(res, session) {
    if (session.user) {
        if (session.user.language) {
            dictionary.setLanguage(session.user.language);
        }
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