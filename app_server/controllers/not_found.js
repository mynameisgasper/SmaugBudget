var data = {
    noheader: true,
    fileName: '404notfound',
    notfound: true
};

function respond(res) {
    res.render('404notfound', data);
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}