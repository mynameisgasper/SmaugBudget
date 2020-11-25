const mongoose = require('mongoose');
const Goal = mongoose.model('Goals');

function addGoal(requestBody, res) {
    try {
        var title = requestBody.goal;
        var target = requestBody.amount;
        //var monthlyTarget = requestBody.monthlyTarget;
        var date = requestBody.inputDateAddGoal;
        var category = requestBody.inputCategory;

        //validate date, title and target
        dateOk = checkDate(date);
        const titleTest = checkTitle(title);
        const targetTest  = checkTarget(target);
        
        if (titleTest && targetTest && dateOk) {
            let goal = new Goal({
                title: title,
                target: target,
                targetLeft: target,
                monthlyTarget: 0,
                date: date,
                category: {name: category}
            });
            goal.save();
            res.status(200).json(goal);
        }
        else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function editGoal(requestBody, res) {
    try {
        var newTitle = requestBody.goal;
        var newTarget = requestBody.amount;
        //var monthlyTarget = requestBody.monthlyTarget;
        var newDate = requestBody.inputDateAddGoal;
        var newCategory = requestBody.inputCategory;

        var id_requested = "5fbebcc5dd5dbb3c14eb20f6";  //v moji bazi

        //validate date, title and target
        dateOk = checkDate(newDate);
        const titleTest = checkTitle(newTitle);
        const targetTest  = checkTarget(newTarget);
        
        if (titleTest && targetTest && dateOk) {
            Goal.findByIdAndUpdate(id_requested, {
                title: newTitle,
                target: newTarget,
                date: newDate,
                category: {name: newCategory}
            }, function (err, goal) { 
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
        }
        else {
            res.sendStatus(400);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}



function checkDate(date){
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
    } 
    else if (y == yyyy) {
        if (m > mm) {
            dateOk = true;
        } 
        else if (m == mm) {
            if (d >= dd) {
                dateOk = true;
            } 
            else {
                dateOk = false;
            }
        } 
        else {
            dateOk = false;
        }
    } 
    else {
        dateOk = false;
    }

    return dateOk;
}

function checkTitle(title){
    var regexTitle = new RegExp("^[A-Za-z0-9]{1,20}$"); 
    const titleTest = regexTitle.test(title);

    return titleTest;
}

function checkTarget(target){
    var regexTarget = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    const targetTest  = regexTarget.test(target);

    return targetTest;
}

module.exports = {
    addGoal: function(req, res) {
        addGoal(req.body, res);
    },
    editGoal: function(req, res) {
        editGoal(req.body, res);
    }
}