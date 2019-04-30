const mongoose = require('mongoose');
require('../models/talk');
// const Talk = mongoose.model('Talk');

exports.setRSVP = (req, res, next) => {
    console.log('true', req.params);
    console.log('true', req.query);
    // Talk.findByIdAndUpdate(req.params.rsvp, { $set: req.body }, function (err, result) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("RESULT: " + result);
    //     res.send('Done')
    // });
}