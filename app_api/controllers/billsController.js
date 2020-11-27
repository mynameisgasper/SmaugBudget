const mongoose = require('mongoose');
const Bill = mongoose.model('Bills');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');

function addBill(requestBody, res) {
    try {
        var userId = requestBody.id;
        var categoryId = requestBody.inputCategory;
        var recipient = requestBody.Payee;
        var amount = requestBody.Amount;
        var date = requestBody.inputDateAddBill;
        var radio = requestBody.rad;

        //validate date, recipient and amount
        var dateOk = checkDate(date);
        const recipientTest = checkRecipient(recipient);
        const amountTest = checkAmount(amount);
        if (recipientTest && amountTest && dateOk) {
            User.findById(userId, function(err, user) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    Categories.findById(categoryId, function(err, category) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            console.log(category);
                            let bill = new Bill({
                                recipient: recipient,
                                value: amount,
                                category: category,
                                date: date,
                                currency: "€",
                                repeating: radio,
                            });
                            bill.save();
                            user.bills.push(bill);
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

function editBill(requestBody, res) {
    try {
        var billId = requestBody.billId;
        var inputCategory = requestBody.inputCategory;
        var recipient = requestBody.payee;
        var amount = requestBody.amount;
        var date = requestBody.date;
        var repeat = requestBody.repeat;
        var userId = requestBody.id;

        //validate date, recipient and amount
        var dateOk = checkDate(date);
        const recipientTest = checkRecipient(recipient);
        const amountTest = checkAmount(amount);

        if (recipientTest && amountTest && dateOk) {
            User.findById(userId, function(err, user) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    var category = null;
                    for (var i = 0; i < user.bills.length; i++) {
                        if (user.bills[i]._id == billId) {
                            user.bills[i].recipient = recipient;
                            user.bills[i].value = amount;
                            user.bills[i].repeating = repeat;

                            for (var j = 0; j < user.categories.length; j++) {
                                if (user.categories[j].name == inputCategory) {
                                    category = user.categories[j];
                                    user.bills[i].category = user.categories[j];
                                    break;
                                }
                            }
                            user.save();
                            break;
                        }
                    }

                    Bill.findById(billId, function(err, bill) {
                        bill.recipient = recipient;
                        bill.value = amount;
                        bill.repeating = repeat;
                        if (category != null) bill.category = category;
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

function deleteBill(requestBody, res) {
    try {
        var id_requested = requestBody.bill_id;
        var user_id = requestBody.user_id;

        console.log(requestBody);

        Bill.findByIdAndDelete(id_requested, function(err, bills) {
            if (err) {
                console.log(err);
            } else {}
        });

        User.findById(user_id, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < user.bills.length; i++) {
                    if (user.bills[i]._id == id_requested) {
                        user.bills.pull(id_requested);
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

function checkDate(date) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = date.split("-");
    var y = parseInt(inputDate[0], 10)
    var m = parseInt(inputDate[1], 10)
    var d = parseInt(inputDate[2], 10)
    var dateOk;

    if (y > yyyy) {
        dateOk = true;
    } else if (y == yyyy) {
        if (m > mm) {
            dateOk = true;
        } else if (m == mm) {
            if (d >= dd) {
                dateOk = true;
            } else {
                dateOk = false;
            }
        } else {
            dateOk = false;
        }
    } else {
        dateOk = false;
    }

    return dateOk;
}

function checkRecipient(recipient) {
    var regexRecipient = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$");
    const recipientTest = regexRecipient.test(recipient);

    return recipientTest;
}

function checkAmount(amount) {
    var regexAmount = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    const amountTest = regexAmount.test(amount);

    return amountTest;
}

module.exports = {
    addBill: function(req, res) {
        addBill(req.body, res);
    },
    editBill: function(req, res) {
        editBill(req.body, res);
    },
    deleteBill: function(req, res) {
        deleteBill(req.body, res);
    }
}