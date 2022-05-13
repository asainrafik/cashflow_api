const express = require('express');
const router = express.Router();

const studentBalance = require('../controllers/studentBalance.controller');

router.put('/',studentBalance.updateStudentBalance);

module.exports = router;