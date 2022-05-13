const express = require('express');
const router = express.Router();


const hostalnamecontroller = require('../controllers/hostalname.controller');

//get all Discountfee
 router.get('/',hostalnamecontroller.gethostal);
router.post('/',hostalnamecontroller.createhostal);
router.delete('/',hostalnamecontroller.deletehostal);

module.exports = router;