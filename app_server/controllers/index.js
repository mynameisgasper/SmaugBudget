//Dependencies
var notFound404 = require('./not_found');
const { sign } = require('crypto');
var smtp = require("./smtpClient");

function respond(res, session) {
    if (session.user) {
        res.redirect('/dashboard');
    }
    else {
        res.render('index', ({
            index: true,
            fileName: 'index',
            index: {
                used: true
            }
        }));
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
        smtp.send(body.email1up, "Confirmation code", "Welcome, here is our confirmation code: code");
        res.redirect('/confirmation');
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

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}