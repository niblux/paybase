// route test
const express = require('express')
const router = express.Router();
const attendeeController = require('../controllers/Attendee');

router.get('/register', attendeeController.registerPage);
router.post('/register', attendeeController.registerUser);

router.get('/login', attendeeController.loginPage);
router.post('/login', attendeeController.registerUser);

router.get('/logout', attendeeController.logout);

module.exports = router;
