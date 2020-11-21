var data = {
    fileName: 'confirmation',
    notfound: true
};

function respond(res) {
    res.render('confirmation', data);
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}