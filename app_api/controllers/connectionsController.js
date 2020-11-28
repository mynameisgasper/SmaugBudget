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
        if (body.users && body.envelopes) {
            Connections.findOne({ 'name' : body.connectionName, 'hostUser.email' : session.user.email }, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    if (user) {
                        res.sendStatus(403);
                    } else {
                        User.find({ '_id' : { $in : body.users }}, function (err, users) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (users) {
                                    Envelopes.find({ '_id' : { $in : body.envelopes } }, function (err, envelopes) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            if (envelopes) {
                                                let con = new Connections ({
                                                    name: body.connectionName,
                                                    guestName: body.connectionName_session.user.lastname,
                                                    active: true,
                                                    user: users,
                                                    hostUser: users.find(x => x.email === session.user.email),
                                                    envelopes: envelopes
                                                });
                                                con.save();
                                                for (var i = 0; i < users.length; i++) {
                                                    users[i].connections.push(con);
                                                    let usrTren = users[i];
                                                    usrTren.save();
                                                }
                                                res.sendStatus(200).json("success");
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