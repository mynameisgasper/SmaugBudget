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
    dark: "dark",

    noData: "No data"
}

function translate (language) {
    var translatedKeys = JSON.parse(JSON.stringify(translationKeys));
    Object.keys(translationKeys).forEach(function(key) {
        translatedKeys[key] = dictionary.getTranslation(translatedKeys[key], language);
    });
    if (data.alert) {
        for (var i = 0; i < data.alert.length; i++) {
            //console.log(data.alert[i]);
            if (data.alert[i]) {
                data.alert[i].name = dictionary.getTranslation(data.alert[i].name, language);
                data.alert[i].text = dictionary.getTranslation(data.alert[i].text, language);
            }
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

        data.card = generateCards(session.user, session.user.language);
        data.analytics = generateAnalyitcs(session.user, session.user.language);
        data.incomeLastMonth = (session.user.paycheckLastMonth ? session.user.paycheckLastMonth : 0);
        data.expensesLastMonth = getTotalCost(getLastMonthExpenses(session.user.expense, session.user.paycheckDate));
        data.alert = generateAlerts(session.user, session.user.language);
        data.alertLength = data.alert.length;
        data.id = session.user._id;

        res.render('dashboard', data);
    }
    else {
        res.redirect('/');
    }
}

function generateCards(user, language) {
    var billsUntilPaycheck = getBillsUntilPaycheck(user.bills, user.paycheckDate);
    var expensesSincePaycheck = getExpensesSincePaycheck(user.expense, user.paycheckDate);

    var totalCost = getTotalCost(getExpensesAndBills(expensesSincePaycheck, billsUntilPaycheck));
    var totalBills = getTotalCost(billsUntilPaycheck);
    var budgetLeft = user.paycheck - totalCost;
    return [{
        title: dictionary.getTranslation("cardTitle1", language),
        color: 'bg-primary',
        count: (isNaN(budgetLeft) ? 0 : budgetLeft),
        icon: 'fa-university'
    },
    {
        title: dictionary.getTranslation("cardTitle2", language),
        color: 'bg-primary',
        count: totalBills,
        icon: 'fa-coins'
    },
    {
        title: dictionary.getTranslation("cardTitle3", language),
        color: 'bg-primary',
        count: (isNaN(budgetLeft - totalBills) ? 0 : budgetLeft - totalBills),
        icon: 'fa-piggy-bank'
    }];
}

function generateAnalyitcs(user, language) {
    var lastMonthExpenses = getLastMonthExpenses(user.expense, user.paycheckDate);
    var analyzeExpenses = getExpenseAnalysis(lastMonthExpenses);
    var mostMoneySpentOn = getMostMoneySpentOn(analyzeExpenses);
    var mostTimesPurchased = getMostTimesPurchased(analyzeExpenses);
    
    if (mostMoneySpentOn && mostTimesPurchased) {
        return [{
            rowName: dictionary.getTranslation("analyticsRowName1", language),
            color: mostMoneySpentOn.color,
            category: mostMoneySpentOn.name
        },
        {
            rowName: dictionary.getTranslation("analyticsRowName2", language),
            color: mostTimesPurchased.color,
            category: mostTimesPurchased.name
        }];
    }
    else {
        return [];
    }
}

function generateAlerts(user, language) {
    var alertArray = [];
    for (var element of generateEnvelopeAlerts(user.envelopes, language)) {
        alertArray.push(element);
    }
    for (var element of generateBillsAlerts(user.bills, language)) {
        alertArray.push(element);
    }
    for (var element of generateGoalsAlerts(user.goals, language)) {
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
            categories.get(expense.category.name).color = expense.category.color;            
        }
        else {
            categories.set(expense.category.name, {});
            categories.get(expense.category.name).name = expense.category.name
            categories.get(expense.category.name).sum = parseInt(expense.value);
            categories.get(expense.category.name).count = 1;
            categories.get(expense.category.name).color = expense.category.color;            
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

        if (today > paycheckDate) {
            if ((expenseMonth == previousMonth + 1 && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
                lastMonthExpenses.push(expense);
            }
        }
        else {
            if ((expenseMonth == previousMonth && expenseDay <= paycheckDate) || (expenseMonth == prepreviousMonth && expenseDay > paycheckDate)) {
                lastMonthExpenses.push(expense);
            }
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
        return selectedAnalitic;
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
        return selectedAnalitic;
    }
}

function generateEnvelopeAlerts(envelopes, language) {
    var envelopesAlerts = [];

    var date = new Date();
    var month = getCurrentMonth(date.getMonth());
    var totalAlmostEmptyEnvelopes = getTotalAlmostEmptyEnvelopes(envelopes, month);
    var totalEmptyEnvelopes = getTotalEmptyEnvelopes(envelopes, month);
 
    if (totalAlmostEmptyEnvelopes > 0) {
        envelopesAlerts.push({
            type: 'alert-warning',
            name: dictionary.getTranslation("alertName1", language),
            text: totalAlmostEmptyEnvelopes + dictionary.getTranslation("alertText1", language)
        });
    }
    if (totalEmptyEnvelopes > 0) {
        envelopesAlerts.push({
            type: 'alert-danger',
            name: dictionary.getTranslation("alertName1", language),
            text: totalEmptyEnvelopes + dictionary.getTranslation("alertText1_1", language)
        });

    }

    return envelopesAlerts;
}

function generateBillsAlerts(bills, language) {
    var billsAlerts = [];

    const nearBills = getBillsInTheNext7Days(bills);
    if (nearBills.length > 0) {
        billsAlerts.push({
            type: 'alert-warning',
            name: dictionary.getTranslation("alertName2", language),
            text: nearBills.length + dictionary.getTranslation("alertText2", language)
        })
    }
    return billsAlerts;
}

function generateGoalsAlerts(goals, language) {
    var count = goalsCompleted(goals);
    if (count) {
        return [{
            type: 'alert-success',
            name: dictionary.getTranslation("alertName3", language),
            text: count + dictionary.getTranslation("alertText3", language)
        }];
    }
    else {
        return [];
    }
}

function getTotalAlmostEmptyEnvelopes(envelopes, month) {
    var counter = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress < 100 && envelopes[i].progress > 74 && envelopes[i].month === month) {
            counter++;
        }
    }
    return counter;
}

function getTotalEmptyEnvelopes(envelopes, month) {
    var counter = 0;
    for (var i = 0; i < envelopes.length; i++) {
        if (envelopes[i].progress >= 100 && envelopes[i].month === month) {
            counter++;
        }
    }
    return counter;
}

function getBillsInTheNext7Days(bills) {
    const currentTime = new Date();
    var billsArray = [];

    for (var bill of bills) {
        const billDate = new Date(Date.parse(bill.date)).getTime();
        const diff = (billDate - currentTime.getTime()) / 86400000;
        
        if (diff < 7) {
            billsArray.push(bill);
        }
    }
    return billsArray;
}

function getTotalCost(bills) {
    var sum = 0;
    for (var bill of bills) {
        sum += bill.value;
    }

    return sum;
}

function getCurrentMonth(month) {
    var monthArray = new Array();
    monthArray[0] = "JAN";
    monthArray[1] = "FEB";
    monthArray[2] = "MAR";
    monthArray[3] = "APR";
    monthArray[4] = "MAY";
    monthArray[5] = "JUN";
    monthArray[6] = "JUL";
    monthArray[7] = "AUG";
    monthArray[8] = "SEP";
    monthArray[9] = "OCT";
    monthArray[10] = 'NOV';
    monthArray[11] = 'DEC';

    return monthArray[month];

}

function goalsCompleted(goals) {
    var completed = 0;

    for (var i = 0; i < goals.length; i++){
        if (goals[i].saved >= goals[i].target){
            completed++;
        }  
    }

    return completed;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    }
}