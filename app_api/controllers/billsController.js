const mongoose = require('mongoose');
const Bill = mongoose.model('Bills');

function addBill(requestBody, res) {
    try {
        var category = requestBody.inputCategory;
        var recipient = requestBody.Payee;
        var amount = requestBody.Amount;
        var date = requestBody.inputDateAddBill;
        var radio = requestBody.rad;
        
        //validate date
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
        } 
        else if (y == yyyy) {
            if (m > mm) {
                console.log("b");
                dateOk = true;
            } 
            else if (m == mm) {
                console.log("c");
                if (d >= dd) {
                    dateOk = true;
                } 
                else {
                    dateOk = false;
                }
            } 
            else {
                dateOk = false;
            }
        } 
        else {
            dateOk = false;
        }

        //validate payee and amount
        var regexPayee = new RegExp("^[A-Za-z0-9]{1,20}$"); 
        var regexAmount = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const payeeTest = regexPayee.test(requestBody.Payee);
        const amountTest  = regexAmount.test(requestBody.Amount);
        
        if (payeeTest && amountTest && dateOk) {
            let bill = new Bill({
                recipient: recipient,
                value: amount,
                category: {name: category},
                date: date,
                currency: "euro",
                repeating: radio, 
            });
            bill.save();
            res.status(200).json(bill);
        }
        else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function editBill(requestBody, res) {
    try {
        var newCategory = requestBody.inputCategory;
        var newRecipient = requestBody.Payee2;
        var newAmount = requestBody.Amount2;
        var newDate = requestBody.inputDate;
        var newRadio = requestBody.radio;
        //var id_requested = requestBody.id; tko bo ko bo implemetniran API

        var id_requested = "5fbd5a3947fa6f3da0a16b28"; //primer iz moje baze

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var inputDate = newDate.split("-");
        var y = parseInt(inputDate[0], 10)
        var m = parseInt(inputDate[1], 10)
        var d = parseInt(inputDate[2], 10)
        var dateOk;

        if (y > yyyy) {
            dateOk = true;
        } 
        else if (y == yyyy) {
            if (m > mm) {
                console.log("b");
                dateOk = true;
            } 
            else if (m == mm) {
                console.log("c");
                if (d >= dd) {
                    dateOk = true;
                } 
                else {
                    dateOk = false;
                }
            } 
            else {
                dateOk = false;
            }
        } 
        else {
            dateOk = false;
        }

        //validate payee and amount
        var regexPayee = new RegExp("^[A-Za-z0-9]{1,20}$"); 
        var regexAmount = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const payeeTest = regexPayee.test(newRecipient);
        const amountTest  = regexAmount.test(newAmount);

        if (payeeTest && amountTest && dateOk) {
            console.log("prišpel");
            Bill.findByIdAndUpdate(id_requested, {
                    category: {name: newCategory},
                    recipient: newRecipient,
                    value: newAmount,
                    date: newDate,
                    repeating: newRadio
                }, function (err, bill) { 
                if (err) {
                    console.log(err);
                } else {
                    if (bill) {
                        bill.save();
                        res.status(200).json(bill);
                    } else {
                        res.sendStatus(404);
                    }
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

module.exports = {
    addBill: function(req, res) {
        addBill(req.body, res);
    },
    editBill: function(req, res) {
        editBill(req.body, res);
    }
}