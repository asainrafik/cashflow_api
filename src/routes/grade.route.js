const express = require("express");
const router = express.Router();

const gradeController = require("../controllers/grade.controller");

router.get("/", gradeController.getAllGradeSection);
router.post("/", gradeController.createNewGradeSection);
router.delete("/", gradeController.deleteGradeSection);
router.get("/settingapicollection", gradeController.settingapicollection);

module.exports = router;
