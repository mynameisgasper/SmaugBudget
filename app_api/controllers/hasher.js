const bcrypt = require('bcryptjs');

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    return {
        passwordSalt: salt,
        password: hash
    };
}

function hashPasswordWitSalt(password, salt) {
    const hash = bcrypt.hashSync(password, salt)

    return {
        passwordSalt: salt,
        password: hash
    };
}

function comparePassword(hashPassword, password, salt) {
    const hash = bcrypt.hashSync(password, salt);
    return bcrypt.compareSync(hashPassword, hash);
}

module.exports = {
    hashPassword: function(password) {
        return hashPassword(password);
    },
    hashPasswordWitSalt: function(password, salt) {
        return hashPasswordWitSalt(password, salt);
    }
}