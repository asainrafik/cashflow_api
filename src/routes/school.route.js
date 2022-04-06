const router = require("express").Router();

const school = require('../controllers/school.controller');

router.post("/",school.schoolcreate);

module.exports = router;