const express = require("express");
const router = express.Router();

const feemaseterController = require("../controllers/feemaster.controller");

//get all year
router.get("/", feemaseterController.getAllFeeMaster);
router.get("/transport", feemaseterController.getAlltransport);
router.post("/", feemaseterController.createNewGradeSection);
router.put("/:id", feemaseterController.updatefeemaster);
router.delete("/", feemaseterController.deletefeemaster);

module.exports = router;
