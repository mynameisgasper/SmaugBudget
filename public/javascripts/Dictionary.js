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
            } 
            break;
        case "english":
            if (english.key) {
                return english.key;
            } 
            break;
        default:
            console.log(userInfo.language + " language is not supported!");
            return key;
    }
    console.log("No " + userInfo.language + " translation for key: " + key);
    return key;
}