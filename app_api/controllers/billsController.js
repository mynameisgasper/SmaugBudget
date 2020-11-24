const mongoose = require('mongoose');
const Bill = mongoose.model('bills');

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
        var dateOk;

        if (inputDate[0] > yyyy) {
            dateOk = true;
        } 
        else if (inputDate[0] == yyyy) {
            if (inputDate[1] > mm) {
                dateOk = true;
            } 
            else if (inputDate[1] == mm) {
                if (inputDate[2] >= dd) {
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

module.exports = {
    addBill: function(req, res) {
        addBill(req.body, res);
    }
}