var Client = require('node-rest-client').Client;

var data = {
    noheader: true,
    encryption: true,
    fileName: 'passwordReset',
    notfound: true
};

function respond(req, res) {
    var code = req.params.code;
    data.code = code;
    res.render('passwordReset', data);
}

function resetPassword(req, res) {
    var password1 = req.body.hashPassword;
    var password2 = req.body.hashPasswordConfirm;

    if (password1 === password2) {
        const data = {
            code: req.params.code,
            password: password1
        }
    
        var args = {
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        };
    
    
        var client = new Client();
        client.post("http://" + req.headers.host + "/api/resetPassword", args, function(data, response) {
            if (response.statusCode == 200) {
                res.redirect('/#login');
            } else {
                res.redirect(req.originalUrl);
            }
        });
    }
    else {
        res.redirect(req.originalUrl);
    }
}

module.exports = {
    get: function(req, res) {
        respond(req, res);
    },
    post: function (req, res) {
        resetPassword(req, res)
    }
}