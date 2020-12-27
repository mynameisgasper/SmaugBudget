const { get } = require('config');
const mongoose = require('mongoose');
const Envelopes = mongoose.model('Envelopes');
const Categories = mongoose.model('Categories');
const Expense = mongoose.model('Expense');
const User = mongoose.model('User');
const { currencySchema } = require('../models/currency');
const Currency = mongoose.model('Currency');
const jwt_decode = require('jwt-decode');


/*
? Add Envelope Function
! Adds an envelope into DB. 
*/
function addEnvelope(req, res) {
    try {

        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);

            var colorHexPicker = req.body.colorPicker;
            var categoryName = req.body.categoryAddEnvelope;
            var amount = req.body.inputAmount;
            const colorCorrect = checkColorCode(colorHexPicker);
            const colorDefault = checkDefaultColor(colorHexPicker);
            var colorRGB = "";
            var colorBackground = "";
            if (colorCorrect) {
                colorRGB = hexToRGB(colorHexPicker);
                colorBackground = hexToRGB(colorHexPicker, 0.5);
            }


            var user_id = decodedToken;
            var curMonth = req.body.month;
            var month = new Array();
            month[0] = "JAN";
            month[1] = "FEB";
            month[2] = "MAR";
            month[3] = "APR";
            month[4] = "MAY";
            month[5] = "JUN";
            month[6] = "JUL";
            month[7] = "AUG";
            month[8] = "SEP";
            month[9] = "OCT";
            month[10] = "NOV";
            month[11] = "DEC";
            var currentMonth = month[curMonth];

            var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
            const amountCorrect = regex.test(req.body.inputAmount)
            const titleCorrect = checkTitle(categoryName);


            if (amountCorrect && titleCorrect && (colorCorrect || colorDefault)) {
                //? Try to find current user
                User.findById(user_id, function(error, user) {
                    if (error) {
                        console.log(error);
                    } else {
                        for (var i = 0; i < user.envelopes.length; i++) {

                            if (user.envelopes[i].category.name.toUpperCase() === categoryName.toUpperCase()) {
                                if (user.envelopes[i].month === currentMonth) {
                                    res.sendStatus(304);
                                    return;
                                }
                            }
                        }

                        //? Try to find the category, create it if it doesn't exist.
                        var category = null;
                        var categoryExists = false;
                        for (var i = 0; i < user.categories.length; i++) {
                            if (user.categories[i].name === categoryName) {
                                category = user.categories[i];
                                categoryExists = true;
                                break;
                            }
                        }

                        if (category == null) {
                            let cat = new Categories({
                                name: categoryName,
                                color: colorRGB
                            })
                            cat.save();
                            category = cat;
                        } else {
                            if (colorDefault) {
                                colorHexPicker = rgbToHex(category.color);
                                colorRGB = category.color;
                                colorBackground = hexToRGB(colorHexPicker, 0.5);
                            }
                        }

                        let envelope = new Envelopes({
                            progress: 0,
                            budget: amount,
                            spent: 0,
                            colorHex: colorHexPicker,
                            color: colorRGB,
                            bgColor: colorBackground,
                            month: currentMonth,
                            category: category,
                        })
                        envelope.save(function callback(err) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(500);
                            } else {
                                if (!categoryExists) {
                                    user.categories.push(category);

                                }
                                user.envelopes.push(envelope);
                                user.save();
                                res.status(200).json(user);
                            }

                        });
                    }
                });
            } else {
                res.sendStatus(400);
            }
        } else {
            const response = {
                status: 'Unauthorized'
            }
            res.status(401).json(response);
        }

    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

/*
? EDIT Envelope Function
! find the envelope and add an amount or/and change color 
*/
function editEnvelope(req, res) {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);

            var newBudget = req.body.inputAmount;
            var colorHexPicker = req.body.colorPicker
            var envelope_id = req.body.id;
            var user_id = decodedToken._id;

            var regex = new RegExp("^[0-9]+");
            const amountCorrect = regex.test(newBudget);

            if (amountCorrect) {
                User.findById(user_id, function(error, user) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                    } else {
                        for (var i = 0; i < user.envelopes.length; i++) {
                            if (user.envelopes[i]._id == envelope_id) {
                                user.envelopes[i].progress = Math.round((parseFloat(parseFloat(user.envelopes[i].spent) / parseFloat(newBudget))) * 100);
                                user.envelopes[i].budget = newBudget;
                                user.save();
                                break;
                            }
                        }

                        Envelopes.findById(envelope_id, function(err, envelope) {
                            envelope.budget = newBudget;
                            envelope.progress = Math.round((parseFloat(parseFloat(envelope.spent) / parseFloat(newBudget))) * 100);
                        });
                        res.status(200).json(user);
                    }
                });
            } else {
                res.sendStatus(400);
            }
        } else {
            const response = {
                status: 'Unauthorized'
            }
            res.status(401).json(response);
        }

    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

/*
? Delete Envelope by ID
*/
function deleteEnvelope(req, res) {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            var envelope_id = req.body.envelope_id;
            var user_id = decodedToken._id;

            Envelopes.findByIdAndDelete(envelope_id, function(err, docs) {
                if (err) {
                    console.log(err);
                } else {}
            });

            User.findById(user_id, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    for (var i = 0; i < user.envelopes.length; i++) {
                        if (user.envelopes[i]._id == envelope_id) {
                            user.envelopes.pull(envelope_id);
                            user.save();
                            res.status(200).json(user);
                            return;
                        }
                    }
                    res.status(304);
                    return;
                }
            });
        } else {
            const response = {
                status: 'Unauthorized'
            }
            res.status(401).json(response);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }

}

/*
? Add Expense Function
! find the envelope and add an amount or/and change color 
* If there is no matching envelope, just create expense.
*/
function addExpense(req, res) {
    try {

        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);

            var amountAdded = parseFloat(req.body.inputAmount);
            var categoryName = req.body.category;
            var recipient = req.body.recipient;
            var date = req.body.date;
            var user_id = decodedToken._id;
            //TODO Implement Currency
            var currency = req.body.inputCurrency;

            var inputDate = date.split("-");
            var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
            const amountCorrect = regex.test(req.body.inputAmount)
            const recipientCorrect = checkRecipient(recipient);
            const dateBool = checkDatePast(inputDate);

            if (amountCorrect && dateBool && recipientCorrect) {
                User.findById(user_id, function(error, user) {
                    if (error) {
                        res.sendStatus(500);
                    } else {
                        var envelopeExists = false;

                        const promise = new Promise((resolution, rejection) => {
                            if (!(currency === user.defaultCurrency)) {
                                Currency.findOne({ 'currency': currency }, function(error, currencyFrom) {
                                    if (error) {
                                        //alert("Currency converter unavailable, user your default currency");
                                        res.sendStatus(500);
                                    } else {
                                        if (currencyFrom) {
                                            Currency.findOne({ 'currency': user.defaultCurrency }, function(error, currencyTo) {
                                                if (error) {
                                                    //alert("Currency converter unavailable, user your default currency");
                                                    res.sendStatus(500);
                                                } else {
                                                    if (currencyTo) {
                                                        amountAdded = (amountAdded / currencyFrom.value) * currencyTo.value;
                                                        console.log(typeof amountAdded);
                                                        resolution(amountAdded);
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            } else {
                                resolution(amountAdded);
                            }
                            resolution(amountAdded);
                        });

                        promise.then((amountAdded) => {
                            for (var i = 0; i < user.envelopes.length; i++) {
                                if (user.envelopes[i].category.name === categoryName && inputDate[1] == getMonthNumber(user.envelopes[i].month)) {
                                    envelopeExists = true;
                                    user.envelopes[i].spent += parseFloat(parseFloat(amountAdded).toFixed(2));
                                    user.envelopes[i].progress = Math.round((parseFloat(parseFloat(user.envelopes[i].spent) / parseFloat(user.envelopes[i].budget))) * 100);
                                    Envelopes.findById(user.envelopes[i]._id, function(error, envelope) {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            if (envelope) {
                                                envelope.spent = user.envelopes[i - 1].spent;
                                                envelope.progress = user.envelopes[i - 1].progress;
                                                envelope.save();

                                                let expense = new Expense({
                                                    date: date,
                                                    category: envelope.category,
                                                    recipient: recipient,
                                                    value: parseFloat(amountAdded).toFixed(2),
                                                    currency: user.defaultCurrency
                                                });


                                                expense.save(function callback(err) {
                                                    if (err) {
                                                        console.log(err);
                                                        res.sendStatus(500);
                                                        return;
                                                    } else {
                                                        user.expense.push(expense);
                                                        user.save();
                                                        res.status(200).json(user);
                                                        return;
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }

                            if (!envelopeExists) {
                                Categories.findOne({ name: categoryName }, function(error, category) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        let expense = new Expense({
                                            date: date,
                                            category: category,
                                            recipient: recipient,
                                            value: parseFloat(amountAdded).toFixed(2),
                                            currency: currency
                                        });
                                        expense.save(function callback(err) {
                                            if (err) {
                                                console.log(err);
                                                res.sendStatus(500);
                                                return;
                                            } else {
                                                user.expense.push(expense);
                                                user.save();
                                                res.status(200).json(user);
                                                return;
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                });
            }
        } else {
            const response = {
                status: 'Unauthorized'
            }
            res.status(401).json(response);
        }

    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

/*
 * Auxiliary Functions
 */

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

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    rgb = rgb.substring(4, rgb.length - 1)
        .replace(/ /g, '')
        .split(',');
    return "#" + componentToHex(parseInt(rgb[0])) + componentToHex(parseInt(rgb[1])) + componentToHex(parseInt(rgb[2]));
}

/*
? Currency Converter
*/

function currencyConverter() {
    //get data
    var args = {
        headers: { "Content-Type": "application/JSON" }
    };

    var client = new Client();
    client.get("https://api.exchangeratesapi.io/latest?base=EUR", args, function(data, response) {
        if (response.statusCode == 200) {
            let currency = new Currency({
                currency: data.base,
                value: 1
            });
            currency.save(function callback(err) {
                if (err) {}
            })
            for (var key in data.rates) {
                let currency = new Currency({
                    currency: key,
                    value: data.rates[key]
                });
                currency.save(function callback(err) {
                    if (err) {
                        Currency.findOne({ 'currency': key }, function(err, currency) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (currency) {
                                    currency.value = data.rates[key];
                                    currency.save();
                                }
                            }
                        });
                    }
                });
            }
        } else {
            console.log(response.statusCode);
        }
    });
}

/*
? Gets month number from string abbreviation
! If invalid returns -1
*/
function getMonthNumber(month) {
    var monthArray = new Array();
    monthArray[1] = "JAN";
    monthArray[2] = "FEB";
    monthArray[3] = "MAR";
    monthArray[4] = "APR";
    monthArray[5] = "MAY";
    monthArray[6] = "JUN";
    monthArray[7] = "JUL";
    monthArray[8] = "AUG";
    monthArray[9] = "SEP";
    monthArray[10] = "OCT";
    monthArray[11] = "NOV";
    monthArray[12] = "DEC";
    for (var i = 1; i <= monthArray.length; i++) {
        if (monthArray[i] === month) {
            return i;
        }
    }
    return -1;

}

/*
? Check if Date is valid (before today)
*/

function checkDatePast(inputDate) {
    console.log(inputDate);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    if (inputDate[0] < yyyy) {
        return true;
    } else if (inputDate[0] == yyyy) {
        if (inputDate[1] < mm) {
            return true;
        } else if (inputDate[1] == mm) {
            if (inputDate[2] <= dd) return true;
            else return false;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


function checkTitle(title) {
    var regexTitle = new RegExp("^[A-Za-z0-9]{1,14}$");
    const titleTest = regexTitle.test(title);

    return titleTest;
}

function checkRecipient(title) {
    var regexTitle = new RegExp("^[A-Za-z0-9 ]{1,16}$");
    const checkRecipient = regexTitle.test(title);

    return checkRecipient;
}

function checkAmount(amount) {
    var regexTarget = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    const amountTest = regexTarget.test(amount);

    return amountTest;
}

function checkColorCode(colorCode) {
    var regexColor = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$");
    const colorTest = regexColor.test(colorCode);

    return colorTest;
}

function checkDefaultColor(colorCode) {
    var regexColor = new RegExp('\\b' + 'default' + '\\b');
    const colorTest = regexColor.test(colorCode);

    return colorTest;
}

module.exports = {
    addEnvelope: function(req, res) {
        addEnvelope(req, res);
    },
    addExpense: function(req, res) {
        addExpense(req, res);
    },
    editEnvelope: function(req, res) {
        editEnvelope(req, res);
    },
    deleteEnvelope: function(req, res) {
        deleteEnvelope(req, res);
    }
}