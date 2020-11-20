module.exports = {
    send: function(res, err, data, status) {
        if (err) {
          console.log(err);
          fs.readFile('../docs/404notfound.html', "utf8", function(err, data) {
            send(res, err, data, 404);
          });
          return;
        }
        res.status(status).send(data);
    }
}