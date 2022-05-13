const express = require('express');
const router = express.Router();

const feeController = require('../controllers/feeoptional.controller')


router.post('/opt',feeController.getoptional);
router.post('/',feeController.createoptional);
router.post('/search',feeController.getoptionalsearch);

module.exports = router;


