const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');
const { check } = require('express-validator');

router.post('/', accountController.updateData);

module.exports = router;