const config = require('../config/server.json');
const mongoose = require('mongoose');

const dbURI = config.database.url;

mongoose.connection.on('connected', () => {
    console.log(`Mongoose je povezan na ${dbURI}.`);
});

mongoose.connection.on('error', napaka => {
    console.log('Mongoose napaka pri povezavi: ', napaka);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose ni povezan.');
});

const closeConenction = (message, callBack) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose je zaprl povezavo preko '${message}'.`);
        callBack();
    });
};

// Ponovni zagon nodemon
process.once('SIGUSR2', () => {
    closeConenction('nodemon ponovni zagon', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Izhod iz aplikacije
process.on('SIGINT', () => {
    closeConenction('izhod iz aplikacije', () => {
        process.exit(0);
    });
});

// Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
    closeConenction('izhod iz aplikacije na Heroku', () => {
        process.exit(0);
    });
});
  
mongoose.connect(dbURI, { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
  