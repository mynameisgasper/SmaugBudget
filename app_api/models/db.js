const config = require('../../app_server/config/server.json');
const mongoose = require('mongoose');

<<<<<<< HEAD
=======
var dbURI = config.database.url;
if (process.env.NODE_ENV === 'production') {
    dbURI = "mongodb+srv://user:smauguser!@smaugbudget.tv1kk.mongodb.net/SmaugBudget?retryWrites=true&w=majority";;
} else if (process.env.NODE_ENV === 'docker') {
    dbURI = 'mongodb://mongo-db/SmaugBudget';
}
console.log(dbURI);
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

>>>>>>> 7d7977f4119cbf31caeccbe8f2c71e8d59f0f6b7

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${dbURI}.`);

    //Scheduler - scheduling starts when required connection is established
    require('../controllers/scheduler');
});

mongoose.connection.on('error', napaka => {
    console.log('Error with MongoDB connection: ', napaka);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB not connected.');
});

const closeConenction = (message, callBack) => {
    mongoose.connection.close(() => {
        console.log(`MongoDB closed connection with '${message}'.`);
        callBack();
    });
};

// Ponovni zagon nodemon
process.once('SIGUSR2', () => {
    closeConenction('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Izhod iz aplikacije
process.on('SIGINT', () => {
    closeConenction('Application exit', () => {
        process.exit(0);
    });
});

// Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
    closeConenction('Application exit on Heroku', () => {
        process.exit(0);
    });
});
  

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

require('./envelopes');
require('./connections');
require('./user');