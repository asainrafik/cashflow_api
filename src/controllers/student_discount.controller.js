const Discountoffee = require("../models/student_discount.model");
const { Validator } = require("node-input-validator");

exports.getAllStudent = (req,res) =>{
    const v = new Validator(req.body, {
        student_admissions_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const discountfeeReqData = new Discountoffee(req.body);
            Discountoffee.getAllStudentModel(discountfeeReqData, (err, studentdis) => {
                if (studentdis) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: studentdis});
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
        }
    });
};
