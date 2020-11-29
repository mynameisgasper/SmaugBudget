const mongoose = require('mongoose');
const User = mongoose.model('User');
const Connections = mongoose.model('Connections');
const Envelopes = mongoose.model('Envelopes');
const Categories = mongoose.model('Categories');
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
        User.find({}, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    
                    res.status(200).json(user);
                        
                    
                    
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

function addConnection(body, res, session) {
    try {
        console.log(body.users);
        if (body.users !== "undefined") {
            body.users = JSON.parse(body.users);
        } else {
            body.users = [];
        }
        if (body.envelopes !== "undefined") {
            body.envelopes = JSON.parse(body.envelopes);
        } else {
            body.envelopes = [];
        }
        body.users.push(body.email);
        
        if (body.users && body.envelopes) {
            console.log("line0" + body.email);
            Connections.findOne({ 'name' : body.connectionName, 'hostUser.email' : body.email }, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("line1");
                    if (user) {
                        res.sendStatus(403);
                    } else {
                        User.find({ 'email' : { $in : body.users }}, function (err, users) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("line2");
                                if (users) {
                                    Envelopes.find({ '_id' : { $in : body.envelopes } }, function (err, envelopes) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            if (envelopes) {
                                                console.log(users);
                                                let con = new Connections ({
                                                    name: body.connectionName,
                                                    guestName: body.connectionName+"_",
                                                    active: true,
                                                    user: users,
                                                    hostUser: users.find(x => x.email === body.email),
                                                    envelopes: envelopes
                                                });
                                                con.guestName = con.guestName + con.hostUser.lastname;
                                                
                                                con.save();
                                                for (var i = 0; i < users.length; i++) {
                                                    users[i].connections.push(con);
                                                    let usrTren = users[i];
                                                    usrTren.save();
                                                }
                                                res.status(200).json(con.hostUser);
                                            } else {
                                                res.sendStatus(404); 
                                            }
                                        }
                                    });
                                } else {
                                    res.sendStatus(404);
                                }
                            }
                        });
                    }
                }
            });
        } else {
            res.sendStatus(403);
        }
    } catch (ex) {
        console.log(ex);
        res.sendStatus(500);
    }
}

function getEnvelopesForDropdown (parameters, res, session) {
    try {
        Connections.findOne({ 'hostUser.email' : parameters.email, 'name' : parameters.connectionName }, function (err, connection) {
            if (err) {
                console.log(err);
            } else {
                if (connection) {
                    var selId = {};
                    connection.envelopes.forEach(element => {
                        selId.push(connection.envelopes[element]._id);
                        connection.envelopes[element].checked = true;
                    });
                    Envelopes.find({ '_id' : { $nin : selId } }, function(err, unchecked) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (unchecked) {
                                var all = {...connection.envelopes, ...unchecked};
                                res.status(200).json(all);
                            } else {
                                res.status(200).json(connection.envelopes);
                            }
                            
                        }
                    });
                } else {
                    Envelopes.find({}, function (err, unchecked) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (unchecked) {
                                res.status(200).json(unchecked);
                            } else {
                                res.status(200).json([]);
                            }
                        }  
                    });
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
    },
    addConnection: function(req, res) {
        addConnection(req.body, res, req.session);
    },
    getEnvelopesForDropdown: function(req, res) {
        getEnvelopesForDropdown(req.query, res, req.session);
    }
}