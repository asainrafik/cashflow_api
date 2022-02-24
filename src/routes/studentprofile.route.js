const express = require('express');
const router = express.Router();

const studentcontroller = require('../controllers/studentprofile.controller');

//get all year
router.post('/',studentcontroller.getStudentProfile);

module.exports = router;