//Dependencies
const c = require('config');
const user = require('../../app_api/models/user');
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    fileName: 'goals',
    /*categories: [
        { id: 1, category: "Furniture" },
        { id: 2, category: "Electronics" },
        { id: 3, category: "Trip" },
        { id: 4, category: "Party" },
        { id: 5, category: "Wedding" },
        { id: 6, category: "Car" },
        { id: 7, category: "Other" },
    ]*/
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

function editGoal(body, res, session) {
    const data = {
        title: body.goal3,
        target: body.Amount3,
        date: body.inputDate,
        category: body.inputCategory,
        user_id: session.user._id,
        goal_id: body.id
    }
    

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/editGoal", args,
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

function deleteGoal(body, res, session) {
    const data = {
        user_id: session.user._id,
        goal_id: body.id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://localhost:8080/api/deleteGoal", args,
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
        data.card = generateCards(session.user);
        data.categories = getCategories(session.user.categories);
        res.render('goals', data);
    } else {
        res.redirect('/');
    }
}

function generateGoals(goals) {
    var goalsArray = [];
    //console.log(goals);

    for (var goal of goals) {
        var date = goal.date.split("-");
        var progress = Math.ceil(goal.saved / goal.target * 100);
        var targetLeft = goal.target - goal.saved;
        var monthlyTarget = calculateDailyTarget(goal.date, targetLeft);
        var color = "#2f7cfe";
        if(targetLeft <= 0)
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
    for(var i = 0; i < currentUser.goals.length; i++){
        if(currentUser.goals[i].saved >= currentUser.goals[i].target){
            completed++;
            goalCompleted += currentUser.goals[i].title + ", ";
        }  
    }
    if(completed > 2)
        goalCompleted = "Multiple goals";
    else
        goalCompleted = goalCompleted.substring(0, goalCompleted.length - 2);

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
        comment: goalCompleted + ' completed!'
    }
    ];
}

function calculateDailyTarget(date, targetLeft){
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
        parseRequestBody(req.body, res, req.session);
    }
}