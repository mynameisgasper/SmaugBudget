//Dependencies
var dictionary = require('./Dictionary');

var data = {
    fileName: 'dashboard',
    graph: {
        used: true,
        name: 'DashboardChart'
    }
};

var translationKeys = {
    message: "messageDashboard",
    welcomeMessage: "welcomeMessageDashboard",

    alertSection: "alertSection",
    overview:  "overview",
    incomeRow: "incomeRow",
    expensesRow: "expensesRow",
    balanceRow: "balanceRow",
    analyticsField: "analyticsField",
    incomeModalTitle: "incomeModalTitle",
    incomeModalPlaceholderIncome: "incomeModalPlaceholderIncome",
    incomeModalPlaceholderDate: "incomeModalPlaceholderDate",
    incomeModalSaveButton: "incomeModalSaveButton",
    incomeModalCloseButton: "incomeModalCloseButton",

    //translations main
    logout: "logout",
    //translations navbar
    DASHBOARD: "DASHBOARD",
    ENVELOPES: "ENVELOPES",
    GOALS: "GOALS",
    BILLS: "BILLS",
    HISTORY: "HISTORY",
    UTILITIES: "UTILITIES",
    user: "user",
    settings: "settings",
    appearance: "appearance",
    light: "light",
    dark: "dark"
}

function translate (language) {
    var translatedKeys = JSON.parse(JSON.stringify(translationKeys));
    Object.keys(translationKeys).forEach(function(key) {
        translatedKeys[key] = dictionary.getTranslation(translatedKeys[key], language);
    });
    for (var i = 0; i < data.alert.length; i++) {
        //console.log(data.alert[i]);
        if (data.alert[i]) {
            data.alert[i].name = dictionary.getTranslation(data.alert[i].name, language);
            data.alert[i].text = dictionary.getTranslation(data.alert[i].text, language);
        }
    }
    return translatedKeys;
}

function respond(res, session) {
    if (session.user) {
        if (session.user.language) {
            data = {...data, ...translate(session.user.language)};
        } else {
            data = {...data, ...translationKeys};
        }

        data.card = generateCards(session.user);
        data.analytics = generateAnalyitcs(session.user);
        data.incomeLastMonth = (session.user.paycheckLastMonth ? session.user.paycheckLastMonth : 0);
        data.expensesLastMonth = getTotalCost(getLastMonthExpenses(session.user.expense, session.user.paycheckDate));
        data.alert = generateAlerts(session.user);
        data.alertLength = data.alert.length;
        data.id = session.user._id;

        if (session.user.language) {
            translate(session.user.language);
        }
        data = {...data, ...translationKeys};
        res.render('dashboard', data);
    }
    else {
        res.redirect('/');
    }
}

function generateCards(user) {
    var billsUntilPaycheck = getBillsUntilPaycheck(user.bills, user.paycheckDate);
    var expensesSincePaycheck = getExpensesSincePaycheck(user.expense, user.paycheckDate);

    var totalCost = getTotalCost(getExpensesAndBills(expensesSincePaycheck, billsUntilPaycheck));
    var totalBills = getTotalCost(billsUntilPaycheck);
    var budgetLeft = user.paycheck - totalCost;
    return [{
        title: dictionary.getTranslation("cardTitle1"),
        color: 'bg-primary',
        count: (isNaN(budgetLeft) ? 0 : budgetLeft),
        icon: 'fa-university'
    },
    {
        title: dictionary.getTranslation("cardTitle2"),
        color: 'bg-primary',
        count: totalBills,
        icon: 'fa-coins'
    },
    {
        title: dictionary.getTranslation("cardTitle3"),
        color: 'bg-primary',
        count: (isNaN(budgetLeft - totalBills) ? 0 : budgetLeft - totalBills),
        icon: 'fa-piggy-bank'
    }];
}

function generateAnalyitcs(user) {
    var lastMonthExpenses = getLastMonthExpenses(user.expense, user.paycheckDate);
    var analyzeExpenses = getExpenseAnalysis(lastMonthExpenses);
    var mostMoneySpentOn = getMostMoneySpentOn(analyzeExpenses);
    var mostTimesPurchased = getMostTimesPurchased(analyzeExpenses);

    return [{
        rowName: dictionary.getTranslation("analyticsRowName1"),
        color: 'rgb(94, 192, 193)',
        category: mostMoneySpentOn
    },
    {
        rowName: dictionary.getTranslation("analyticsRowName2"),
        color: 'rgb(251, 203, 72)',
        category: mostTimesPurchased
    }]
}

function generateAlerts(user) {
    var alertArray = [];
    for (var element of generateEnvelopeAlerts()) {
        alertArray.push(element);
    }
    for (var element of generateBillsAlerts()) {
        alertArray.push(element);
    }
    for (var element of generateGoalsAlerts()) {
        alertArray.push(element);
    }

    return alertArray;
}

function getExpenseAnalysis(expenses) {
    var categories = new Map();

    for (var expense of expenses) {
        if (categories.get(expense.category.name)) {
            categories.get(expense.category.name).sum += parseInt(expense.value);
            categories.get(expense.category.name).count += 1;
        }
        else {
            categories.set(expense.category.name, {});
            categories.get(expense.category.name).name = expense.category.name
            categories.get(expense.category.name).sum = parseInt(expense.value);
            categories.get(expense.category.name).count = 1;    
        }
    }

    return categories;
}

function getExpensesAndBills(expenses, bills) {
    return expenses.concat(bills);
}

function getExpensesSincePaycheck(expenses, paycheckDate) {
    var expensesSincePaycheck = [];

    const today = new Date();
    const todayMonth = today.getMonth();
    today.setMonth(today.getMonth() - 1);
    const previousMonth = today.getMonth();
    for (var expense of expenses) {
        const expenseDate = new Date(expense.date);
        const expenseDay = expenseDate.getDate();
        const expenseMonth = expenseDate.getMonth();
        if ((expenseMonth == todayMonth && expenseDay <= paycheckDate) || (expenseMonth == previousMonth && expenseDay > paycheckDate)) {
            expensesSincePaycheck.push(expense);
        }
    }

    return expensesSincePaycheck;
}

function getBillsUntilPaycheck(bills, paycheckDate) {
    var billsUntilPaycheck = [];

    const today = new Date();
    const todayMonth = today.getMonth();
    today.setMonth(today.getMonth() + 1);
    const nextMonth = today.getMonth();
    for (var bill of bills) {
        const billDate = new Date(bill.date);
        const billDay = billDate.getDate();
        const billMonth = billDate.getMonth();
        if ((billMonth == todayMonth && billDay > paycheckDate) || (billMonth == nextMonth && billDay <= paycheckDate)) {
            billsUntilPaycheck.push(bill);
        }
    }

    return billsUntilPaycheck;
}

function getLastMonthExpenses(expenses, paycheckDate) {
    var lastMonthExpenses = [];

    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    const previousMonth = today.getMonth();
    today.setMonth(today.getMonth() - 2);
    const prepreviousMonth = today.getMonth();
    for (var expense of expenses) {
        const expenseDate = new Date(expense.date);
        const expenseDay = expenseDate.getDate();
        const expenseMonth = expenseDate.getMonth();
        if ((expenseMonth == previousMonth && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
            lastMonthExpenses.push(expense);
        }

    }

    return lastMonthExpenses;
}

function getMostMoneySpentOn(expenseAnalitics) {
    var selectedAnalitic = null;

    let keys = Array.from(expenseAnalitics.keys());
    for (let key of keys) {
        if (selectedAnalitic == null || expenseAnalitics.get(key).sum > selectedAnalitic.sum) {
            selectedAnalitic = expenseAnalitics.get(key);
        }
    }

    if (selectedAnalitic) {
        return selectedAnalitic.name;
    }
}

function getMostTimesPurchased(expenseAnalitics) {
    var selectedAnalitic = null;

    let keys = Array.from(expenseAnalitics.keys());
    for (let key of keys) {
        if (selectedAnalitic == null || expenseAnalitics.get(key).count > selectedAnalitic.count) {
            selectedAnalitic = expenseAnalitics.get(key);
        }
    }

    if (selectedAnalitic) {
        return selectedAnalitic.name;
    }
}

function generateEnvelopeAlerts() {
    return [{
        type: 'alert-warning',
        name: dictionary.getTranslation("alertName1"),
        text: dictionary.getTranslation("alertText1")
    }];
}

function generateBillsAlerts() {
    return [{
        type: 'alert-warning',
        name: dictionary.getTranslation("alertName2"),
        text: dictionary.getTranslation("alertText2")
    }];
}

function generateGoalsAlerts() {
    return [{
        type: 'alert-success',
        name: dictionary.getTranslation("alertName3"),
        text: dictionary.getTranslation("alertText3")
    }];
}

function getTotalCost(bills) {
    var sum = 0;
    for (var bill of bills) {
        sum += bill.value;
    }

    return sum;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}