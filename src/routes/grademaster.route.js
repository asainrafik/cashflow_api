const express = require('express');
const router = express.Router();

const gradeController = require('../controllers/gradeMaster.controller');

//get all year
router.get('/',gradeController.gerAllGradeMaster);

module.exports = router;