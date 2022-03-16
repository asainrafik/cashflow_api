const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/promotion.controller');

//get promotion
router.post('/getpromotiondetails',promotionController.getPromotion);
router.post('/makepromotion',promotionController.makePromotion);

module.exports = router;