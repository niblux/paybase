const mongoose = require('mongoose');
require('../models/attendee');
const Attendee = mongoose.model('Attendee');

// GET route after registering
exports.registerPage = (req, res, next) => {
    res.render('register')
}

exports.registerUser = (req, res, next) => {

    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        Attendee.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/login');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        console.log('', req.body.logemail, req.body.logpassword)
        Attendee.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/home');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
}

// GET LOGIN PAGE
exports.loginPage = (req,res, next) => {
    res.render('login')
}

/// TODO: REMOVE AFTER TESTING
exports.login = (req, res, next) => {
    Attendee.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.render('homepage', {
                        data: {
                            loggedIn: '<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + 
                            user.email + '<br><a type="button" href="/logout">Logout</a>' 
                        }
                    });
                }
            }
        });
}


// GET for logout
exports.logout = async (req, res, next) => { {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });
    }
}}

exports.redirect = async(req, res, next) => {
    res.render('homepage');
}
