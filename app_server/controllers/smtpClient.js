//Dependencies
const nodemailer = require('nodemailer');
const config = require('../config/server.json');

module.exports = {
    send: function(to, subject, text) {
        
        let transport = nodemailer.createTransport({
            host: config.email.smtp.host,
            port: config.email.smtp.port,
            auth: {
               user: config.email.auth.address,
               pass: config.email.auth.password
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
              console.log(err)
            }
        });
    }
}