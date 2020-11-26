//Dependencies
var fs = require('fs');
const nodemailer = require('nodemailer');
const config = require('../../app_server/config/server.json');

function gc(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = length;
    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function sendEmail(to, subject, text) {
    let transport = nodemailer.createTransport({
        host: config.email.smtp.host,
        port: config.email.smtp.port,
        auth: {
           user: config.email.auth.address,
           pass: config.email.auth.password
        },
        tls: {
            rejectUnauthorized: false
        }

    });

    const message = {
        from: config.email.auth.address,
        to: to,
        subject: subject,
        html: text
    };

    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err);
        }
        else {
            console.log("Email sent!");
        }
    });
}

module.exports = {
    send: function(to, subject, text) { 
        sendEmail(to, subject, text);
    },
    sendCode: async function sendCode(email, firstName, lastName, url, confirmationCode, callback) {
        fs.readFile('./app_server/views/confirmationEmail.hbs', 'UTF-8', function(err, data) {
            if (err) {
                console.log(err);
            }
            else {
                data = data.replace('{{FIRSTNAME}}', firstName).replace('{{LASTNAME}}', lastName).replace('{{CODE}}', confirmationCode).replace('{{LINK}}', 'http://localhost:8080/confirmation/' + url + '/' + confirmationCode);
                sendEmail(email, 'Confirmation code', data, callback);    
            }
        });
    },
    generateCode: function generateCode(length) {
        return gc(length);
    }
}