const mongoose = require('mongoose');
const User = mongoose.model('User');

function register(requestBody, res) {
    try {
        var email1 = requestBody.email1up;
        var email2 = requestBody.email2up;
        var pass1 = requestBody.password1up;
        var pass2 = requestBody.password2up;

        var regex = new RegExp("^([a-zA-Z])+$");
        var regex2 = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        const firstName = regex.test(requestBody.nameup);
        const lastName = regex.test(requestBody.surnameup);
        const password = regex2.test(requestBody.password1up);  
        //dodate treba še če je bil mail poslan a.k.a. mail obstaja!!!
        if (firstName && lastName && email1 === email2 && pass1 == pass2 && password) {
            let user = new User({
                firstname: firstName,
                lastname: lastName,
                email: email1,
                password: pass1,
                passwordSalt: "tempSalt"
            });
            user.save();
            res.status(200).json(user);
        }
        else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function login(requestBody, res) {
    var email = requestBody.email;
    var password = requestBody.password;

    User.findOne({'email': email}, function(err, user) {
        if (err) {
            console.log(err);
        }
        else {
            if (user) {
                if (user.password == password) {
                    res.status(200).json(user);
                }
                else {
                    res.sendStatus(401);
                }
            }
            else {
                res.sendStatus(404);
            }
        }
    });
}

module.exports = {
    register: function(req, res) {
        register(req.body, res);
    },
    login: function(req, res) {
        login(req.body, res);
    }
}