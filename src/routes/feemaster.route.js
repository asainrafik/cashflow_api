const express = require('express');
const router = express.Router();

const feemaseterController = require('../controllers/feemaster.controller');

//get all year
router.get('/',feemaseterController.getAllFeeMaster);
 router.post('/',feemaseterController.createNewGradeSection);
router.delete('/',feemaseterController.deletefeemaster);

module.exports = router;