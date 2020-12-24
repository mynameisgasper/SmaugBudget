const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},(email, password, pkFinished) => {
        User.findOne({ email: email }, (error, user) => {
            if (error) return pkFinished(error);
            if (!user) {
              return pkFinished(null, false, {"sporočilo": "Napačno uporabniško ime"});
            }
            if (!user.preveriGeslo(password)) {
              return pkFinished(null, false, {"sporočilo": "Napačno geslo"});
            }
            return pkFinished(null, user);
          }
        );
      }
    )
);