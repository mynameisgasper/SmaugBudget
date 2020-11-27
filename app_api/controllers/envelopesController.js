const { get } = require('config');
const mongoose = require('mongoose');
const Envelopes = mongoose.model('Envelopes');
const Categories = mongoose.model('Categories');
const Expense = mongoose.model('Expense');
const User = mongoose.model('User');

/*
TODO REGEX CHECK FOR
! colorPicker
! month
*/

/*
? Add Envelope Function
! Adds an envelope into DB. 
*/
function addEnvelope(requestBody, res) {
    try {
        var colorHexPicker = requestBody.colorPicker;
        var categoryName = requestBody.categoryAddEnvelope;
        var amount = requestBody.inputAmount;
        var colorRGB = hexToRGB(colorHexPicker);
        var colorBackground = hexToRGB(colorHexPicker, 0.5);
        var user_id = requestBody.id;
        var curMonth = requestBody.month;

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
        const amountCorrect = regex.test(requestBody.inputAmount)

        if (amountCorrect) {
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
                    for (var i = 0; i < user.categories.length; i++) {
                        if (user.categories[i].name === categoryName) {
                            category = user.categories[i];
                            break;
                        }
                    }

                    if (category == null) {
                        let cat = new Categories({
                            name: categoryName,
                        })
                        cat.save();
                        category = cat;
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
                            user.categories.push(category);
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

    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

/*
? EDIT Envelope Function
! find the envelope and add an amount or/and change color 
*/
function editEnvelope(requestBody, res) {
    try {
        var newBudget = requestBody.inputAmount;
        var colorHexPicker = requestBody.colorPicker
        var colorRGB = hexToRGB(colorHexPicker);
        var colorBackground = hexToRGB(colorHexPicker, 0.5);
        var envelope_id = requestBody.id;
        var user_id = requestBody.user;

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
                            user.envelopes[i].colorHex = colorHexPicker;
                            user.envelopes[i].color = colorRGB;
                            user.envelopes[i].bgColor = colorBackground;
                            user.save();
                            break;
                        }
                    }

                    Envelopes.findById(envelope_id, function(err, envelope) {
                        envelope.budget = newBudget;
                        envelope.progress = Math.round((parseFloat(parseFloat(envelope.spent) / parseFloat(newBudget))) * 100);
                        envelope.colorHex = colorHexPicker;
                        envelope.color = colorRGB;
                        envelope.bgColor = colorBackground;
                    });
                    res.status(200).json(user);
                }
            });
        } else {
            res.sendStatus(400);
        }

    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

/*
? Delete Envelope by ID
*/
function deleteEnvelope(requestBody, res) {
    try {
        var envelope_id = requestBody.envelope_id;
        var user_id = requestBody.user;

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
function addExpense(requestBody, res) {
    try {
        var amountAdded = requestBody.inputAmount;
        var categoryName = requestBody.category;
        var recipient = requestBody.recipient;
        var date = requestBody.date;
        var user_id = requestBody.user;
        //TODO Implement Currency
        var currency = '€';


        var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const amountCorrect = regex.test(requestBody.inputAmount)

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var inputDate = date.split("-");
        var dateBool = false;

        if (inputDate[0] < yyyy) {
            dateBool = true;
        } else if (inputDate[0] == yyyy) {
            if (inputDate[1] < mm) {
                dateBool = true;
            } else if (inputDate[1] == mm) {
                if (inputDate[2] <= dd) dateBool = true;
                else dateBool = false;
            } else {
                dateBool = false;
            }
        } else {
            dateBool = false;
        }

        if (amountCorrect && dateBool) {
            User.findById(user_id, function(error, user) {
                if (error) {
                    res.sendStatus(500);
                } else {
                    var envelopeExists = false;
                    for (var i = 0; i < user.envelopes.length; i++) {
                        if (user.envelopes[i].category.name === categoryName && inputDate[1] == getMonthNumber(user.envelopes[i].month)) {
                            envelopeExists = true;
                            user.envelopes[i].spent += parseInt(amountAdded);
                            user.envelopes[i].progress = Math.round((parseFloat(parseFloat(user.envelopes[i].spent) / parseFloat(user.envelopes[i].budget))) * 100);

                            console.log(user.envelopes[i]);

                            Envelopes.findById(user.envelopes[i]._id, function(error, envelope) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    envelope.spent = user.envelopes[i - 1].spent;
                                    envelope.progress = user.envelopes[i - 1].progress;
                                    envelope.save();

                                    let expense = new Expense({
                                        date: date,
                                        category: envelope.category,
                                        recipient: recipient,
                                        value: amountAdded,
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
                    }

                    if (!envelopeExists) {
                        Categories.findOne({ name: categoryName }, function(error, category) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(category);
                                let expense = new Expense({
                                    date: date,
                                    category: category,
                                    recipient: recipient,
                                    value: amountAdded,
                                    currency: currency
                                });
                                console.log(expense);

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
                }
            });
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

module.exports = {
    addEnvelope: function(req, res) {
        addEnvelope(req.body, res);
    },
    addExpense: function(req, res) {
        addExpense(req.body, res);
    },
    editEnvelope: function(req, res) {
        editEnvelope(req.body, res);
    },
    deleteEnvelope: function(req, res) {
        deleteEnvelope(req.body, res);
    }
}