
const router = require("express").Router();

const newadmissioncontroller = require('../controllers/newadmission.controller');

router.get("/",newadmissioncontroller.postadmission);


module.exports = router;