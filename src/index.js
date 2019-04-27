const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const process = require('process');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, keepAlive: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
mongoose.connection.once('open', () => {
    console.log('Mongo Connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, './views')); // this is the folder where we keep our pug files
app.set('view engine', 'ejs'); // we use the engine pug, mustache or EJS work great too


// require models

// route test
app.get('/', (req, res, next) => {
    res.render('homepage', {myData:{
        name:'Nabil', 
        desc:'is a sick dev',
        age:32
    }});
})