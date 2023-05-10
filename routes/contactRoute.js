//creating a router to work over here
const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');
const { check } = require('express-validator');

router.post('/', contactController.addRequest);


module.exports = router;