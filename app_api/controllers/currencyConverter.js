const { request } = require('express');
const mongoose = require('mongoose');
const { currencySchema } = require('../models/currency');
const Currency = mongoose.model('Currency');
var Client = require('node-rest-client').Client;

function currencyConverter() {


    //get data
    var args = {
        headers: { "Content-Type": "application/JSON" }
    };
    
    var client = new Client();
    client.get("https://api.exchangeratesapi.io/latest?base=EUR", args, function (data, response) {
        if (response.statusCode == 200) {
            let currency = new Currency ({
                currency: data.base,
                value: 1
            });
            currency.save(function callback(err) {
                if(err) {
                }
            })
            for (var key in data.rates) {
                let currency = new Currency ({
                    currency: key,
                    value: data.rates[key]
                });
                currency.save(function callback(err) {
                    if (err) {
                        Currency.findOne({'currency': key}, function(err, currency) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                if (currency) {
                                    currency.value = data.rates[key];
                                    currency.save();
                                }
                            }
                        });
                    }
                });
            }
        }
        else {
            console.log(response.statusCode);
        }
    });
}

function converter(req, res) {
    var curr1 = req.query.curr1;
    var curr2 = req.query.curr2;
    var amm1 = req.query.amm1;

    /*v=(v1/c1)*c2
    v1 - vsota iz prve valute
    c1 - konverzija prve valute v bazo
    c2 - konverzija iz baze v drugo valuto*/

    Currency.findOne({'currency': curr1}, function(err, currency1) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            if(currency1) {
                Currency.findOne({'currency': curr2}, function(err, currency2) {
                    if (err) {
                        res.sendStatus(500);
                    }
                    else {
                        if(currency2) {
                            var amm2 = (amm1/currency1.value)*currency2.value;
                            var json = {
                                currency: currency2.currency,
                                value: amm2
                            }
                            res.status(200).json(json);
                        }
                        else{
                            res.sendStatus(404);

                        }  
                    }
                });
            }
            else {
                res.sendStatus(404);
            }
        }
    });
}

module.exports = {
    currencyConverter: function(req, res) {
        currencyConverter(req, res);
    },
    converter: function(req,res) {
        converter(req, res);
    }
}