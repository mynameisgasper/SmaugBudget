const mongoose = require('mongoose');
const goals = require('../models/goals');
const { use } = require('../routers/apiRouter');
const Goal = mongoose.model('Goals');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');
const Expenses = mongoose.model('Expense');

function addGoal(requestBody, res) {
    try {
        var title = requestBody.title;
        var target = requestBody.target;
        var date = requestBody.date;
        var categoryName = requestBody.category;
        var userId = requestBody.id;

        //validate date, title and target
        dateOk = checkDate(date);
        const titleTest = checkTitle(title);
        const targetTest = checkTarget(target);

        if (titleTest && targetTest && dateOk) {
            User.findById(userId, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    for (var i = 0; i < user.goals.length; i++) {
                        if (user.goals[i].title == title) {
                            res.sendStatus(304);
                            return;
                        }
                    }

                    //? Try to find the category
                    var category = null;
                    for (var i = 0; i < user.categories.length; i++) {
                        if (user.categories[i].name == categoryName) {
                            category = user.categories[i];
                            break;
                        }
                    }

                    if (category == null) {
                        res.sendStatus(400);
                        return;
                    }

                    let goal = new Goal({
                        title: title,
                        target: target,
                        saved: 0,
                        monthlyTarget: 0,
                        date: date,
                        category: category
                    });

                    goal.save(function callback(err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            user.categories.push(category);
                            user.goals.push(goal);
                            user.save();
                            res.status(200).json(user);
                        }
                    });
                }
            });
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function editGoal(requestBody, res) {
    try {
        var newTitle = requestBody.title;
        var newTarget = requestBody.target;
        var newDate = requestBody.date;
        var newCategory = requestBody.category;
        var user_id = requestBody.user_id;
        var goal_id = requestBody.goal_id;

        //validate date, title and target
        dateOk = checkDate(newDate);
        const titleTest = checkTitle(newTitle);
        const targetTest = checkTarget(newTarget);

        if (titleTest && targetTest && dateOk) {
            User.findById(user_id, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    for (var i = 0; i < user.goals.length; i++) {
                        if (user.goals[i]._id == goal_id) {
                            user.goals[i].title = newTitle;
                            user.goals[i].target = newTarget;
                            user.goals[i].date = newDate;
                            user.goals[i].category.name = newCategory,
                                user.save();

                            break;
                        }
                    }

                    Goal.findByIdAndUpdate(goal_id, {
                        title: newTitle,
                        target: newTarget,
                        date: newDate,
                        category: { name: newCategory }
                    }, function(err, goal) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.status(200).json(user);
                        }
                    });

                }
            });
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function addToGoalWithCategory(requestBody, res) {
    try {
        var title = requestBody.title;
        var amount = requestBody.amount;
        var userId = requestBody.id;

        //validate added amount
        const targetTest = checkTarget(amount);

        if (targetTest) {
            User.findById(userId, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    //? find the correct goal
                    var goal_id = null;
                    for (var i = 0; i < user.goals.length; i++) {
                        if (user.goals[i].title === title) {
                            goal_id = user.goals[i]._id;
                            var new_amount = parseInt(amount) + user.goals[i].saved;
                            if (new_amount > user.goals[i].target)
                                amount = user.goals[i].target

                            user.goals[i].saved = new_amount;

                            Goal.findById(goal_id, function(error, goal) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    goal.saved = new_amount;
                                    goal.save();

                                    var today = new Date();

                                    let expense = new Expenses({
                                        date: today,
                                        category: goal.category,
                                        recipient: 'Added to goal: ' + goal.title,
                                        value: amount,
                                        currency: '€'
                                    });

                                    expense.save(function callback(err) {
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(500);
                                            return;
                                        } else {
                                            user.expense.push(expense);
                                            user.save();
                                            res.status(200).json(user);
                                            return;
                                        }
                                    });

                                }
                            });


                            user.save();
                            break;
                        }
                    }




                }
            });
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function deleteGoal(requestBody, res) {
    try {
        var goal_id = requestBody.goal_id;
        var user_id = requestBody.user_id;

        if (goal_id != undefined) {
            Goal.findByIdAndDelete(goal_id, function(err, goal) {
                if (err) {
                    console.log(err);
                } else {}
            });

            User.findById(user_id, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    for (var i = 0; i < user.goals.length; i++) {
                        if (user.goals[i]._id == goal_id) {
                            user.goals.pull(goal_id);
                            user.save();
                            res.status(200).json(user);
                            return;
                        }
                    }
                    res.status(304);
                    return;
                }
            });
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function checkDate(date) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var inputDate = date.split("-");
    var y = parseInt(inputDate[0], 10)
    var m = parseInt(inputDate[1], 10)
    var d = parseInt(inputDate[2], 10)
    var dateOk;

    if (y > yyyy) {
        dateOk = true;
    } else if (y == yyyy) {
        if (m > mm) {
            dateOk = true;
        } else if (m == mm) {
            if (d >= dd) {
                dateOk = true;
            } else {
                dateOk = false;
            }
        } else {
            dateOk = false;
        }
    } else {
        dateOk = false;
    }

    return dateOk;
}

function checkTitle(title) {
    var regexTitle = new RegExp("^[A-Za-z0-9 ]{1,20}$");
    const titleTest = regexTitle.test(title);

    return titleTest;
}

function checkTarget(target) {
    var regexTarget = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    const targetTest = regexTarget.test(target);

    return targetTest;
}

module.exports = {
    addGoal: function(req, res) {
        addGoal(req.body, res);
    },
    editGoal: function(req, res) {
        editGoal(req.body, res);
    },
    addToGoalWithCategory: function(req, res) {
        addToGoalWithCategory(req.body, res);
    },
    deleteGoal: function(req, res) {
        deleteGoal(req.body, res);
    }
}