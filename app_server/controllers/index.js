//Dependencies
var notFound404 = require('./not_found');
var fs = require('fs');
const { sign } = require('crypto');
var smtp = require("./smtpClient");
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
    //First we check consistency of all fields
    const email = body.email1up === body.email2up;
    const pass = body.password1up === body.password2up;

    if (email && pass && body.nameup && body.surnameup) {
        var code = generateCode(64);
        sendCode(body.email1up, body.nameup, body.surnameup, code);
        res.redirect('/confirmation?' + code);
    }
    else {
        notFound404.get(null, res);
    }
}

function signin(body, res, session) {
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

async function sendCode(email, firstName, lastName, url) {
    fs.readFile('./app_server/views/confirmationEmail.hbs', 'UTF-8', function(err, data) {
        if (err) {
            console.log(err);
        }
        else {
            code = generateCode(64);
            data = data.replace('{{FIRSTNAME}}', firstName).replace('{{LASTNAME}}', lastName).replace('{{CODE}}', code).replace('{{LINK}}', 'http://localhost:8080/confirmation?' + url + "&code=" + code);
            smtp.send(email, "Confirmation code", data);    
        }
    });
}

function generateCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}