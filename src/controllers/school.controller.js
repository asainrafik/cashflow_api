const schoolModel = require("../models/school.model");

const { Validator } = require("node-input-validator");

exports.getschool = (req, res) => {
    schoolModel.getschoolmodel((err, school) => {
        if (school) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: school });
        } else {
            res.status(500).send({ status: false, message: err });
        }
    });
};

exports.schoolcreate = (req, res) => {
    const v = new Validator(req.body, {
        school_name: "required",
        address: "required",
        branch: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const schoolReqData = new schoolModel(req.body);
            schoolModel.schoolcreatemodel(schoolReqData, (err, school) => {
                if (school) {
                    res.status(200).send({
                        status: true,
                        message: school.IsExsist ? `School already present \u{26D4} \u{26D4}` : `school inserted \u{1F973} \u{1F973}`,
                        data: school,
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};
