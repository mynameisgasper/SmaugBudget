const crypto = require('crypto-js');
const cryptoUtils = require('crypto');

function hashPassword(password) {
    var salt = cryptoUtils.randomBytes(128).toString('base64');
    hash = crypto.TripleDES.encrypt(password, salt).toString();

    return {
        salt: salt,
        hash: hash
    };
}

module.exports = {
    hashPassword: function(password) {
        return hashPassword(password);
    }
}