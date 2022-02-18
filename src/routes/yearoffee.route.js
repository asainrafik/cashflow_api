const express = require('express');
const router = express.Router();

const yearOFFee = require('../controllers/yearoffee.controller');

//get all year
router.post('/',yearOFFee.getAllYearOFFee);
router.post('/create_new_yearfee',yearOFFee.createNewYearOFFee);
router.delete('/',yearOFFee.deleteYearOFFee);

module.exports = router;