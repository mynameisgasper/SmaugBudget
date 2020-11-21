var userInfo = {
    language: "english"
}

var slovenian = {
    //main
    "logout": "Odjava",
    "saveChanges": "Shrani spremembe",
    "name": "Ime",
    "edit": "Urejaj",
    "close": "Zapri",
    "remove": "Odstrani",

    //navbar
    "DASHBOARD": "PREGLED",
    "ENVELOPES": "KUVERTE",
    "GOALS": "CILJI",
    "BILLS": "RAČUNI",
    "HISTORY": "ZGODOVINA",
    "UTILITIES": "ORODJA",
    "user": "Uporabnik",
    "settings": "Nastavitve",
    "appearance": "Izgled",
    "light": "Svetlo",
    "dark": "Temno",

    //Account
    "account_title": "Uporabniški račun",
    "username": "Uporabniško ime",
    "firstName": "Ime",
    "lastName": "Priimek",
    "password": "Geslo",
    "changePassword": "Spremeni geslo",
    "email": "Email",
    "changeImage": "Spremeni sliko",
    "connections": "Povezave",
    "addConnections": "Dodaj povezavo",
    "members": "Člani",
    "active": "Aktivno",
    "application": "Aplikacija",
    "darkMode": "Temni način",
    "language": "Jezik",
    "currency": "Valuta",
    "oldPassword": "Staro geslo",
    "newPassword": "Novo geslo",
    "confirmPassword": "Ponovi geslo",
    "connectionName": "Ime povezave",
    "envelopes": "Kuverte",
    "editConnection": "Uredi povezavo"
}

var english = {
    //main
    "logout": "Logout",
    "saveChanges": "Save changes",
    "name": "Name",
    "edit": "Edit",
    "close": "Close",
    "remove": "Remove",

    //navbar
    "DASHBOARD": "DASHBOARD",
    "ENVELOPES": "ENVELOPES",
    "GOALS": "GOALS",
    "BILLS": "BILLS",
    "HISTORY": "HISTORY",
    "UTILITIES": "UTILITIES",
    "user": "User",
    "settings": "Settings",
    "appearance": "Appearance",
    "light": "Light",
    "dark": "Dark",

    //Account
    "account_title": "Account",
    "username": "Username",
    "firstName": "First name",
    "lastName": "Last name",
    "password": "Password",
    "changePassword": "Change password",
    "email": "Email",
    "changeImage": "Change image",
    "connections": "Connections",
    "addConnections": "Add connection",
    "members": "Members",
    "active": "Active",
    "application": "Application",
    "darkMode": "Dark mode",
    "language": "Language",
    "currency": "Currency",
    "oldPassword": "Old password",
    "newPassword": "New password",
    "confirmPassword": "Confirm password",
    "connectionName": "Connection name",
    "envelopes": "Envelopes",
    "editConnection": "Edit connection"
}

module.exports = {
    getTranslation: (key) => {
        switch (userInfo.language) {
            case "slovenian":
                if (slovenian[key]) {
                    return slovenian[key];
                } 
                break;
            case "english":
                if (english[key]) {
                    return english[key];
                } 
                break;
            default:
                console.log(userInfo.language + " language is not supported!");
                return key;
        }
        console.log("No " + userInfo.language + " translation for key: " + key);
        return key;
    }
}