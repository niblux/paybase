const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const process = require('process');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//use sessions for tracking logins
app.use(session({
    secret: 'user_sid',
    resave: false,
    saveUninitialized: false, 
    cookie: {
        expires:60000
    }
}));

// Store session ID.
app.use((req, res, next) => {
    app.locals.sessionID = req.session.userId
    next();
});

// import seperate routes 
app.use(require('./routes/attendee'), function(req, res, next){
    next();
});
app.use(require('./routes/talk'), function (req, res, next) {
    next();
});


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

// view engine setup
app.set('views', path.join(__dirname, './views')); // this is the folder where we keep our pug files
app.set('view engine', 'ejs'); // we use the engine pug, mustache or EJS work great too


// require models
require('./models/attendee');
require('./models/speaker');
require('./models/talk');

// intial data fetch 
const Talks = mongoose.model('Talk');
const Speakers = mongoose.model('Speaker');

const sessionChecker = (req, res, next) => {
    if (!app.locals.sessionID) {
        res.redirect('/login');
    } else {
        next();
    }
};

app.get('/', sessionChecker, (req, res, next) => {
    res.render('login')
})

// render home page 
app.get('/home', sessionChecker, async (req, res, next) => {

    if(req.query) {
        // rsvp to talk
        Talks.findOne({id:req.query.id},(err, result) => {
            if(err) {
                console.log(err)
            } else {
                if(!result) {
                    // res.status(404).send;
                } else {
                    if(req.query.rsvp) {
                        result.rsvp = req.query.rsvp
                    }

                    result.save(async (err, updatedResult) => {
                        if(err) {
                            console.log(err);
                            // res.status(500).send();
                        } else {
                            console.log("updated result", updatedResult);
                            return updatedResult;
                        }
                    })
                }
            }
        })

        // decrement available spaces

        Talks.findOne({ id: req.query.id }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                if (!result) {
                    // res.status(404).send;
                } else {
                    if (req.query.rsvp) {
                        result.availableSpaces = result.availableSpaces - 1;
                    }

                    result.save(async (err, updatedResult) => {
                        if (err) {
                            console.log(err);
                            // res.status(500).send();
                        } else {
                            console.log("updated result", updatedResult);
                            return updatedResult;
                        }
                    })
                }
            }
        })
    }

    const talks = await Talks.find({}, (err) => {
        // console.error('error talks', err);
    });

    const speakers = await Speakers.find({}, (err) => {
        // console.error('error speakers', err);
    });
 
    app.locals.talks = talks;
    app.locals.speakers = speakers;

    let flag = true;

    res.render('homepage', {
        link: `/home?rsvp=${flag}&id=`
    });
});

