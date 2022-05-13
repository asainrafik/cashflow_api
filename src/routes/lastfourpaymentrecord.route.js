const express = require('express');
const router = express.Router();

const lastfourpaymentrecordController = require('../controllers/lastfourpaymentrecord.controller');


router.post('/',lastfourpaymentrecordController.getLastFourRecordRoute)
router.post('/stu_bal',lastfourpaymentrecordController.getStubal)


module.exports = router;