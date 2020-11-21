//Dependencies

function respond(res) {
    res.render('dashboard', ({
        fileName: 'dashboard',
        welcomeMessage:'A simple overview of your spending.',
        card: [{
            title: 'Budget Left',
            color: 'bg-primary',
            count: '584,5',
            icon: 'fa-university'
        },
        {
            title: 'Expenses Left',
            color: 'bg-primary',
            count: '384,5',
            icon: 'fa-coins'
        },
        {
            title: 'Savings',
            color: 'bg-primary',
            count: '420',
            icon: 'fa-piggy-bank'
        }],
        alert: [{
            type: 'alert-warning',
            name: 'ENVELOPES',
            text: '1 almost empty'
        },
        {
            type: 'alert-warning',
            name: 'BILLS',
            text: '1 bill to pay this week'
        },
        ,{
            type: 'alert-success',
            name: 'GOALS',
            text: '1 goal completed'
        }],
        income: 1500,
        expenses: 900,
        balance: 600,
        analytics: [{
            rowName: 'Most money spent on',
            color: 'rgb(94, 192, 193)',
            category: 'Entertainment'
        },
        {
            rowName: 'Most times purchased',
            color: 'rgb(251, 203, 72)',
            category: 'Groceries'
        },
        {
            rowName: 'Biggest change from last month',
            color: 'rgb(94, 192, 193)',
            category: 'Entertainment'
        },
        {
            rowName: 'Least change from last month',
            color: 'rgb(247, 158, 55)',
            category: 'Phone'
        }
        ],
        graph: {
            used: true,
            name: 'DashboardChart'
        },
    }));
}

module.exports = {
    get: function(req, res) {
        respond(res);
    }
}