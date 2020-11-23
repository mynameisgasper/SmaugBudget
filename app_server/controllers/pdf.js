//Dependencies
var pdf = require("pdf-creator-node");
var fs = require('fs');

function respond(res, path) {
    res.sendFile(path.filename);
}

function generatePDF(req, res) {
    var parsedBody = mapToArray(parseBody(req.body));

    var html = fs.readFileSync('./app_server/views/pdfTemplate.hbs', 'utf8');
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm"
    };

    var document = {
        html: html,
        data: {
            parsedBody: parsedBody
        },
        path: "../generated/output.pdf"
    };

    pdf.create(document, options).then(path => {
        respond(res, path, req.session);
    }).catch(error => {
        console.error(error)
    });
}

function parseBody(body) {
    const parsedBody = new Map();

    var id = null;
    for (const [key, value] of Object.entries(body)) {
        id = key.replace('date', '').replace('category', '').replace('receiver', '').replace('value', '').replace('currency', '')
        if (!parsedBody.get(id)) {
            parsedBody.set(id, {
                'id': id,
                'date': body['date' + id],
                'category': body['category' + id],
                'recipient': body['recipient' + id],
                'value': body['value' + id],
                'currency': body['currency' + id]
            });
        }
    }


    return parsedBody;
}

function mapToArray(map) {
    var array = []
    map.forEach(function(value, key, map) {
        array.push(value);
    });
    return array;
}

module.exports = {
    post: function(req, res) {
        if (req.session.user) {
            generatePDF(req, res);
        } else {
            res.redirect('/');
        }
    }
}