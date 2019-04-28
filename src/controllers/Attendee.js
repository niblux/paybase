const mongoose = require('mongoose');
require('../models/attendee');
const Attendee = mongoose.model('Attendee');

exports.registerUser = async (req, res, next) => {
    // console.log('register route req', req)
    // console.log('register route res', req.params)
    const addUser = new Attendee(req.body);
    await addUser.save(function(err) {
        if(err) {
            console.log('Error saving user');
            return err;
        }
        console.log('saved');
    })
    // res.json(req.params);
    console.log(req.body);
    res.send(req.body)
}

exports.redirect = async(req, res, next) => {
    res.render('homepage');
}
