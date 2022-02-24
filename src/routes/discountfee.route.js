const express = require('express');
const router = express.Router();

const discountfeecontroller = require('../controllers/discountfee.controller');

//get all Discountfee
router.get('/',discountfeecontroller.getAllDiscount);
router.post('/',discountfeecontroller.createDiscounts);
router.delete('/',discountfeecontroller.deleteDiscount);

module.exports = router;