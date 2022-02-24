const router = require("express").Router();

const studentSearchController = require('../controllers/studentSearch.controller');

router.post("/",studentSearchController.studentSearchController);


module.exports = router;