const mongoose = require('mongoose');
const Bill = mongoose.model('bills');

function addBill(requestBody, res) {
    try {
        var category = requestBody.inputCategory;
        var recipient = requestBody.Payee;
        var amount = requestBody.Amount;
        var date = requestBody.inputDateAddBill;
        var radio = requestBody.rad;
        
        var regexPayee = new RegExp("^[A-Za-z0-9]{1,20}$"); 
        var regexAmount = new RegExp("^[0-9]+(\.[0-9]{1,2})?$"); 

        const payeeTest = regexPayee.test(requestBody.Payee);
        const amountTest  = regexAmount.test(requestBody.Amount);
        
        if (payeeTest && amountTest) {
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