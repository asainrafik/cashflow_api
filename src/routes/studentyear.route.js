const router = require("express").Router();

const studentyears = require('../controllers/studentyear.controller');

router.post("/",studentyears.studentyearsget);

module.exports = router;