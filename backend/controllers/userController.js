const User = require("../models/User");

module.exports.signInWIthAccount = (req, res) => {
    res.send("Done");
}


module.exports.login = (req, res) => {
    res.send("Done");
}

module.exports.signUp = async (req, res, next) => {
    let user = req.body;
    let password = req.password;
    console.log(user, password);
    let newUser = await User.register(user, password);

    req.login(newUser, async (err) => {
        if (err) {
            return next(err);
        } else {
            await newUser.save();
            res.send("Done");
        }
    })
}

module.exports.logOut = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        } else {
            res.send("Done");
        }
    })
}