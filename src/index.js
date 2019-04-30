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
// app.use(require('./routes/speaker'));
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

    console.log(req.body)
    console.log(req.query)

    if(req.query) {
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
    }

    const talks = await Talks.find({}, (err) => {
        // console.error('error talks', err);
    });

    const speakers = await Speakers.find({}, (err) => {
        // console.error('error speakers', err);
    });

    // console.log(talks, speakers)
 
    app.locals.talks = talks;
    app.locals.speakers = speakers;

    let flag = true;

    res.render('homepage', {
        link: `/home?rsvp=${flag}&id=`
        // link: `/home?`,
        // flag:flag
    });
});

// app.get('/home/:rsvp/talk/:id', async (req, res, next) => {
//     console.log('params', req.params);
//     console.log('query', req.query);
//     if (req.query) {
//         Talks.findByIdAndUpdate(
//             // the id of the item to find
//             req.params.id,

//             // the change to be made. Mongoose will smartly combine your existing 
//             // document with this change, which allows for partial updates too
//             req.body,

//             // an option that asks mongoose to return the updated version 
//             // of the document instead of the pre-updated one.
//             { new: true },

//             // the callback function
//             (err, todo) => {
//                 // Handle any possible database errors
//                 if (err) return res.status(500).send(err);
//                 console.log(todo)
//                 // return res.send(todo);
//             }
//         )
//     }
//     next();
// });

// app.get('/articles/:year/:month'
// http://localhost/articles?year=2016&month