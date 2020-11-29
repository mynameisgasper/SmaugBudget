const mongoose = require('mongoose');
const envelopes = require('../models/envelopes');
const expense = require('../models/expense');
const goals = require('../models/goals');
const Envelopes = mongoose.model('Envelopes');
const Categories = mongoose.model('Categories');
const User = mongoose.model('User');
const Expense = mongoose.model('Expense');
const Goals = mongoose.model('Goals');
/*
? Change category color
*/

function changeColorCategory(requestBody, res) {
    try {
        var newColor = requestBody.colorPicker;
        var category_id = requestBody.category_id;
        var user_id = requestBody.user_id;
        var colorRGB;
        const colorCorrect = checkColorCode(newColor);
        if (colorCorrect) {
            colorRGB = hexToRGB(newColor);
            colorRGBA = hexToRGB(newColor, 0.5);
            User.findById(user_id, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    var categoryName;
                    for (var i = 0; i < user.categories.length; i++) {
                        if (user.categories[i]._id == category_id) {
                            user.categories[i].color = colorRGB;
                            categoryName = user.categories[i].name;
                            break;
                        }
                    }

                    Categories.findOne({ name: categoryName }, function(error, category) {
                        if (error) {
                            console.log(error);
                        } else {
                            category.color = colorRGB;
                            category.save();
                        }
                    });

                    for (var i = 0; i < user.envelopes.length; i++) {
                        if (user.envelopes[i].category.name == categoryName) {
                            user.envelopes[i].color = colorRGB;
                            user.envelopes[i].bgColor = colorRGBA;
                            user.envelopes[i].colorHex = newColor;
                            user.envelopes[i].category.color = colorRGB;
                        }
                    }

                    Envelopes.find({ 'category.name': categoryName }, function(error, envelopes) {
                        if (error) {
                            console.log(error);
                        } else {
                            for (var i = 0; i < envelopes.length; i++) {
                                envelopes[i].colorHex = newColor;
                                envelopes[i].color = colorRGB;
                                envelopes[i].bgColor = colorRGBA;
                                envelopes[i].category.color = colorRGB;
                                envelopes[i].save();
                            }
                        }
                    });

                    for (var i = 0; i < user.expense.length; i++) {
                        if (user.expense[i].category.name == categoryName) {
                            user.expense[i].category.color = colorRGB
                        }
                    }

                    Expense.find({ 'category.name': categoryName }, function(error, expenses) {
                        if (error) {
                            console.log(error);
                        } else {
                            for (var i = 0; i < expenses.length; i++) {
                                expenses[i].category.color = colorRGB;
                                expenses[i].save();
                            }
                        }
                    });

                    user.save();
                    res.status(200).json(user);
                }
            });
        } else {
            res.sendStatus(400);
        }


    } catch (ex) {
        console.log(ex);
    }
}

function deleteCategory(requestBody, res) {
    try {
        var category_id = requestBody.category_id;
        var user_id = requestBody.user_id;

        console.log(category_id);
        console.log(user_id);
        var categoryName;

        const promise = new Promise((resolve, reject) => {
            Categories.findById(category_id, function(error, category) {
                if (error) {
                    console.log(err);
                } else {
                    categoryName = category.name;
                    resolve(categoryName);
                }
            });
        });


        promise.then((categoryName) => {
            Categories.findByIdAndDelete(category_id, function(err, docs) {
                if (err) {
                    console.log(err);
                } else {}
            });

            Goals.deleteMany({ 'category.name': categoryName }, function(error, docs) {
                if (error) {
                    console.log(error);
                } else {}
            });

            Envelopes.deleteMany({ 'category.name': categoryName }, function(error, docs) {
                if (error) {
                    console.log(error);
                } else {}
            });

            User.findById(user_id, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    var categoriesLength = user.categories.length;
                    for (var i = 0; i < categoriesLength; i++) {
                        if (user.categories[i].name === categoryName) {
                            user.categories.pull(category_id);
                            break;
                        }
                    }

                    var envelopesLength = user.envelopes.length;
                    var envelopesArray = user.envelopes;
                    for (var i = 0; i < envelopesLength; i++) {
                        if (envelopesArray.length > 0) {
                            if (envelopesArray[i].category.name === categoryName) {
                                user.envelopes.pull(envelopesArray[i]._id);
                                envelopesLength = envelopesLength - 1;
                                i = i - 1;
                            }
                        }
                    }

                    var goalLength = user.goals.length;
                    var goalsArray = user.goals;
                    for (var i = 0; i < goalLength; i++) {
                        if (goalsArray.length > 0) {
                            if (goalsArray[i].category.name === categoryName) {
                                user.goals.pull(goalsArray[i]._id);
                                goalLength = goalLength - 1;
                                i = i - 1;
                            }
                        }
                    }

                    user.save();
                    res.status(200).json(user);
                    return;
                }
            });
        });

    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function checkColorCode(colorCode) {
    var regexColor = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
    const colorTest = regexColor.test(colorCode);
    return colorTest;
}

/*
? Converts HEX color code to rgb if alpha is empty
! Converts HEX color code to rgba if alpha is present
*/
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}


module.exports = {
    changeColorCategory: function(req, res) {
        changeColorCategory(req.body, res);
    },
    deleteCategory: function(req, res) {
        deleteCategory(req.body, res);
    }
}