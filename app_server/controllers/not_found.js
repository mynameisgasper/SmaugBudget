var data = {
    noheader: true,
    fileName: '404notfound',
    notfound: true
};

function respond(res) {
    res.status(404).render('404notfound', data);
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}