const mongoose = require('mongoose');
const User = mongoose.model('User');
const Connections = mongoose.model('Connections');
const user = require("../models/user");
var fs = require('fs');
const path = require("path");

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function createCon(body, res, session) {

}

function getNewUsers(params, res, session) {
    try {
        console.log(params);
        User.findOne({ 'email': params.email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    var connection = user.connections.find(con => con.name === params.connectionName);
                    var used = [];
                    if (connection) {
                        used.push(connection.users.email);
                    }
                    User.find({ 'email': { $nin: used }}, function(err, users) {
                        if (err) {
                            console.log(err); 
                        } else {
                            var data = [];
                            for (var i = 0; i < users.length; i++) {
                                if (users[i].profilePic == null) {
                                    data.push({
                                        id: users[i]._id,
                                        firstName: users[i].firstname,
                                        lastName: users[i].lastname,
                                        pfp: base64_encode(path.resolve("public/images/Default_pfp.png"))
                                    });
                                }
                                else {
                                    data.push({
                                        id: users[i]._id,
                                        firstName: users[i].firstname,
                                        lastName: users[i].lastname,
                                        pfp: base64_encode(path.resolve(user.profilePic))
                                    });
                                }
                            }
                            res.status(200).json(data);
                        }
                    });   
                    
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

function getUserConnections(params, res, session) {
    try {
        User.findOne({ 'email': params.email }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    
                    res.status(200).json(user.connections);  
                    
                } else {
                    res.sendStatus(404);
                }
            }
        });
    } catch (ex) {
        res.sendStatus(500);
    }
}

module.exports = {
    getNewUsers: function(req, res) {
        getNewUsers(req.query, res, req.session);
    },
    getUserConnections: function(req, res) {
        getUserConnections(req.query, res, req.session);
    }
}