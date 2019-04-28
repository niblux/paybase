const mongoose = require('mongoose');

const Attendee = new mongoose.Schema({
    name:String, 
    email:String,
    rsvp:Boolean,
    isRegistered:Boolean
});

module.exports = mongoose.model('Attendee', Attendee);

