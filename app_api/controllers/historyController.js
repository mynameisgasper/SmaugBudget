const mongoose = require('mongoose');
const envelopes = mongoose.model('Expense');

function editHistory(requestBody, res) {
    try {
        var category = requestBody.inputCategory;
        var recipient = requestBody.Payee2;
        var amount = requestBody.Amount2;
        var date = requestBody.inputDate;

        //validate payee and amount
        var regexAmount = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        var regexRecipient = new RegExp("^[ A-Za-z0-9_@./#&+-]{1,20}$"); 
        const recipientTest = regexRecipient.test(recipient);
        const amountTest  = regexAmount.test(amount);
        
        if (recipientTest && amountTest) {
            let expense = ({
                category: {name: category},
                recipient: recipient,
                value: amount,
                date: date
            });
            res.status(200).json(expense);
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
    editHistory: function(req, res) {
        editHistory(req.body, res);
    }
}