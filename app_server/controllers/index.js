
//Dependencies
const { sign } = require('crypto');
var fs = require('fs');
var responder = require('../routes/responder');

function respond(res) {
    res.render('index', ({
        fileName: 'index',
        index: {
            used: true
        }
    }));
}

function parseRequestBody(body, res) {
    switch(body.formType) {
        case 'signup': {
            signup(body, res);
            break;
        }
        case 'signin': {
            signin(body, res);
            break;
        }
        case 'forgotPassword': {
            forgotPassword(body, res);
            break;
        }
        default: {
            notFound404.get(null, res);
        }
    }
}

function signup(body, res) {
    //First we check consistency of all fields
    const email = body.email1up === body.email2up;
    const pass = body.password1up === body.password2up;

    if (email && pass && body.nameup && body.surnameup) {
        res.redirect('#confirmation');
    }
    else {
        notFound404.get(null, res);
    }
}

function signin(body, res) {
    if (body.emailin && body.passwordin) {
        res.redirect('/dashboard');
    }
    else {
        notFound404.get(null, res);
    }
}

function forgotPassword(body, res) {
    
}

module.exports = {
    get: function(req, res) {
        respond(res);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res);
    }
}