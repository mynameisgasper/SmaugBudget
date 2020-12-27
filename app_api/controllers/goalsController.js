const mongoose = require('mongoose');
const goals = require('../models/goals');
const { use } = require('../routers/apiRouter');
const Goal = mongoose.model('Goals');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');
const Expenses = mongoose.model('Expense');
const jwt_decode = require('jwt-decode');

function addGoal(req, res) {
    try {
        const authorization = req.headers.authorization;
        var title = req.body.name;
        var target = req.body.amount;
        var date = req.body.date;
        var categoryName = req.body.category;

        //validate date, title and target
        dateOk = checkDate(date);
        const titleTest = checkTitle(title);
        const targetTest = checkTarget(target);

        if (authorization && titleTest && targetTest && dateOk) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            User.findById(decodedToken._id, function(error, user) {
                if (error) {
                    const response = {
                        status: 'Error'
                    }
                    console.log(error);
                    res.status(500).json(response);
                } else {
                    for (var i = 0; i < user.goals.length; i++) {
                        if (user.goals[i].title == title) {
                            const response = {
                                status: 'Goal already exists'
                            }
                            res.status(304).json(response);
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
                        const response = {
                            status: 'Invalid category'
                        }
                        res.status(400).json(response);
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
                            const response = {
                                status: 'Error'
                            }
                            res.status(500).json(response);
                        } else {
                            user.categories.push(category);
                            user.goals.push(goal);
                            user.save();
                            res.status(200).json(goal);
                        }
                    });
                }
            });
        } else {
            const response = {
                status: 'Bad request'
            }
            res.status(400).json(response);
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function editGoal(req, res) {
    try {
        const authorization = req.headers.authorization;

        var newTitle = req.body.name;
        var newTarget = req.body.amount;
        var newDate = req.body.date;
        var newCategory = req.body.category;
        var goal_id = req.body.goal_id;

        //validate date, title and target
        dateOk = checkDate(newDate);
        const titleTest = checkTitle(newTitle);
        const targetTest = checkTarget(newTarget);

        if (authorization && titleTest && targetTest && dateOk) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            User.findById(decodedToken._id, function(error, user) {
                if (error) {
                    console.log(error);
                    const response = {
                        status: 'Error'
                    }
                    res.status(500).json(response);
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
                            goal.title = newTitle;
                            goal.target = newTarget;
                            goal.date = newDate;
                            goal.category.name = newCategory;
                            goal.save();
                            res.status(200).json(goal);
                        }
                    });

                }
            });
        } else {
            const response = {
                status: 'Bad request'
            }
            res.status(400).json(response);
            
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function addToGoalWithCategory(req, res) {
    try {
        const authorization = req.headers.authorization;
        var title = req.body.title;
        var amount = req.body.amount;

        //validate added amount
        const targetTest = checkTarget(amount);

        if (authorization && targetTest) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            User.findById(decodedToken._id, function(error, user) {
                if (error) {
                    console.log(error);
                    const response = {
                        status: 'Error'
                    }
                    res.send(500).json(response);
                } else {
                    //? find the correct goal
                    var goal_id = null;
                    for (var i = 0; i < user.goals.length; i++) {
                        if (user.goals[i].title === title) {
                            goal_id = user.goals[i]._id;
                            var new_amount = parseInt(amount) + user.goals[i].saved;
                            if (new_amount > user.goals[i].target)
                            new_amount = user.goals[i].target

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
                                        recipient: 'Goal: ' + goal.title,
                                        value: amount,
                                        currency: user.defaultCurrency
                                    });

                                    expense.save(function callback(err) {
                                        if (err) {
                                            console.log(err);
                                            const response = {
                                                status: 'Error'
                                            }
                                            res.status(500).json(response);
                                            return;
                                        } else {
                                            user.expense.push(expense);
                                            user.save();
                                            res.status(200).json(goal);
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
            const response = {
                status: 'Bad request'
            }
            res.status(400).json(response);
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function deleteGoal(req, res) {
    try {
        const authorization = req.headers.authorization;
        var goal_id = req.body.goal_id;

        if (authorization && goal_id != undefined) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            Goal.findByIdAndDelete(goal_id, function(err, goal) {
                if (err) {
                    console.log(err);
                } else {}
            });

            User.findById(decodedToken._id, function(err, user) {
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
                    const response = {
                        status: 'Error'
                    }
                    res.status(304).json(response);
                    return;
                }
            });
        } else {
            const response = {
                status: 'Bad request'
            }
            res.status(400).json(response);
        }
    } catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
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
    var regexTitle = new RegExp("^[A-Za-z0-9 ]{1,16}$");
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
        addGoal(req, res);
    },
    editGoal: function(req, res) {
        editGoal(req, res);
    },
    addToGoalWithCategory: function(req, res) {
        addToGoalWithCategory(req, res);
    },
    deleteGoal: function(req, res) {
        deleteGoal(req, res);
    }
}