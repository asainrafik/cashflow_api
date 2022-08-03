const GradeSectionModel = require("../models/grade.model");
const { Validator } = require("node-input-validator");

exports.getAllGradeSection = (req, res) => {
    console.log("get all Grade Section");
    GradeSectionModel.getAllGradeSectionModel((err, gradeSection) => {
        if (gradeSection) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: gradeSection });
        } else {
            res.status(500).send({ status: false, message: err });
        }
    });
};

exports.createNewGradeSection = (req, res) => {
    const v = new Validator(req.body, {
        grade_id: "required",
        section: "required",
        academic_year_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const gradeReqData = new GradeSectionModel(req.body);
            console.log(req.body);
            GradeSectionModel.createGradeSectionModel(gradeReqData, (err, gradeSection) => {
                if (gradeSection) {
                    res.status(200).send({
                        status: true,
                        message: gradeSection.IsExsist
                            ? `grade and section already present \u{26D4} \u{26D4}`
                            : `grade and section inserted \u{1F973} \u{1F973}`,
                        data: gradeSection,
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};

exports.deleteGradeSection = (req, res) => {
    console.log(req.body);
    GradeSectionModel.deleteGradeSectionModel(req.body, (err, gradeSection) => {
        if (gradeSection) {
            res.status(200).send({
                status: true,
                message: gradeSection.isDeletable ? "gradeSection deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: gradeSection.data },
                data: { isDeletable: gradeSection.isDeletable },
            });
        } else {
            res.status(500).send(err);
        }
    });
};

exports.settingapicollection = (req, res) => {
    console.log("get all Grade Section 1");
    GradeSectionModel.settingapicollectionModel((err, gradeSection) => {
        if (gradeSection) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: gradeSection });
        } else {
            res.status(500).send({ status: false, message: err });
        }
    });
};
