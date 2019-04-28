const mongoose = require('mongoose');

const Talk = new mongoose.Schema({
    id:Number,
    speakers: Array,
    availableSpaces: Number,
    title: String,
    description:String,
    time:String, 
    duration:Number, 
    rsvp:Boolean
});

module.exports = mongoose.model('Talk', Talk);

