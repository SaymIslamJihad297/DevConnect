const express = require('express');
const passport = require('passport');
const { signInWIthAccount, login, signUp, logOut } = require('../controllers/userController');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Hello");
})
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}))
router.get('/auth/google/callback', passport.authenticate('google'), signInWIthAccount);

router.get('/auth/github', passport.authenticate('github', {
    scope: ['user:email']
}))

router.get('/auth/github/callback', passport.authenticate('github'), signInWIthAccount);

router.post('/login', passport.authenticate('local'), login);

router.post('/signup', signUp);

router.get('/logout', logOut);

module.exports = router;