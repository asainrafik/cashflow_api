const router = require("express").Router();

const school = require('../controllers/school.controller');

router.post("/",school.schoolcreate);
router.get("/",school.getschool);

module.exports = router;