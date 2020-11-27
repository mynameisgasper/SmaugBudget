//Dependencies
const c = require('config');
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'goals',
    /*goal: [{
            id: 0,
            title: 'iPhone',
            progress: 100,
            target: 1200,
            targetLeft: 0,
            monthlyTarget: 0,
            category: 'Electronics',
            color: '#00cf1d',
            year: '2021',
            month: '06',
            day: '12',
        },
        {
            id: 1,
            title: 'Ferrari F8 Tributo',
            progress: 69,
            target: 1500,
            targetLeft: 1500,
            monthlyTarget: 1000,
            category: 'Car',
            year: '2021',
            month: '03',
            day: '25',
        }
    ],*/
    card: [{
            id: 1,
            title: 'Goals Total',
            color: 'bg-primary',
            count: 3,
            icon: 'fa-bullseye'
        },
        {
            id: 2,
            title: 'Goals Completed',
            color: 'green-panel',
            count: 1,
            icon: 'fa-check-circle',
            comment: 'iPhone 12 Pro completed!'
        }
    ],
    categories: [
        { id: 1, category: "Furniture" },
        { id: 2, category: "Electronics" },
        { id: 3, category: "Trip" },
        { id: 4, category: "Party" },
        { id: 5, category: "Wedding" },
        { id: 6, category: "Car" },
        { id: 7, category: "Other" },
    ]
};

var translationKeys = {
    message: "messageGoals",
    welcomeMessage: "welcomeMessageGoals",
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
    return translatedKeys;
}

function parseRequestBody(body, res, session) {
    switch (body.formType) {
        case 'addGoal':
            {
                addGoal(body, res, session);
                break;
            }
        case 'addToGoalWithCategory':
            {
                addToGoalWithCategory(body, res, session);
                break;
            }
        case 'editGoal':
            {
                editGoal(body, res, session);
                break;
            }
        case 'deleteGoal':
            {
                deleteGoal(body, res, session);
                break;
            }
    }
}


function addToGoalWithCategory(body, res, session) {
    const data = {
        title: body.inputCategory,
        amount: body.inputAmount,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/addToGoalWithCategory", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/goals');
            } else {
                console.log(response.statusCode);
                res.redirect('/goals#error');
                
            }
        }
    );
}

function addGoal(body, res, session) {
    const data = {
        title: body.goal,
        target: body.amount,
        date: body.inputDateAddGoal,
        category: body.inputCategory,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/addGoal", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/goals');
            } else {
                res.redirect('/goals#error');
            }
        }
    );
}


function respond(res, session) {
    if (session.user) {
        if (session.user.language) {
            data = {...data, ...translate(session.user.language)};
        } else {
            data = {...data, ...translationKeys};
        }
        data.goal = generateGoals(session.user.goals);
        res.render('goals', data);
    } else {
        res.redirect('/');
    }
}

function generateGoals(goals){
    var goalsArray = [];

    for (var goal of goals) {
        var date = goal.date.split("-");
        var progress = Math.ceil(goal.saved / goal.target * 100);
        var targetLeft = goal.target - goal.saved;
        var monthlyTarget = calculateMonthlyTarget(goal.date, targetLeft);
        
        goalsArray.push({
            id: goal._id,
            title: goal.title,
            progress: progress,
            target: goal.target,
            targetLeft: targetLeft,
            monthlyTarget: monthlyTarget,
            category: goal.category,
            year: date[0],
            month: date[1],
            day: date[2],
        });
    }
    return goalsArray;
}

function calculateMonthlyTarget(date, targetLeft){
    var today = new Date();

    var goalDate = date.split("-");
    var y = parseInt(goalDate[0], 10)
    var m = parseInt(goalDate[1], 10)
    var d = parseInt(goalDate[2], 10)
    const endDate = new Date(y, m - 1, d);

    const diffTime = Math.abs(today - endDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays < 1)
        return targetLeft;
    else
        return Math.ceil(targetLeft / diffDays);
    
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req.body, res, req.session);
    }
}