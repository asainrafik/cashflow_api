const express = require('express');
const router = express.router();

const studentcontroller = require('../controllers/discountfee.controller');

router.post('/',studentcontroller.getAllStudent);
