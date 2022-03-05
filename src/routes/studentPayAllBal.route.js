const express = require('express');
const router = express.Router();

const StudentPayAllBalRoute = require('../controllers/studentPayAllBalance.controller');

//get all studentPayAllBalance
router.post('/',StudentPayAllBalRoute.studentBalance);
router.post('/four',StudentPayAllBalRoute.studentFourBalance);

module.exports = router;