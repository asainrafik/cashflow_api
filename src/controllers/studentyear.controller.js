const Studentyear = require("../models/studentyear.model");
const { Validator } = require("node-input-validator");

exports.studentyearsget = (req, res) => {
    const v = new Validator(req.body, {
        student_admissions_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const studentreq = new Studentyear(req.body);
            console.log("get all year of fee");
            Studentyear.getStudentyear(studentreq, (err, studentyear) => {
                if (studentyear) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: studentyear });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
        }
    });
};