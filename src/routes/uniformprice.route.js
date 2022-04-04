const express = require('express');
const router = express.Router();

const uniformpriceController = require('../controllers/uniformprice.controller');

router.get('/',uniformpriceController.getuniformprice);
 router.post('/',uniformpriceController.createprice);
 router.delete('/',uniformpriceController.deleteprice);


module.exports = router;