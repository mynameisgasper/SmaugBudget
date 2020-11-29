//Dependencies
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'db',
    noheader: true,
    notfound: true
}

function respond(res, req) {

    res.render('db', data);
}

function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'removeAllDbData':
            {
                removeAllDbData(req, res);
                break;
            }
        case 'createDummyAccounts':
            {
                createDummyAccounts(req, res);
            }
        case 'loadCategories':
            {
                loadCategories(req, res);
            }

    }
}

function removeAllDbData(req, res) {
    var args = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/removeAllDbData", args,
        function(data, response) {
            if (response.statusCode == 204) {
                res.redirect('/db');
            } else {
                res.redirect('/db#error');
            }
        }
    );
}

function createDummyAccounts(req, res) {
    var args = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }


    var client = new Client();
    client.post("http://" + req.headers.host + "/api/createDummyAccounts", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.redirect('/db');
            } else {
                res.redirect('/db#error');
            }
        }
    );
}


function loadCategories(req, res) {
    var args = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/loadCategories", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.redirect('/db');
            } else {
                res.redirect('/db#error');
            }
        }
    );
}



module.exports = {
    get: function(req, res) {
        respond(res, req);
    },
    post: function(req, res) {
        parseRequestBody(req, res);
    }
}