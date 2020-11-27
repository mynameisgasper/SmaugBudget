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

function parseRequestBody(body, res, session) {
    switch (body.formType) {
        case 'signup': {
            signup(body, res, session);
            break;
        }
        case 'signin': {
            signin(body, res, session);
            break;
        }
        case 'forgotPassword': {
            forgotPassword(body, res);
            break;
        }
        case 'logout': {
            logout(body, res, session);
            break;
        }
        default: {
            notFound404.get(null, res);
        }
    }
}

function signup(body, res, session) {
    const data = {
        email1up: body.email1up,
        email2up: body.email2up,
        password1up: body.password1up,
        password2up: body.password2up,
        nameup: body.nameup,
        surnameup: body.surnameup
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://localhost:8080/api/register", args, function(data, response) {
        if (response.statusCode == 200) {
            res.redirect('/confirmation/' + data.urlCode);
        } else {
            res.redirect('#registration');
        }
    });
}

function signin(body, res, session) {
    const data = {
        email: body.emailin,
        password: body.passwordin,
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://localhost:8080/api/login", args, function(data, response) {
        if (response.statusCode == 200) {
            res.session = session;
            res.session.user = data;

            res.redirect('/dashboard');
        } else {
            res.redirect('#login');
        }
    });
}

function forgotPassword(body, res) {
    const data = {
        email: body.email
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };


    var client = new Client();
    client.post("http://localhost:8080/api/requestResetPassword", args, function(data, response) {
        if (response.statusCode == 200) {
            res.redirect('/');
        } else {
            res.redirect('#error');
        }
    });
}

function logout(body, res, session) {
    res.clearCookie('user_sid');
    res.redirect('/');
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}