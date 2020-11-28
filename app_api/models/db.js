const config = require('../../app_server/config/server.json');
const mongoose = require('mongoose');

const dbURI = config.database.url;

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
  
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:<password>@smaugbudget.tv1kk.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/

mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

require('./envelopes');
require('./connections');
require('./user');