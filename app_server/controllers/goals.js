//Dependencies
const c = require('config');
const user = require('../../app_api/models/user');
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'goals',
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

function translate(language) {
    var translatedKeys = JSON.parse(JSON.stringify(translationKeys));
    Object.keys(translationKeys).forEach(function(key) {
        translatedKeys[key] = dictionary.getTranslation(translatedKeys[key], language);
    });
    return translatedKeys;
}

function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'addGoal':
            {
                addGoal(req, res, session);
                break;
            }
        case 'addToGoalWithCategory':
            {
                addToGoalWithCategory(req, res, session);
                break;
            }
        case 'editGoal':
            {
                editGoal(req, res, session);
                break;
            }
        case 'deleteGoal':
            {
                deleteGoal(req, res, session);
                break;
            }
    }
}


function addToGoalWithCategory(req, res, session) {
    const data = {
        title: req.body.inputCategory,
        amount: req.body.inputAmount,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/addToGoalWithCategory", args,
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

function addGoal(req, res, session) {
    const data = {
        title: req.body.goal,
        target: req.body.amount,
        date: req.body.inputDateAddGoal,
        category: req.body.inputCategory,
        id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/addGoal", args,
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

function editGoal(req, res, session) {
    const data = {
        title: req.body.goal3,
        target: req.body.Amount3,
        date: req.body.inputDate,
        category: req.body.inputCategory,
        user_id: session.user._id,
        goal_id: req.body.id
    }


    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/editGoal", args,
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

function deleteGoal(req, res, session) {
    const data = {
        user_id: session.user._id,
        goal_id: req.body.id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/deleteGoal", args,
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
            data = {...data, ...translate(session.user.language) };
        } else {
            data = {...data, ...translationKeys };
        }
        data.goal = generateGoals(session.user.goals);
        data.card = generateCards(session.user);
        data.categories = getCategories(session.user.categories);
        data.currency = session.user.defaultCurrency;
        res.render('goals', data);
    } else {
        res.redirect('/');
    }
}

function generateGoals(goals) {
    var goalsArray = [];

    for (var goal of goals) {
        var date = goal.date.split("-");
        date[2] = date[2].substring(0, 2);
        var progress = Math.ceil(goal.saved / goal.target * 100);
        var targetLeft = goal.target - goal.saved;
        var monthlyTarget = calculateDailyTarget(goal.date, targetLeft);
        var color = "#2f7cfe";
        if (targetLeft <= 0)
            color = "#00cf1d"

        goalsArray.push({
            _id: goal._id,
            title: goal.title,
            progress: progress,
            target: goal.target,
            targetLeft: targetLeft,
            color: color,
            monthlyTarget: monthlyTarget,
            category: goal.category,
            year: date[0],
            month: date[1],
            day: date[2],
        });
    }
    return goalsArray;
}

function generateCards(currentUser) {
    var totalGoals = currentUser.goals.length;
    var completed = 0;
    var goalCompleted = "";
    for (var i = 0; i < currentUser.goals.length; i++) {
        if (currentUser.goals[i].saved >= currentUser.goals[i].target) {
            completed++;
            goalCompleted += currentUser.goals[i].title + ", ";
        }
    }
    if (completed == 0)
        goalCompleted = "No goals completed.";
    else if (completed > 2)
        goalCompleted = "Multiple goals completed!";
    else {
        goalCompleted = goalCompleted.substring(0, goalCompleted.length - 2);
        goalCompleted += " completed!"
    }

    return [{
            id: 1,
            title: 'Goals Total',
            color: 'bg-primary',
            count: totalGoals,
            icon: 'fa-bullseye'
        },
        {
            id: 2,
            title: 'Goals Completed',
            color: 'green-panel',
            count: completed,
            icon: 'fa-check-circle',
            comment: goalCompleted
        }
    ];
}

function calculateDailyTarget(date, targetLeft) {
    var today = new Date();

    var goalDate = date.split("-");
    var y = parseInt(goalDate[0], 10)
    var m = parseInt(goalDate[1], 10)
    var d = parseInt(goalDate[2], 10)
    const endDate = new Date(y, m - 1, d);

    const diffTime = Math.abs(today - endDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1)
        return targetLeft;
    else
        return Math.ceil(targetLeft / diffDays);

}

function getCategories(categories) {
    var category = [];
    var j = 0;
    for (var i = 0; i < categories.length; i++) {
        if (uniqueCategory(category, categories[i])) {
            category.push({
                _id: categories[i]._id,
                category: categories[i].name
            });
            //category[j] = categories[i].name;
            j++;
        }

    }

    //console.log(category);
    return category;
}

function uniqueCategory(categories, category) {
    if (categories == null) {
        return true;
    }
    for (var i = 0; i < categories.length; i++) {
        if (categories[i]._id === category._id) {
            return false;
        }
    }
    return true;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req, res, req.session);
    }
}