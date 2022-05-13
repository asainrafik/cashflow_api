const express = require('express');
const router = express.Router();

const transportcontroller = require('../controllers/tranportall.controller');

//get all Discountfee

router.get('/',transportcontroller.gettransport);
router.get('/:places_id',transportcontroller.getfiltertransport);
router.post('/',transportcontroller.getterms);


module.exports = router;