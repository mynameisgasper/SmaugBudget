//Dependencies
var dictionary = require('./Dictionary');

function respond(res) {
    res.render('dashboard', ({
        fileName: 'dashboard',
        welcomeMessage: dictionary.getTranslation("welcomeMessage"),
        card: [{
            title: dictionary.getTranslation("cardTitle1"),
            color: 'bg-primary',
            count: '584,5',
            icon: 'fa-university'
        },
        {
            title: dictionary.getTranslation("cardTitle2"),
            color: 'bg-primary',
            count: '384,5',
            icon: 'fa-coins'
        },
        {
            title: dictionary.getTranslation("cardTitle3"),
            color: 'bg-primary',
            count: '420',
            icon: 'fa-piggy-bank'
        }],
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
        income: 1500,
        expenses: 900,
        balance: 600,
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
        }
        ],
        graph: {
            used: true,
            name: 'DashboardChart'
        },

        //translations
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
        incomeModalCloseButton: dictionary.getTranslation("incomeModalCloseButton")
    }));
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}