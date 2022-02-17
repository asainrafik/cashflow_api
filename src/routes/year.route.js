const express = require('express');
const router = express.Router();

const yearController = require('../controllers/year.controller');

//get all year
router.get('/',yearController.getAllYear);
router.post('/',yearController.createNewYear);
router.delete('/',yearController.deleteAcademicYear);

module.exports = router;