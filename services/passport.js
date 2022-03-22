const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");

const User = mongoose.model("User");

module.exports = (passport) => {
  // Define a function for serializing users
  passport.serializeUser((user, done) => {
    // use mongodb id to jam and store into the browser cookie
    done(null, user.id);
  });

  // Define a function for deserializing users
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      // store the user data inside the req object in the route handlers
      done(null, user);
    });
  });

  passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect email or password.",
          });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return done(err);
          }
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        // Find the first record from the collection
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // if we don't have a user record with this ID, make a new record
        const newUser = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        }).save();
        done(null, newUser);
      }
    )
  );
};
