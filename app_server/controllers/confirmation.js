var Client = require('node-rest-client').Client;

var data = {
    noheader: true,
    fileName: 'confirmation',
    notfound: true
};

function respond(req, res) {
    var url = req.params.urlCode;
    data.url = url;
    res.render('confirmation', data);
}

function confirmEmail(req, res) {
    var url = req.params.urlCode;
    var code = req.params.code;

    var args = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    

    var client = new Client();
    client.post('http://localhost:8080/api/confirm/' + url + '/' + code, args, function (data, response) {
        if (response.statusCode == 200) {
            res.redirect('/');
        }
        else {
            res.redirect('/404notfound');
        }
    });
}

module.exports = {
    get: function(req, res) {
        respond(req, res);
    },
    confirm: function (req, res) {
        confirmEmail(req, res);
    }
}