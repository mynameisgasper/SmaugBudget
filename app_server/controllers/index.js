//Dependencies
var Client = require('node-rest-client').Client;
var notFound404 = require('./not_found');
var dictionary = require('./Dictionary');

var data = {
    index: true,
    fileName: 'index',
    index: {
        used: true
    },
    //navbar
    HOME: dictionary.getTranslation("HOME"),
    FEATURES: dictionary.getTranslation("FEATURES"),
    ABOUTUS: dictionary.getTranslation("ABOUTUS"),
    SIGNIN: dictionary.getTranslation("SIGNIN"),
    //sign in modal
    memberSignIn: dictionary.getTranslation("memberSignIn"),
    email: dictionary.getTranslation("email"),
    password: dictionary.getTranslation("password"),
    loginButton: dictionary.getTranslation("loginButton"),
    passwordForgot: dictionary.getTranslation("passwordForgot"),
    notMember: dictionary.getTranslation("notMember"),
    //sign up modal
    HINT: dictionary.getTranslation("HINT"),
    nameHint: dictionary.getTranslation("nameHint"),
    surnameHint: dictionary.getTranslation("surnameHint"),
    emailHint: dictionary.getTranslation("emailHint"),
    passwordHint: dictionary.getTranslation("passwordHint"),
    passwordNoMatch: dictionary.getTranslation("passwordNoMatch"),
    memberSignUp: dictionary.getTranslation("memberSignUp"),
    name: dictionary.getTranslation("name"),
    surname: dictionary.getTranslation("surname"),
    confirmEmail: dictionary.getTranslation("confirmEmail"),
    confirmPassword: dictionary.getTranslation("confirmPassword"),
    createAccount: dictionary.getTranslation("createAccount"),
    alreadyMember: dictionary.getTranslation("alreadyMember"),

}

function respond(res, session) {
    if (session.user) {
        res.redirect('/dashboard');
    }
    else {
        res.render('index', data);
    }
}

function parseRequestBody(body, res, session) {
    switch(body.formType) {
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
    client.post("http://localhost:8080/api/register", args, function (data, response) {
        if (response.statusCode == 200) {
            res.redirect('/confirmation?' + data.urlCode);
        }
        else {
            res.redirect('#registration');
        }
    });
}

function signin(body, res, session) {
    console.log(body);
    if (body.emailin && body.passwordin) {
        res.session = session;
        res.session.user = {
            email: body.emailin
        };
        res.redirect('/dashboard');
    }
    else {
        notFound404.get(null, res);
    }
}

function forgotPassword(body, res) {
    
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