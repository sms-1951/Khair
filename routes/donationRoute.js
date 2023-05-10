//creating a router to work over here
const express = require('express');
const router = express.Router();
const donationController = require('../controller/donationController');
const { check } = require('express-validator');

router.post('/', donationController.addDonation);


module.exports = router;