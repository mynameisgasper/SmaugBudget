const mongoose = require('mongoose');
const User = mongoose.model('User');

function register(requestBody, res) {
    try {
        var email1 = requestBody.email1up;
        var email2 = requestBody.email2up;
        var pass1 = requestBody.password1up;
        var pass2 = requestBody.password2up;
    
        var firstName = requestBody.nameup;
        var lastName = requestBody.surnameup;
    
        if (firstName && lastName && email1 === email2 && pass1 == pass2) {
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