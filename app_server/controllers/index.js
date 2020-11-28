//Dependencies
var Client = require('node-rest-client').Client;
var notFound404 = require('./not_found');
var dictionary = require('./Dictionary');

var data = {
    index: true,
    encryption: true,
    fileName: 'index',
    index: {
        used: true
    }

}

var translationKeys = {
    //navbar
    HOME: "HOME",
    FEATURES: "FEATURES",
    ABOUTUS: "ABOUTUS",
    SIGNIN: "SIGNIN",
    //sign in modal
    memberSignIn: "memberSignIn",
    email: "email",
    password: "password",
    loginButton: "loginButton",
    passwordForgot: "passwordForgot",
    notMember: "notMember",
    //sign up modal
    HINT: "HINT",
    nameHint: "nameHint",
    surnameHint: "surnameHint",
    emailHint: "emailHint",
    passwordHint: "passwordHint",
    passwordNoMatch: "passwordNoMatch",
    memberSignUp: "memberSignUp",
    name: "name",
    surname: "surname",
    confirmEmail: "confirmEmail",
    confirmPassword: "confirmPassword",
    createAccount: "createAccount",
    alreadyMember: "alreadyMember"
}

function translate (language) {
    var translatedKeys = JSON.parse(JSON.stringify(translationKeys));
    Object.keys(translationKeys).forEach(function(key) {
        translatedKeys[key] = dictionary.getTranslation(translatedKeys[key], language);
    });
    return translatedKeys;
}

function respond(res, session) {
    if (session.user) {
        res.redirect('/dashboard');
    } else {
        data = {...data, ...translate("English")};
        res.render('index', data);
    }
}

function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'signup': {
            signup(req, res, session);
            break;
        }
        case 'signin': {
            signin(req, res, session);
            break;
        }
        case 'forgotPassword': {
            forgotPassword(req, res);
            break;
        }
        case 'logout': {
            logout(req, res, session);
            break;
        }
        default: {
            notFound404.get(null, res);
        }
    }
}

function signup(req, res, session) {
    const data = {
        email1up: req.body.email1up,
        email2up: req.body.email2up,
        password1up: req.body.password1up,
        password2up: req.body.password2up,
        nameup: req.body.nameup,
        surnameup: req.body.surnameup
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/register", args, function(data, response) {
        if (response.statusCode == 200) {
            res.redirect('/confirmation/' + data.urlCode);
        } else {
            res.redirect('#registration');
        }
    });
}

function signin(req, res, session) {
    const data = {
        email: req.body.emailin,
        password: req.body.passwordin,
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/login", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;

            res.redirect('/dashboard');
        } else {
            res.redirect('#login');
        }
    });
}

function forgotPassword(req, res) {
    const data = {
        email: req.body.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/requestResetPassword", args, function(data, response) {
        if (response.statusCode == 200) {
            res.redirect('/');
        } else {
            res.redirect('#error');
        }
    });
}

function logout(req, res, session) {
    res.clearCookie('user_sid');
    res.redirect('/');
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req, res, req.session);
    }
}