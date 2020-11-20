/*
 * Entery point for SmaugBudget server 
 */

const config = require('./config/server.json');

var server = require('./api/controller.js');
server.startServer(config.socket.port);