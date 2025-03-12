const User = require("../models/User");

module.exports.signInWIthAccount = (req, res) => {
    res.send("Done");
}

module.exports.isLoggedIn = (req, res) => {
    res.send(req.isAuthenticated());
};


module.exports.login = (req, res) => {
    res.send("Done");
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { name, username, email, password } = req.body;
        const newUser = new User({ name, username, email });

        console.log(newUser, password);

        let registerUser = await User.register(newUser, password);

        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            res.send("success");
        });
    } catch (error) {
        next(error);
    }
};


module.exports.logOut = (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        } else {
            res.send("Done");
        }
    })
}