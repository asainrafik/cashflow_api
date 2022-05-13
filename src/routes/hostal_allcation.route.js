const express = require('express');
const router = express.Router();

const hostalcontroller = require('../controllers/hostal_allcation.controllers');


//get all Discountfee
router.get('/',hostalcontroller.getallocation);
router.get('/:hostel_name_id',hostalcontroller.getfilterallocation);
router.post('/',hostalcontroller.getterms);

module.exports = router;