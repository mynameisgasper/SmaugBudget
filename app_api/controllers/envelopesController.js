const mongoose = require('mongoose');
const envelopes = mongoose.model('Envelopes');

function addEnvelope(requestBody, res) {
    try {
        var colorHexPicker = requestBody.colorPicker
        var categoryName = requestBody.categoryAddEnvelope;
        var amount = requestBody.inputAmount;
        var colorRGB = hexToRGB(colorHexPicker);
        var colorBackground = hexToRGB(colorHexPicker, 0.5);

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

        if (true) {
            let envelope = new envelopes({
                progress: 0,
                budget: amount,
                spent: 0,
                colorHex: colorHexPicker,
                color: colorRGB,
                bgColor: colorBackground,
                month: currentMonth,
                category: { name: categoryName }
            })
            envelope.save();
            res.status(200).json(envelope);
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function editEnvelope(requestBody, res) {
    try {
        var amountAdded = requestBody.inputAmount;
        var colorHexPicker = requestBody.colorPicker
        var colorRGB = hexToRGB(colorHexPicker);
        var colorBackground = hexToRGB(colorHexPicker, 0.5);

        var id_requested = requestBody.id;

        var regex = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
        const amountCorrect = regex.test(amountAdded);

        if (amountCorrect) {
            envelopes.findByIdAndUpdate(id_requested, {
                    $inc: { spent: amountAdded },
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
                            res.status(200).json(envelope);
                        } else {
                            res.sendStatus(404);
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
    editEnvelope: function(req, res) {
        editEnvelope(req.body, res);
    }
}