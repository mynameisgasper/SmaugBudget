const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');
const jwt_decode = require('jwt-decode');
const expense = require('../models/expense');

function getLastMonthExpenses(requestBody, res) {
    try {
        const userId = requestBody.userId;
        User.findById(userId, function(err, user) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                if (user) {

                    var lastMonthExpenses = getLastMonthExpensesArray(user.expense, user.paycheckDate);
                    var lastMonthAnalysis = getExpenseAnalysis(lastMonthExpenses);

                    res.status(200).json(buildArrayFromMap(lastMonthAnalysis));
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function editExpense(req, res) {
    try {

        const authorization = req.headers.authorization;
        if (authorization) {

            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);

            var id = req.body.expId;
            var inputCategory = req.body.expCategory;
            var recipient = req.body.payee;
            var amount = req.body.amount;
            var date = req.body.date;
            var userId = decodedToken._id;

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
                        for (var i = 0; i < user.expense.length; i++) {
                            if (user.expense[i]._id == id) {
                                user.expense[i].recipient = recipient;
                                user.expense[i].value = amount;
                                user.expense[i].date = date;

                                for (var j = 0; j < user.categories.length; j++) {
                                    if (user.categories[j].name == inputCategory) {
                                        category = user.categories[j];
                                        user.expense[i].category = user.categories[j];
                                        break;
                                    }
                                }
                                user.save();
                                break;
                            }
                        }
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
        dateOk = false;
    } else if (y == yyyy) {
        if (m > mm) {
            dateOk = false;
        } else if (m == mm) {
            if (d > dd) {
                dateOk = false;
            } else {
                dateOk = true;
            }
        } else {
            dateOk = true;
        }
    } else {
        dateOk = true;
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

function getLastMonthExpensesArray(expenses, paycheckDate) {
    var lastMonthExpenses = [];

    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    const previousMonth = today.getMonth();
    today.setMonth(today.getMonth() - 2);
    const prepreviousMonth = today.getMonth();
    for (var expense of expenses) {
        const expenseDate = new Date(expense.date);
        const expenseDay = expenseDate.getDate();
        const expenseMonth = expenseDate.getMonth();
        if (today > paycheckDate) {
            if ((expenseMonth == previousMonth + 1 && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
                lastMonthExpenses.push(expense);
            }
        }
        else {
            if ((expenseMonth == previousMonth && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
                lastMonthExpenses.push(expense);
            }
        }


    }

    return lastMonthExpenses;
}

function getExpenseAnalysis(expenses) {
    var categories = new Map();

    for (var expense of expenses) {
        if (categories.get(expense.category.name)) {
            categories.get(expense.category.name).sum += parseInt(expense.value);
            categories.get(expense.category.name).count += 1;
            categories.get(expense.category.name).color = expense.category.color;
        } else {
            categories.set(expense.category.name, {});
            categories.get(expense.category.name).name = expense.category.name
            categories.get(expense.category.name).sum = parseInt(expense.value);
            categories.get(expense.category.name).count = 1;
            categories.get(expense.category.name).color = expense.category.color;
        }
    }

    return categories;
}

function buildArrayFromMap(expenses) {
    var expenseArray = [];

    let keys = Array.from(expenses.keys());
    for (let key of keys) {
        expenseArray.push(expenses.get(key));
    }

    return expenseArray;
}

function getExpenses(req, res) {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
    
            const userId = decodedToken._id;
            const filter = req.query.filter;
            const limit = parseInt(req.query.limit);
            const offset = parseInt(req.query.offset);
            
            User.findById(userId, (err, user) => {
                if (err) {
                    const response = {
                        status: "Server error"
                    };
                    res.status(500).json(response);
                }
                
                if (user) {
                    const allExpenses = user.expense;
                    const length = user.expense.length;

                    const orderedExpenses = allExpenses.sort((a, b) => b.date - a.date);

                    var filteredExpenses = [];
                    if (filter) {
                        for (e of orderedExpenses) {
                            if (e.recipient.toUpperCase().includes(filter.toUpperCase()) || e.category.name.toUpperCase().includes(filter.toUpperCase())) {
                                filteredExpenses.push(e);
                            }
                        }
                    }
                    else {
                        filteredExpenses = orderedExpenses;
                    }
                    
                    var paginatedExpenses = [];
                    if (!limit || limit == 0) {
                        if (!offset || offset == 0) {
                            paginatedExpenses = filteredExpenses;
                        }
                        else {
                            for (var i = offset; i < filteredExpenses.length; i++) {
                                paginatedExpenses.push(filteredExpenses[i]);
                            }
                        }
                    }
                    else {
                        if (!offset || offset == 0) {
                            for (var i = 0; (i < limit) && (i < filteredExpenses.length); i++) {
                                paginatedExpenses.push(filteredExpenses[i]);
                            }
                        }
                        else {
                            for (var i = offset; (i < offset + limit) && (i < filteredExpenses.length); i++) {
                                paginatedExpenses.push(filteredExpenses[i]);
                            }
                        }
                    }
                    
                    const response = {
                        length: length,
                        filter: filter,
                        expenses: paginatedExpenses
                    };
                    res.status(200).json(response);
                }
                else {
                    const response = {
                        status: "Not found"
                    };
                    res.status(404).json(response);
                }
            });
        }
    } catch (exception) {
        const response = {
            status: "Server error"
        };
        res.status(500).json(response);
    }
}

module.exports = {
    editExpense: function(req, res) {
        editExpense(req, res);
    },
    getExpenses: function(req, res) {
        getExpenses(req, res);
    },
    getLastMonthExpenses: function(req, res) {
        getLastMonthExpenses(req.body, res);
    }
}