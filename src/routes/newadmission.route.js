
const router = require("express").Router();

const newadmissioncontroller = require('../controllers/newadmission.controller');

router.post("/",newadmissioncontroller.postadmission);



module.exports = router;