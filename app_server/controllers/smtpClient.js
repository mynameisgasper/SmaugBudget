var smtpc = require("../node_modules/smtpc/lib/smtp");

module.exports = {
    send: function() {
        smtpc.sendmail({
            "host"		: "smtp.gmail.com:587",
            "from"		: "smaugbudget@gmail.com",
            "to"		: [ "stepec.gasper97@gmail.com"],
            "content"	: {
                "subject"		: "Hello you little shit!\n I'll let you know I graduated top of my class..",
                "content-type"	: "text/html",
                "content"		: "Hello <strong>Jane</strong>!"
            },
            "success"	: function () {
                console.log("Sent!");
            },
            "failure"	: function (err) {
                console.log("Error(%d): %s", err.code, err.message);
            }
        });
    }
}