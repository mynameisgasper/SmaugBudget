const mongoose = require('mongoose');
const Envelopes = mongoose.model('Envelopes');
const categories = mongoose.model('Categories');
const User = mongoose.model('User');

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

        var d = new Date();
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
        var currentMonth = month[d.getMonth()];

        var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const amountCorrect = regex.test(requestBody.inputAmount)

        if (amountCorrect) {
            //? Try to find the category, create it if it doesn't exist.
            categories.findOne({ name: categoryName }, function(err, category) {
                if (err) {
                    console.log(err);
                } else {
                    if (category == null) {
                        let category = new categories({
                            name: categoryName,
                        })
                        category.save();
                    } else {
                        console.log("This category already exists.")
                    }
                }
            })

            //? Try to find current user
            User.findById(user_id, function(error, user) {
                if (error) {
                    console.log(error);
                } else {
                    //? Try to find envelope, if it doesn't exit for this month, create it
                    //! else return error code 304
                    Envelopes.findOne({ month: currentMonth, 'category.name': categoryName, user: user }, function(err, envelope) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (envelope == null) {
                                let envelope = new Envelopes({
                                    progress: 0,
                                    budget: amount,
                                    spent: 0,
                                    colorHex: colorHexPicker,
                                    color: colorRGB,
                                    bgColor: colorBackground,
                                    month: currentMonth,
                                    category: { name: categoryName },
                                })
                                envelope.save(function callback(err) {
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                    }
                                    else {
                                        user.envelopes.push(envelope);
                                        user.save();
                                        res.status(200).json(user);        
                                    }
                                });
                            } else {
                                console.log("This envelope already exists.");
                                res.sendStatus(304);
                            }
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

function editEnvelope(requestBody, res_parent) {
    try {

        var newBudget = requestBody.inputAmount;
        var colorHexPicker = requestBody.colorPicker
        var colorRGB = hexToRGB(colorHexPicker);
        var colorBackground = hexToRGB(colorHexPicker, 0.5);
        var id_requested = requestBody.id;

        var regex = new RegExp("^[0-9]+");
        const amountCorrect = regex.test(newBudget);

        var newProgress;
        if (amountCorrect) {
            var promise = new Promise((res, err) => {
                Envelopes.findById(id_requested, function(err, envelope) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (envelope) {
                            Math.round(newProgress = (envelope.spent / newBudget) * 100);
                            res();
                        } else {
                            res_parent.sendStatus(404);
                        }
                    }
                });
            })
        }

        promise.then(() => {
            if (amountCorrect) {
                Envelopes.findByIdAndUpdate(id_requested, {
                        budget: newBudget,
                        progress: newProgress,
                        colorHex: colorHexPicker,
                        color: colorRGB,
                        bgColor: colorBackground
                    },
                    function(err, envelope) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (envelope) {
                                envelope.save();
                                res_parent.status(200).json(envelope);
                            } else {
                                res_parent.sendStatus(404);
                            }
                        }
                    });
            }
        });
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
        var id_requested = requestBody.id;
        Envelopes.deleteOne({ _id: id_requested }, function(err) {
            if (err) return console.log(err);
            else {
                res.sendStatus(204);
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
*/

function addExpense(requestBody, res) {
    try {
        var amountAdded = requestBody.inputAmount;
        var category = requestBody.category;
        var user_id = requestBody.user;
        
        User.findById(user_id, function(error, user) {
            if (error) {
                res.sendStatus(500);
            } else {
                for (const element of user.envelopes) {
                    if (element.category.name === category) {
                        Envelopes.findById(element._id, function(err, envelope) {
                            if (err) {
                                res.sendStatus(404);
                            }
                            else {
                                envelope.spent += parseInt(amountAdded);
                                envelope.progress = parseFloat(parseFloat(envelope.spent) / parseFloat(envelope.budget));
                                envelope.save();
                                res.status(200).json(user);
                            }
                        });
                        return;
                    }
                }
                res.sendStatus(404);
            }
        });
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
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