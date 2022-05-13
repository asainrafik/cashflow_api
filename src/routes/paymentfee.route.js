const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/paymentfee.contoller')

//get all year
router.post('/',PaymentController.getpaymentlist);
// router.post('/',PaymentController.createplaces);

module.exports = router;