const express = require('express')
const router = express.Router();
// const talkController = require('../controllers/Talk');

router.get('/home/:rsvp', (req, res, next) => {
    console.log('params', req.params);
    console.log('query', req.query);
    next();
});