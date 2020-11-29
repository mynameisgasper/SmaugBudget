//Dependencies
var dictionary = require('./Dictionary');
var Client = require('node-rest-client').Client;

var data = {
    utility: true,
    fileName: 'utilities',
    /*groupMember: [{
        id: 1,
        name: 'Grega',
        amount: '+5,00'
    },
    {   
        id: 2,
        name: 'Luka',
        amount: '-3,40'
    },
    {   
        id: 3,
        name: 'Miha',
        amount: '+2,47'
    },
    {
        id: 4,
        name: 'Gašper',
        amount: '-1,20'
    },
    {
        id: 5,
        name: 'Tim',
        amount: '+420,69'
    }],
    Friend: [{
        Group: 'Fri group',
        Next: 'Kranjec',
        Balance: '+15,3'
    }]*/
};

var translationKeys = {
    message: "messageUtilities",
    welcomeMessage: "welcomeMessageUtilities",
    //translations main
    logout: "logout",
    //translations navbar
    DASHBOARD: "DASHBOARD",
    ENVELOPES: "ENVELOPES",
    GOALS: "GOALS",
    BILLS: "BILLS",
    HISTORY: "HISTORY",
    UTILITIES: "UTILITIES",
    user: "user",
    settings: "settings",
    appearance: "appearance",
    light: "light",
    dark: "dark"
}

function translate (language) {
    var translatedKeys = JSON.parse(JSON.stringify(translationKeys));
    Object.keys(translationKeys).forEach(function(key) {
        translatedKeys[key] = dictionary.getTranslation(translatedKeys[key], language);
    });
    return translatedKeys;
}

function parseRequestBody(req, res, session) {
    switch (req.body.formType) {
        case 'addGroup':
            {
                addGroup(req, res, session);
                break;
            }
        case 'deleteFriendGroup':
            {
                deleteGroup(req, res, session);
                break;
            }
    }
}

function addGroup(req, res, session) {
    var counter = req.body.counter;
    var friends = [];
    for(var i = 1; i <= counter; i++){
        var inputMember = "inputMember" + i;
        friends[i - 1] = req.body[inputMember];
    }

    const data = {
        name: req.body.inputGroupName,
        friends: JSON.stringify(friends),
        user_id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/addFriendGroup", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/utility');
            } else {
                console.log(response.statusCode);
                res.redirect('/utility#error');
                
            }
        }
    );
}

function deleteGroup(req, res, session) {
    const data = {
        group_id: req.body.id,
        user_id: session.user._id
    }

    var args = {
        data: data,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    var client = new Client();
    client.post("http://" + req.headers.host + "/api/deleteFriendGroup", args,
        function(data, response) {
            if (response.statusCode == 200) {
                res.session = session;
                res.session.user = data;
                res.redirect('/utility');
            } else {
                console.log(response.statusCode);
                res.redirect('/utility#error');
                
            }
        }
    );
}


function respond(res, session) {
    if (session.user) {
        if (session.user.language) {
            data = {...data, ...translate(session.user.language)};
        } else {
            data = {...data, ...translationKeys};
        }
        data.Friend = generateGroups(session.user.friendgroups, session.user._id);
        res.render('utilities', data);
    }
    else {
        res.redirect('/');
    }
}

function generateGroups(groups, myId, myName){
    var groupsArray = [];

    for(var group of groups){
        var memberArray = [];
        var members = group.friends;
        memberArray = insertMe(memberArray, myId, group.balance);
        for(var member of members){
            memberArray.push({
                id: member._id,
                name: member.name,
                amount: member.balance
            })
        }
        groupsArray.push({
            id: group._id,
            Group: group.name,
            Next: 'TBD',
            Balance: group.balance,
            groupMember: memberArray
        })
    }
    return groupsArray;
}

function insertMe(memberArray, myId, myBalance){
    memberArray.push({
        id: myId,
        name: 'Me',
        amount: myBalance
    });

    return memberArray;
}

module.exports = {
    get: function(req, res) {
        respond(res, req.session);
    },
    post: function(req, res) {
        parseRequestBody(req, res, req.session);
    }
}