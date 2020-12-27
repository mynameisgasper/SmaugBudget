const mongoose = require('mongoose');
const Bill = mongoose.model('Bills');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');
const Expense = mongoose.model('Expense');
const jwt_decode = require('jwt-decode');

function addBill(req, res) {
    try {
        const authorization = req.headers.authorization;
        var categoryId = req.body.inputCategory;
        var recipient = req.body.Payee;
        var amount = req.body.Amount;
        var date = req.body.inputDateAddBill;
        var radio = req.body.rad;

        //validate date, recipient and amount
        var dateOk = checkDate(date);
        const recipientTest = checkRecipient(recipient);
        const amountTest = checkAmount(amount);
        if (authorization && recipientTest && amountTest && dateOk) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            User.findById(decodedToken._id, function(err, user) {
                if (err) {
                    console.log(err);
                    const response = {
                        status: 'Error'
                    }
                    res.status(500).json(response);
                } else {
                    Categories.findById(categoryId, function(err, category) {
                        if (err) {
                            console.log(err);
                            const response = {
                                status: 'Error'
                            }
                            res.status(500).json(response);
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

                            res.status(200).json(bill);
                        }
                    });
                }
            });
        } 
        else {
            const response = {
                status: 'Bad request'
            }
            res.status(400).json(response);
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function editBill(req, res) {
    try {
        const authorization = req.headers.authorization;
        var billId = req.body.billId;
        var inputCategory = req.body.inputCategory;
        var recipient = req.body.payee;
        var amount = req.body.amount;
        var date = req.body.date;
        var repeat = req.body.repeat;

        //validate date, recipient and amount
        var dateOk = checkDate(date);
        const recipientTest = checkRecipient(recipient);
        const amountTest = checkAmount(amount);

        if (authorization && recipientTest && amountTest && dateOk) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            User.findById(decodedToken._id, function(err, user) {
                if (err) {
                    console.log(err);
                    const response = {
                        status: 'Error'
                    }
                    res.status(500).json(response);
                } else {
                    var category = null;
                    var i = 0;
                    for (; i < user.bills.length; i++) {
                        if (user.bills[i]._id == billId) {
                            user.bills[i].recipient = recipient;
                            user.bills[i].value = amount;
                            user.bills[i].repeating = repeat;
                            user.bills[i].date = date;

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
                        bill.date = date;
                        if (category != null) bill.category = category;
                    });
                    res.status(200).json(user.bills[i]);
                }
            });
        } else {
            const response = {
                status: 'Error'
            }
            res.status(400).json(response);
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function deleteBill(req, res) {
    try {
        const authorization = req.headers.authorization;
        var id_requested = req.body.bill_id;

        if (authorization && id_requested != undefined) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            Bill.findByIdAndDelete(id_requested, function(err, bills) {
                if (err) {
                    console.log(err);
                } else {}
            });

            User.findById(decodedToken._id, function(err, user) {
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
                    const response = {
                        status: 'Error'
                    }
                    res.status(304).json(response)
                    return;
                }
            });
        }
        else {
            const response = {
                status: 'Bad request'
            }
            res.status(400).json(response);
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
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

//Checks if bills have expired and adds them to expenses and envelopes
function handleBills() {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        }
        else {
            if (users.length > 0) {
                for (var user of users) {
                    transferBill(user);
                    user.save();
                }
            }
            else {
                console.log('There are no users to take care of');
            }
        }
    });
}

function transferBill(user) {
    renewBills(user);
}

function getExpiredBills(bills) {
    var expiredBills = [];

    const date = Date.now();
    for (var bill of bills) {
        var billDate = new Date(bill.date);

        if (billDate.getTime() - date < 0) {
            expiredBills.push(bill);
        }
    }
    return expiredBills;
}

function renewBills(user) {
    const expiredBills = getExpiredBills(user.bills);

    //Save expenses before you renew it
    saveExpenses(user, expiredBills);

    for (var bill of user.bills) {
        if (expiredBills.includes(bill)) {
            var billDate = new Date(bill.date);

            switch (bill.repeating) {
                case 'once': {
                    user.bills.splice(user.bills.indexOf(bill), 1);
                    break;
                }
                case 'monthly': {
                    billDate.setMonth(billDate.getMonth() + 1);
                    user.bills[user.bills.indexOf(bill)].date = billDate;
                    break;
                }
                case 'yearly': {
                    billDate.setFullYear(billDate.getFullYear() + 1);
                    user.bills[user.bills.indexOf(bill)].date = billDate;
                    break;
                }
            }
        }
    }
    return expiredBills;
}

function saveExpenses(user, bills) {
    for (var bill of bills) {
        let savedExpense = new Expense({
            date: bill.date,
            category: bill.category,
            recipient: bill.recipient,
            value: bill.value,
            currency: bill.currency
        });
        savedExpense.save();
        user.expense.push(savedExpense);

        saveExpenseInEnvelope(savedExpense, user);
    }
}

function saveExpenseInEnvelope(expense, user) {
    var category = expense.category;
    const month = getMonthCode(new Date(expense.date).getMonth());

    for (var envelope of user.envelopes) {
        if (envelope.category === category && month === envelope.month) {
            user.envelopes[user.envelopes.indexOf(envelope)].spent += expense.value;
            user.envelopes[user.envelopes.indexOf(envelope)].progress = user.envelopes[user.envelopes.indexOf(envelope)].spent / user.envelopes[user.envelopes.indexOf(envelope)].budget;
        }
    }
}

function getMonthCode(month) {
    switch (month) {
        case 01: return 'JAN';
        case 02: return 'FEB';
        case 03: return 'MAR';
        case 04: return 'APR';
        case 05: return 'MAY';
        case 06: return 'JUN';
        case 07: return 'JUL';
        case 08: return 'AUG';
        case 00: return 'SEP';
        case 10: return 'OCT';
        case 11: return 'NOV';
        case 12: return 'DEC';
    }
}

module.exports = {
    addBill: function(req, res) {
        addBill(req, res);
    },
    editBill: function(req, res) {
        editBill(req, res);
    },
    deleteBill: function(req, res) {
        deleteBill(req, res);
    },
    handleBills: function() {
        handleBills();
    }
}