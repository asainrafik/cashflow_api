const express = require("express");
const router = express.Router();

const Transportmodule = require("../controllers/transportfee.controller");
router.post("/", Transportmodule.gettranportfee);
router.post("/create_transport", Transportmodule.createTransport);
module.exports = router;
