var globalVar = require('../models/globalVar.json');

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

    //ACCOUNT
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
    "editConnection": "Uredi povezavo",
    "dragAndDropOr": "Povleci in spusti, ali",


    //DASHBOARD
    //welcome
    "messageDashboard": "Dobrodošli na pregledu!",
    "welcomeMessageDashboard": "Enostaven pregled vašega porabljanja.",

    //cards
    "cardTitle1": "Preostal proračun",
    "cardTitle2": "Preostali stroški",
    "cardTitle3": "Prihranki",

    //alert
    "alertSection": "Opozorila",
    "alertName1": "KUVERTE",
    "alertText1": "1 skoraj prazna",
    "alertName2": "RAČUNI",
    "alertText2": "1 račun z rokom v tem tednu",
    "alertName3": "CILJI",
    "alertText3": "1 cilj dosežen",

    //overview
    "overview": "Pregled preteklega meseca",
    "incomeRow": "Prihodek",
    "expensesRow": "Stroški",
    "balanceRow": "Stanje",

    //analytics
    "analyticsField": "Analiza",
    "analyticsRowName1": "Največ denarja zapravljeno",
    "analyticsCategory1": "Zabava",
    "analyticsRowName2": "Največkrat kupljeno",
    "analyticsCategory2": "Živila",
    "analyticsRowName3": "Največja sprememba od prejšnega meseca",
    "analyticsCategory3": "Zabava",
    "analyticsRowName4": "Najmanjša sprememba od prejšnega meseca",
    "analyticsCategory4": "Telefon",
    
    //income modal
    "incomeModalTitle": "Posodobite svoj prihodek",
    "incomeModalPlaceholderIncome": "Vnesite svoj prihodek",
    "incomeModalPlaceholderDate": "Dan v mesecu na katerega dobite plačo",
    "incomeModalSaveButton": "Shrani spremembe",
    "incomeModalCloseButton": "Zapri",


    //ENVELOPES
    //welcome
    "messageEnvelopes": "Dobrodošli na kuvertah!",
    "welcomeMessageEnvelopes": "To je najbolši način za sledenje mesečnega in tedenskega porabljanjanja po kategorijah. Začnite s klikom na 'Dodaj kuverto'.",


    //GOALS
    //welcome
    "messageGoals": "Dobrodošli na ciljih!",
    "welcomeMessageGoals": "Tukaj lahko dodate cilje ki jih želite doseči. Kliknite na 'Dodaj cilj', izpolnite obrazec in ga oddajte.",


    //BILLS
    //welcome
    "messageBills": "Dobrodošli na računih!",
    "welcomeMessageBills": "Tukaj lahko dodate ponavljajoče se račune. Izpolnite obrazec, ga oddajte in račun bo avtomatsko dodeljen kuverti.",


    //HISTORY
    //welcome
    "messageHistory": "Doborodšli na zgodovini!",
    "welcomeMessageHistory": "To je najbolši način za pregled vašega porabljanja po kategorijah in časovnih obdobjih.",


    //UTILITIES
    //welcome
    "messageUtilities": "Doborodošli na orodjih!",
    "welcomeMessageUtilities": "Tukaj lahko najdete nekaj uporabnih pripomočkov.",
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

    //ACCOUNT
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
    "editConnection": "Edit connection",
    "dragAndDropOr": "Drag and drop or",


    //DASHBOARD
    //welcome
    "messageDashboard": "Welcome to dashboard!",
    "welcomeMessageDashboard": "A simple overview of your spending.",

    //cards
    "cardTitle1": "Budget Left",
    "cardTitle2": "Expenses Left",
    "cardTitle3": "Savings",

    //alert
    "alertSection": "Alert Section",
    "alertName1": "ENVELOPES",
    "alertText1": "1 almost empty",
    "alertName2": "BILLS",
    "alertText2": "1 bill to pay this week",
    "alertName3": "GOALS",
    "alertText3": "1 goal completed",
    "overview": "Last month overview",
    "incomeRow": "Income",
    "expensesRow": "Expenses",
    "balanceRow": "Balance",

    //analytics
    "analyticsField": "Analytics",
    "analyticsRowName1": "Most money spent on",
    "analyticsCategory1": "Entertainment",
    "analyticsRowName2": "Most times purchased",
    "analyticsCategory2": "Groceries",
    "analyticsRowName3": "Biggest change from last month",
    "analyticsCategory3": "Entertainment",
    "analyticsRowName4": "Least change from last month",
    "analyticsCategory4": "Phone",
    
    //income modal
    "incomeModalTitle": "Update your Income",
    "incomeModalPlaceholderIncome": "Enter your income",
    "incomeModalPlaceholderDate": "Day in month you receive paycheck",
    "incomeModalSaveButton": "Save changes",
    "incomeModalCloseButton": "Close",


    //ENVELOPES
    //welcome
    "messageEnvelopes": "Welcome to Envelopes!",
    "welcomeMessageEnvelopes": "This is the best way to track your monthly and weekly spending per category. Start by clicking 'Add Envelope'.",


    //GOALS
    //welcome
    "messageGoals": "Welcome to Goals!",
    "welcomeMessageGoals": "Here you can add saving goals you want to achieve. Click 'Add Goal', fill in the form, submit and you`re done!",


    //BILLS
    //welcome
    "messageBills": "Welcome to bills!",
    "welcomeMessageBills": "Here you can add recurring bills. Fill in the form, submit and it will be added to an envelope repeteadly!",


    //HISTORY
    //welcome
    "messageHistory": "Welcome to bills!",
    "welcomeMessageHistory": "This is the best way to check your past spending by time and category.",


    //UTILITIES
    //welcome
    "messageUtilities": "Welcome to utilites!",
    "welcomeMessageUtilities": "Here you can find some useful gadgets.",
}   

module.exports = {
    getTranslation: (key) => {
        switch (globalVar.language) {
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
                console.log(globalVar.language + " language is not supported!");
                return key;
        }
        console.log("No " + globalVar.language + " translation for key: " + key);
        return key;
    }
}