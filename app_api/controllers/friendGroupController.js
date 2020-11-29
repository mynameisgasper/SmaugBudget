const mongoose = require('mongoose');
const { use } = require('../routers/apiRouter');
const FriendGroup = mongoose.model('FriendGroup');
const Friend = mongoose.model('Friend');

function addFriendGroup(requestBody, res){
    var name = requestBody.name;
    var friend1 = requestBody.friend1;
    var friend2 = requestBody.friend2;
    var friend3 = requestBody.friend3;
    var friend4 = requestBody.friend4;

    
}





module.exports = {
    addFriendGroup: function(req, res) {
        addFriendGroup(req.body, res);
    }
}