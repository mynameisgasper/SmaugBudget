const smtp = require("../../app_api/controllers/smtpClient");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');
const multer = require('multer');
const user = require("../models/user");
const fs = require('fs');
const path = require("path");
const categories = require("../models/categories");
const session = require("express-session");

function register(req, res) {
    try {
        var email1 = req.body.email1up;
        var email2 = req.body.email2up;
        var pass1 = req.body.password1up;
        var pass2 = req.body.password2up;

        var regex = new RegExp("^([a-zA-Z])+$");
        var regex2 = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        const firstName = regex.test(req.body.nameup);
        const lastName = regex.test(req.body.surnameup);
        const password = regex2.test(req.body.password1up);

        if (firstName && lastName && email1 === email2 && pass1 == pass2 && password) {
            var urlCode = smtp.generateCode(64);
            var confirmationCode = smtp.generateCode(64);

            let promise = new Promise(function(res, err) {
                var basicCategories;
                Categories.find({ 'basic': 'true' }, function(error, categories) {
                    if (error) {
                        console.log(error);
                    } else {
                        basicCategories = categories;
                        res(basicCategories);
                    }
                });
            });

            promise.then(function(basicCategories) {
                let user = new User({
                    firstname: req.body.nameup,
                    lastname: req.body.surnameup,
                    email: email1,
                    password: pass1,
                    passwordSalt: "tempSalt",
                    confirmationUrl: urlCode,
                    confirmationCode: confirmationCode,
                    isPremium: false,
                    language: "English",
                    categories: basicCategories
                });
                user.save(function callback(err) {
                    if (err) {
                        res.sendStatus(400);
                    } else {
                        var response = {
                            user: user,
                            urlCode: urlCode
                        }
                        smtp.sendCode(email1, req.body.nameup, req.body.surnameup, urlCode, confirmationCode, req.headers.host);
                        res.status(200).json(response);
                    }
                });
            });

        } else {
            console.log(requestBody);
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function login(requestBody, res) {
    try {
        var email = requestBody.email;
        var password = requestBody.password;
        User.findOne({ 'email': email }, function(err, user) {
            if (err) {
                res.sendStatus(500);
            } else {
                if (user) {
                    if (user.password === password && user.confirmationUrl == null && user.confirmationCode == null) {
                        user.password = null;
                        user.passwordSalt = null;
                        res.status(200).json(user);
                    } else {
                        res.sendStatus(401);
                    }
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function retrieveUser(requestBody, res) {
    try {
        var id = requestBody.id;

        User.findOne({ '_id': id }, function(err, user) {
            if (err) {
                res.sendStatus(500);
            } else {
                if (user) {
                    user.password = null;
                    user.passwordSalt = null;
                    res.status(200).json(user);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function retrieveUserEmail(requestBody, res, session) {
    try {
        var email = requestBody.email;
        if (email === session.user.email) {
            res.status(404).json("cannot add yourself!");
        }
        console.log(email);
        User.findOne({ 'email': email }, function(err, user) {
            if (err) {
                res.sendStatus(500);
            } else {
                if (user) {
                    user.password = null;
                    user.passwordSalt = null;
                    res.sendStatus(200);
                } else {
                    res.status(404).json("no user!");
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function confirm(req, res) {
    try {
        var url = req.params.urlCode;
        var code = req.params.code;

        User.findOne({ 'confirmationUrl': url, 'confirmationCode': code }, function name(err, user) {
            if (err || user == null) {
                res.sendStatus(404);
            } else {
                user.confirmationUrl = null;
                user.confirmationCode = null;
                user.save();
                res.sendStatus(200);
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function changeIncome(requestBody, res, session) {
    var day = requestBody.date;
    var paycheck = requestBody.amount;

    var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    var income = regex.test(paycheck);

    if (income && day > 0 && day < 29) {
        User.findOne({ 'email': session.user.email }, function name(err, user) {
            if (err || user == null) {
                res.sendStatus(404);
            } else {
                user.paycheck = paycheck,
                    user.paycheckDate = day
                user.save();
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
}

function updateUser(requestBody, res, session) {
    try {
        var regex = new RegExp("^([a-zA-Z])+$");
        var regex2 = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        const firstName = requestBody.firstName ? regex.test(requestBody.firstName) : true;
        const lastName = requestBody.lastName ? regex.test(requestBody.lastName) : true;
        const password = requestBody.password ? regex2.test(requestBody.password) : true;

        if (firstName && lastName && password) {
            User.findOne({ 'email': requestBody.email }, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    if (user) {

                        user.firstname = requestBody.firstName ? requestBody.firstName : user.firstname;
                        user.lastname = requestBody.lastName ? requestBody.lastName : user.lastname;
                        user.email = requestBody.email ? requestBody.email : user.email;
                        user.password = requestBody.password ? requestBody.password : user.password;
                        user.language = requestBody.language ? requestBody.language : user.language;
                        user.defaultCurrency = requestBody.defaultCurrency ? requestBody.defaultCurrency : user.defaultCurrency;

                        user.save();
                        res.status(200).json(user);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        } else {
            res.sendStatus(404);
        }
    } catch (ex) {
        res.sendStatus(500);
    }
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadImg = multer({ storage: storage }).single('image');

function postImg(req, res) {
    try {
        User.findOne({ 'email': req.session.user.email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    if (user.profilePic) {
                        fs.unlink(user.profilePic, (err) => {
                            if (err) {
                                console.log('File: ' + user.profilePic + " does not exist!");
                            } else {
                                console.log('File: ' + user.profilePic + " was deleted");
                            }
                        });
                    }
                    user.profilePic = req.file.path;
                    user.save();
                    res.status(200).json(req.file.path);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function getPfp(req, res) {
    try {
        User.findOne({ 'email': req.session.user.email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    if (user.profilePic == null) {
                        res.status(404).sendFile(path.resolve("public/images/Default_pfp.png"));
                    } else {
                        res.status(200).sendFile(path.resolve(user.profilePic));
                    }
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function requestResetPassword(req, res) {
    try {
        const email = req.body.email;

        User.findOne({ email: email }, function(err, user) {
            if (err) {
                res.sendStatus(500);
            } else {
                if (user) {
                    var resetPasswordCode = smtp.generateCode(64);
                    user.resetPasswordCode = resetPasswordCode;
                    user.save(function(err) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            smtp.sendResetPassword(email, user.firstname, user.lastname, resetPasswordCode, req.headers.host);
                            res.sendStatus(200);
                        }
                    });
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function resetPassword(requestBody, res) {
    try {
        var code = requestBody.code;
        var password = requestBody.password;
        if (password) {
            User.findOne({ resetPasswordCode: code }, function(err, user) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    if (user) {
                        user.password = password;
                        user.resetPasswordCode = null;
                        user.save();
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(404);
                    }
                }
            });
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
        res.sendStatus(500);
    }
}

function handlePaychecks() {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            if (users.length > 0) {
                for (var user of users) {
                    handlePaycheck(user);
                    user.save();
                }
            } else {
                console.log('There are no users to take care of');
            }
        }
    });
}

function handlePaycheck(user) {
    const day = new Date().getDate();
    if (user.paycheckDate === day) {
        user.paycheckLastMonth = user.paycheck;
    }
}

module.exports = {
    register: function(req, res) {
        register(req, res);
    },
    login: function(req, res) {
        login(req.body, res);
    },
    requestResetPassword: function(req, res) {
        requestResetPassword(req.body, res);
    },
    resetPassword: function(req, res) {
        resetPassword(req, res);
    },
    retrieveUser: function(req, res) {
        retrieveUser(req.body, res, req.session);
    },
    retrieveUserEmail: function(req, res) {
        retrieveUserEmail(req.body, res, req.session);
    },
    confirm: function(req, res) {
        confirm(req, res);
    },
    changeIncome: function(req, res) {
        changeIncome(req.body, res, req.session);
    },
    postImg,
    uploadImg,
    getPfp: function(req, res) {
        getPfp(req, res);
    },
    updateUser: function(req, res) {
        updateUser(req.body, res, req.session);
    },
    handlePaychecks: function() {
        handlePaychecks();
    }
}