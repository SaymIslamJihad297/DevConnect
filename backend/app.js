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
const cors = require('cors');

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

const corsOption = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
app.use(cors(corsOption));
// passport
app.use(passport.initialize()); // initializing passport
app.use(passport.session()); // session access
passport.use(new localStrategy(User.authenticate()));
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
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
        return done(null, user);
    }
));

passport.use(new GithubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ githubId: profile.id });

            if (!user) {
                // Check if GitHub provides an email
                const email = profile.emails?.[0]?.value || `github_${profile.id}@noemail.com`;

                // Generate username from email if available
                const usererName = email.includes("@") ? email.split("@")[0] : profile.username;

                user = new User({
                    name: profile.displayName || profile.username,
                    username: usererName,
                    email: email,
                    githubId: profile.id,
                });
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user._id);
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