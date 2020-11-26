const mongoose = require('mongoose');
const Expense = mongoose.model('Expense');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');

function editExpense(requestBody, res) {
    try {
        var id = requestBody.expId;
        var inputCategory = requestBody.expCategory;
        var recipient = requestBody.payee;
        var amount = requestBody.amount;
        var date = requestBody.date;
        var userId = requestBody.id;

        //validate date, recipient and amount
        var dateOk = checkDate(date);
        const recipientTest = checkRecipient(recipient);
        const amountTest  = checkAmount(amount);

        if (recipientTest && amountTest && dateOk) {
            User.findById(userId, function(err, user) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
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
        }
        else {
            res.sendStatus(400);
        }
    } 
    catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function checkDate(date){
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
    } 
    else if (y == yyyy) {
        if (m > mm) {
            dateOk = false;
        } 
        else if (m == mm) {
            if (d > dd) {
                dateOk = false;
            } 
            else {
                dateOk = true;
            }
        } 
        else {
            dateOk = true;
        }
    } 
    else {
        dateOk = true;
    }

    return dateOk;
}

function checkRecipient(recipient){
    var regexRecipient = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
    const recipientTest = regexRecipient.test(recipient);

    return recipientTest;
}

function checkAmount(amount){
    var regexAmount = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    const amountTest  = regexAmount.test(amount);

    return amountTest;
}


module.exports = {
    editExpense: function(req, res) {
        editExpense(req.body, res);
    }
}