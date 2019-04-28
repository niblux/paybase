// route test
const express = require('express')
const router = express.Router();
const attendeeController = require('../controllers/Attendee');

router.post('/register', attendeeController.registerUser);

module.exports = router;
