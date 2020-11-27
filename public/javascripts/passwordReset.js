function buildAction() {
    var code = document.getElementById("password").value;
    document.getElementById("password").action += code
}

function passwordSubmit() {
    var password = document.getElementById('password');
    var hashOne = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne.update(password.value);
    document.getElementById('hashPassword').value = hashOne.getHash("HEX");

    var password = document.getElementById('passwordConfirm');
    var hashOne = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
    hashOne.update(password.value);
    document.getElementById('hashPasswordConfirm').value = hashOne.getHash("HEX");
}