const express = require('express');
const passport = require('passport');
const { signInWIthAccount, login, signUp, logOut, isLoggedIn } = require('../controllers/userController');
const router = express.Router();


// Redirect user to Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle Google OAuth Callback
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173/login", // Redirect to login on failure
    }),
    (req, res) => {
        // Redirect to frontend with user session
        res.redirect("http://localhost:5173/");
    }
);
// GitHub Authentication Route
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
    "/auth/github/callback",
    passport.authenticate("github", {
        successRedirect: "http://localhost:5173/",
        failureRedirect: "http://localhost:5173/login",
    })
);

router.get('/isAuthenticated', isLoggedIn);

router.post('/login', passport.authenticate('local'), login);

router.post('/signup', signUp);

router.get('/logout', logOut);

module.exports = router;