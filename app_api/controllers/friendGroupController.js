const mongoose = require('mongoose');
const user = require('../models/user');
const { use } = require('../routers/apiRouter');
const FriendGroup = mongoose.model('FriendGroup');
const Friend = mongoose.model('Friend');
const User = mongoose.model('User');

function addFriendGroup(requestBody, res){
    try {
        var name = requestBody.name;
        var friend1 = requestBody.friend1;
        var friend2 = requestBody.friend2;
        var user_id = "5fc2b56a9b5aac361006f64c";
        
        const nameTest = checkName(name);

        if(nameTest){
            User.findById(user_id, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    let newFriend1 = new Friend({
                        name: friend1,
                        balance: 0
                    });
                    let newFriend2 = new Friend({
                        name: friend2,
                        balance: 0
                    });
                    newFriend1.save();
                    newFriend2.save();

                    let friendGroup = new FriendGroup({
                        name: name,
                        friends: [ newFriend1 , newFriend2 ]
                    });

                    friendGroup.save(function callback(err) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            user.friendgroups.push(friendGroup);
                            user.save();
                            res.status(200).json(user);
                        }
                    });
                }
            });
        }

    

    }
    catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}


function checkName(title) {
    var regexTitle = new RegExp("^[A-Za-z0-9 ]{1,20}$");
    const titleTest = regexTitle.test(title);

    return titleTest;
}


module.exports = {
    addFriendGroup: function(req, res) {
        addFriendGroup(req.body, res);
    }
}