//Dependencies
var dictionary = require('./Dictionary');
var globalVar = require('../../app_api/models/globalVar.json');
var connections = require('../../app_api/models/connections.json');

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
    
    //data
    data_username: "Grega",
    data_email: "Grega@gmail.com",
    data_connections: connections
}

function respond(res, session) {
    if (session.user) {
        res.render('account', data);
    }
    else {
        res.redirect('/');
    }
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}