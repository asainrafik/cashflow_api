const express = require('express');
const router = express.Router();

const modeController = require('../controllers/modeoftransport.controller')

//get all year
router.get('/',modeController.getFeemaster)
router.get('/hostal',modeController.getHostalFeemaster);
router.post('/',modeController.postmodeoftranport);
// router.post('/',PaymentController.createplaces);

module.exports = router;