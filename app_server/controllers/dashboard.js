//Dependencies
var dictionary = require('./Dictionary');

var data = {
    fileName: 'dashboard',
    message:dictionary.getTranslation("messageDashboard"),
    welcomeMessage: dictionary.getTranslation("welcomeMessageDashboard"),
    alert: [{
        type: 'alert-warning',
        name: dictionary.getTranslation("alertName1"),
        text: dictionary.getTranslation("alertText1")
    },
    {
        type: 'alert-warning',
        name: dictionary.getTranslation("alertName2"),
        text: dictionary.getTranslation("alertText2")
    },
    ,{
        type: 'alert-success',
        name: dictionary.getTranslation("alertName3"),
        text: dictionary.getTranslation("alertText3")
    }],
    incomeLastMonth: 1500,
    expensesLastMonth: 900,
    analytics: [{
        rowName: dictionary.getTranslation("analyticsRowName1"),
        color: 'rgb(94, 192, 193)',
        category: dictionary.getTranslation("analyticsCategory1")
    },
    {
        rowName: dictionary.getTranslation("analyticsRowName2"),
        color: 'rgb(251, 203, 72)',
        category: dictionary.getTranslation("analyticsCategory2")
    },
    {
        rowName: dictionary.getTranslation("analyticsRowName3"),
        color: 'rgb(94, 192, 193)',
        category: dictionary.getTranslation("analyticsCategory3")
    },
    {
        rowName: dictionary.getTranslation("analyticsRowName4"),
        color: 'rgb(247, 158, 55)',
        category: dictionary.getTranslation("analyticsCategory4")
    }],
    graph: {
        used: true,
        name: 'DashboardChart'
    },
    
    alertSection: dictionary.getTranslation("alertSection"),
    overview:  dictionary.getTranslation("overview"),
    incomeRow: dictionary.getTranslation("incomeRow"),
    expensesRow: dictionary.getTranslation("expensesRow"),
    balanceRow: dictionary.getTranslation("balanceRow"),
    analyticsField: dictionary.getTranslation("analyticsField"),
    incomeModalTitle: dictionary.getTranslation("incomeModalTitle"),
    incomeModalPlaceholderIncome: dictionary.getTranslation("incomeModalPlaceholderIncome"),
    incomeModalPlaceholderDate: dictionary.getTranslation("incomeModalPlaceholderDate"),
    incomeModalSaveButton: dictionary.getTranslation("incomeModalSaveButton"),
    incomeModalCloseButton: dictionary.getTranslation("incomeModalCloseButton"),

    //translations main
    logout: dictionary.getTranslation("logout"),
    //translations navbar
    DASHBOARD: dictionary.getTranslation("DASHBOARD"),
    ENVELOPES: dictionary.getTranslation("ENVELOPES"),
    GOALS: dictionary.getTranslation("GOALS"),
    BILLS: dictionary.getTranslation("BILLS"),
    HISTORY: dictionary.getTranslation("HISTORY"),
    UTILITIES: dictionary.getTranslation("UTILITIES"),
    user: dictionary.getTranslation("user"),
    settings: dictionary.getTranslation("settings"),
    appearance: dictionary.getTranslation("appearance"),
    light: dictionary.getTranslation("light"),
    dark: dictionary.getTranslation("dark")
};

function respond(res, session) {
    if (session.user) {
        data.card = generateCards(session.user);
        data.incomeLastMonth = (session.user.paycheckLastMonth ? session.user.paycheckLastMonth : 0);
        data.expensesLastMonth = 0;
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