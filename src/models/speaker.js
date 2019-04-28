const mongoose = require('mongoose');

const Speaker = new mongoose.Schema({
    id:Number,
    first_name: String,
    last_name: String,
    bio: String,
    photo: Object
});

module.exports = mongoose.model('Speaker', Speaker);
