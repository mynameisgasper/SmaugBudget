const { request } = require('express');
const mongoose = require('mongoose');
const friend = require('../models/friend');
const user = require('../models/user');
const { use } = require('../routers/apiRouter');
const FriendGroup = mongoose.model('FriendGroup');
const Friend = mongoose.model('Friend');
const User = mongoose.model('User');
const jwt_decode = require('jwt-decode');

function addFriendGroup(req, res){
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);

            var name = req.body.name;
            var friends = JSON.parse(req.body.friends);

            var check = true;
            for (var i = 0; i < friends.length; i++) {
                const nameTest = checkName(name);
                if (!nameTest) {
                    check = false; 
                    break;
                }
            }

            if(check){
                User.findById(decodedToken._id, function(error, user) {
                    if (error) {
                        console.log(error);
                        const response = {
                            status: 'Error'
                        }
                        res.status(500).json(response);
                    } else {
                        let friendGroup = new FriendGroup({
                            name: name,
                            balance: 0,
                            friends: []
                        });
                        for(var i = 0; i < friends.length; i++){
                            let newFriend = new Friend({
                                name: friends[i],
                                balance: 0
                            });
                            newFriend.save();
                            friendGroup.friends.push(newFriend);
                        }

                        friendGroup.save(function callback(err) {
                            if (err) {
                                console.log(err);
                                const response = {
                                    status: 'Error'
                                }
                                res.status(500).json(response);
                            } else {
                                user.friendgroups.push(friendGroup);
                                user.save();
                                res.status(201).json(friendGroup);
                            }
                        });
                    }
                });
            } else {
                const response = {
                    status: 'Error'
                }
                res.status(400).json(response);
            }
        }
        else {
            const response = {
                status: 'Unauthorized'
            }
            res.status(401).json(response);
        }
    }
    catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function calculateBalances(req, res){
    try {
        const authorization = req.headers.authorization;
        var group_id = req.body.group_id;
        var friends = JSON.parse(req.body.friends);

        var check = true;
        var sumPrice = 0;
        var sumPaid = 0;
        for(var i = 0; i < friends.length; i++){
            for(var j = 0; j < 2; j++){
                const valueTest = checkValues(friends[i][j]);
                if(j == 0)
                    sumPrice += parseInt(friends[i][j]); 
                else
                    sumPaid += parseInt(friends[i][j]); 
                if(!valueTest){
                    check = false;
                }
            }
        }

        if(authorization)
            if(check && sumPrice == sumPaid){
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
                        FriendGroup.findById(group_id, function(error, group){
                            if (error) {
                                console.log(error);
                                const response = {
                                    status: 'Error'
                                }
                                res.status(500).json(response);
                            } else {
                                for(var i = 0; i < group.friends.length; i++){
                                    var newBalance = group.friends[i].balance + (friends[i + 1][1] - friends[i + 1][0]);
                                    group.friends[i].balance = newBalance;
                                }
                                var myBalance = group.balance + (friends[0][1] - friends[0][0]);
                                group.balance = myBalance;
                                group.save();
                                for(var i = 0; i < user.friendgroups.length; i++){
                                    if(user.friendgroups[i]._id == group_id){
                                        user.friendgroups[i] = group;
                                        user.save();
                                        break;
                                    }
                                }
                                res.status(200).json(group);
                            }
                        });
                    }
                });
            } else {
                const response = {
                    status: 'Error'
                }
                res.status(400).json(response);

        } else {
            const response = {
                status: 'Unauthorized'
            }
            res.status(401).json(response);
        }
    }
    catch (ex) {
        console.log(ex);
        const response = {
            status: 'Error'
        }
        res.status(500).json(response);
    }
}

function deleteFriendGroup(req, res){
    try {
        const authorization = req.headers.authorization;
        var group_id = req.body.group_id;

        if(authorization && group_id != undefined) {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt_decode(token);
            FriendGroup.findByIdAndDelete(group_id, function(err, group) {
                if (err) {
                    console.log(err);
                } else {}
            });

            User.findById(decodedToken._id, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    user.friendgroups.pull(group_id);
                    user.save();
                    res.status(204).json(user);
                    return;
                }
                const response = {
                    status: 'Error'
                }
                res.status(404).json(response);
                 return;
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


function checkName(title) {
    var regexTitle = new RegExp("^[A-Za-z0-9 ]{1,20}$");
    const titleTest = regexTitle.test(title);

    return titleTest;
}

function checkValues(value) {
    var regexValue = new RegExp("^[0-9]+(\.[0-9]{1,2})?$");
    const valueTest = regexValue.test(value);

    return valueTest;
}


module.exports = {
    addFriendGroup: function(req, res) {
        addFriendGroup(req, res);
    },
    calculateBalances: function(req, res) {
        calculateBalances(req, res);
    },
    deleteFriendGroup: function(req, res) {
        deleteFriendGroup(req, res);
    }
}