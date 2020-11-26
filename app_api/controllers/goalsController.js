const mongoose = require('mongoose');
const { use } = require('../routers/apiRouter');
const Goal = mongoose.model('Goals');
const User = mongoose.model('User');
const Categories = mongoose.model('Categories');


function addGoal(requestBody, res) {
    try {
        var title = requestBody.title;
        var target = requestBody.target;
        //var monthlyTarget = requestBody.monthlyTarget;
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

                    //? Try to find the category, create it if it doesn't exist.
                    var category = null;
                    for (var i = 0; i < user.categories.length; i++) {
                        if (user.categories[i].name === categoryName) {
                            category = user.categories[i];
                            break;
                        }
                    }

                    if (category == null) {
                        let cat = new Categories({
                            name: categoryName,
                        })
                        cat.save();
                        category = cat;
                    }

                    let goal = new Goal({
                        title: title,
                        target: target,
                        saved: 0,
                        monthlyTarget: 0,
                        date: date,
                        category: { name: category }
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
        var newTitle = requestBody.goal3;
        var newTarget = requestBody.amount3;
        //var monthlyTarget = requestBody.monthlyTarget;
        var newDate = requestBody.inputDate;
        var newCategory = requestBody.inputCategory;

        var id_requested = "5fbebcc5dd5dbb3c14eb20f6"; //v moji bazi

        //validate date, title and target
        dateOk = checkDate(newDate);
        const titleTest = checkTitle(newTitle);
        const targetTest = checkTarget(newTarget);

        if (titleTest && targetTest && dateOk) {
            Goal.findByIdAndUpdate(id_requested, {
                title: newTitle,
                target: newTarget,
                date: newDate,
                category: { name: newCategory }
            }, function(err, goal) {
                if (err) {
                    console.log(err);
                } else {
                    if (goal) {
                        goal.save();
                        res.status(200).json(goal);
                    } else {
                        res.sendStatus(404);
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

function addToGoal(requestBody, res) {
    try {
        var addedAmount = requestBody.amount2;

        var id_requested = "5fbebcc5dd5dbb3c14eb20f6"; //v moji bazi

        //validate added amount
        const targetTest = checkTarget(addedAmount);

        if (targetTest) {
            Goal.findById(id_requested, function(err, goal) {
                if (err) {
                    console.log(err);
                } else {
                    if (goal) {
                        goal.targetLeft -= addedAmount
                        goal.save();
                        res.status(200).json(goal);
                    } else {
                        res.sendStatus(404);
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
        var id_requested = "5fbec13be03d4a2d402da505"; //primer iz moje baze
        if (id_requested != undefined) {
            Goal.findByIdAndDelete(id_requested, function(err, goal) {
                if (err) {
                    console.log(err);
                } else {
                    if (goal) {
                        res.status(204).json(goal);
                    } else {
                        res.sendStatus(404);
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
    var regexTitle = new RegExp("^[A-Za-z0-9]{1,20}$");
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
    addToGoal: function(req, res) {
        addToGoal(req.body, res);
    },
    deleteGoal: function(req, res) {
        deleteGoal(req.body, res);
    }
}