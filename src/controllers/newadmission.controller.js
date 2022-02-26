const NewadmissionModel = require("../models/newadmission.model");
const { Validator } = require("node-input-validator");

exports.postadmission = (req, res) => {
    const v = new Validator(req.body, {
        student_name: "required",
        DOB: "required",
        gender: "required",
        email: "required|email",
        grade_section_id: "required",
        previous_school_info: "required",
        father_name: "required",
        father_occupation: "required",
        address: "required",
        phone_number: "required|maxLength:10",
        from_grade: "required",
        student_type: "required",
        grade_id:"required",
        year_id:"required",
        from_grade:"required"
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const newRequestBody = new NewadmissionModel(req.body);
            NewadmissionModel.getNewAdmissionModel(newRequestBody, (err, newadmission) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({
                        status: true,
                        message:
                            newadmission.IsExsist == "error"
                                ? "Cannot Create NewAdmission\u{1F6AB}"
                                : newadmission.IsExsist
                                ? `NewAdmission already present \u{26D4} \u{26D4}`
                                : `NewAdmission inserted \u{1F973} \u{1F973}`,
                        data: newadmission,
                    });
                }
            });
        }
    });
};
