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

function calculateBalances(requestBody, res){
    try {
        var group_id = "5fc3a5f976b32f35a42bd3cf";
        var user_id = "5fc2b56a9b5aac361006f64c";
        
        //const nameTest = checkName(name);

        if(true){
            User.findById(user_id, function(error, user) {
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    FriendGroup.findById(group_id, function(error, group){
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                        } else {
                            var data = Array.from(Array(group.friends.length), () => new Array(3))
                            data[0][0]  = requestBody.friend1name;
                            data[0][1]  = requestBody.friend1bill;
                            data[0][2]  = requestBody.friend1paid;
                            data[1][0] = requestBody.friend2name;
                            data[1][1] = requestBody.friend2bill;
                            data[1][2] = requestBody.friend2paid;

                            for(var i = 0; i < group.friends.length; i++){
                                var newBalance = group.friends[i].balance + (data[i][2] - data[i][1]);
                                group.friends[i].balance = newBalance;
                                //console.log(newBalance + " " + i + " " + group.friends[i]._id);
                                /*Friend.findById(group.friends[i]._id, function(error, friend){
                                    if (error) {
                                        console.log(error);
                                        res.sendStatus(500);
                                    } else {
                                            console.log(friend.name + " " + i + " " + friend._id);
                                            friend.balance = newBalance;
                                            console.log(friend.balance);
                                            friend.save();
                                    }
                                });*/
                            }
                            group.save();
                            for(var i = 0; i < user.friendgroups.length; i++){
                                if(user.friendgroups[i]._id == group_id){
                                    user.friendgroups[i] = group;
                                    user.save();
                                    break;
                                }
                            }
                            res.sendStatus(200);
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

function deleteFriendGroup(requestBody, res){
    try {
        var group_id = "5fc3a6475714a42eaca5042a";
        var user_id = "5fc2b56a9b5aac361006f64c";

        if (group_id != undefined) {
            FriendGroup.findByIdAndDelete(group_id, function(err, group) {
                if (err) {
                    console.log(err);
                } else {}
            });

            User.findById(user_id, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    user.friendgroups.pull(group_id);
                    user.save();
                    res.status(200).json(user);
                    return;
                }
                res.status(304);
                 return;
            });
        } else {
            res.sendStatus(400);
        }
    } catch (ex) {
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
    },
    calculateBalances: function(req, res) {
        calculateBalances(req.body, res);
    },
    deleteFriendGroup: function(req, res) {
        deleteFriendGroup(req.body, res);
    }
}