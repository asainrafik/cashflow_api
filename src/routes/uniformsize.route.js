const express = require('express');
const router = express.Router();

const Uniformcontroller = require('../controllers/uniformsize.controller');

//get all year
router.get('/',Uniformcontroller.getuniform);
router.post('/',Uniformcontroller.createuniform);
router.delete('/',Uniformcontroller.deleteuniform);

module.exports = router;