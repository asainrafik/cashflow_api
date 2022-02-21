const NewadmissionModel = require('../models/newadmission.model');
const { Validator } = require("node-input-validator");


exports.postadmission = (req,res)=>{
    const v = new Validator(req.body, {
        student_name: "required",
        DOB:"required",
        gender:"required",
        email:"required",
        admission_date:"required",
        academic_year:"required",
        grade_id:"required",
        section:"required",
        previous_school_info:"required",
        father_name:"required",
        father_occupation:"required",
        address:"required",
        phone_number:"required",
        alt_phone_number:"required",
        student_id:"required",
        stu_code:"required",
        student_id:"required",
        status:"required",

    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else{
            const newRequestBody = new NewadmissionModel(req.body);
            NewadmissionModel.NewadmissionModel(newRequestBody, (err, newadmission) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({ status: true, message: "NewAdmission inserted \u{1F973} \u{1F973}", data: newadmission });
                }
            });
        }
    });
    
}

