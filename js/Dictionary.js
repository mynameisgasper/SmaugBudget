var userInfo = {
    language: "slovenian"
}

var slovenian = {
    "logout": "odjava"
}

var english = {
    "logout": "logout"
}


var getTranslation = function (key) {
    switch (userInfo.language) {
        case "slovenian":
            if (slovenian.key) {
                return slovenian.key;
            } else {
                console.log("No " + userInfo.language + " translation for key: " + key);
            }
            break;
        case "english":
            if (english.key) {
                return english.key;
            } else {
                console.log("No " + userInfo.language + " translation for key: " + key);
            }
            break;
        default:
            console.log(userInfo.language + " language is not supported!");
    }
}