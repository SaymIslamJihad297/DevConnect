if (process.env.NODE_ENV != "proccess") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path')
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/User');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL;
main().then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
})

// routes
const UserRoutes = require('./routes/UserRoutes.js');

const sessionOptions = { secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false }
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(express.json({ limit: '50kb' }));

// passport
app.use(passport.initialize()); // initializing passport
app.use(passport.session()); // session access
passport.use(new localStrategy(User.authenticate()));
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://greenwrite-pen.onrender.com/auth/google/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ googleId: profile.id })


        if (!user) {
            let usererName = () => {
                let i = 0;
                let UserName = "";
                while (true) {
                    if (profile.emails[0].value[i] != "@") {
                        UserName += profile.emails[0].value[i];
                        i++;
                    } else {
                        return UserName;
                    }
                }
            }
            user = new User({
                name: profile.displayName,
                username: usererName(),
                email: profile.emails[0].value,
                googleId: profile.id,
            })
            await user.save();
        }
        return (done, null);
    }
));

passport.use(new GithubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        let user = await User.findOne({ githubId: profile.id })

        if (!user) {
            let usererName = () => {
                let i = 0;
                let UserName = "";
                while (true) {
                    if (profile.emails[0].value[i] != "@") {
                        UserName += profile.emails[0].value[i];
                        i++;
                    } else {
                        return UserName;
                    }
                }
            }
            user = new User({
                name: profile.displayName,
                username: usererName(),
                email: profile.emails[0].value,
                googleId: profile.id,
            })
            await user.save();
        }
        return (done, null);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    try {
        let user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
})



app.use('/', UserRoutes);

const PORT = process.env.PORT;


async function main() {
    mongoose.connect(dbUrl);
}

app.listen(PORT, () => {
    console.log(`App started Listening on port ${PORT}`);
})