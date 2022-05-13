const StudentProfileModel = require("../models/studentprofile.model");
const { Validator } = require("node-input-validator");

exports.getStudentProfile = (req, res) => {
    const v = new Validator(req.body, {
        student_admissions_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const studentprofileReqData = new StudentProfileModel(req.body);
            StudentProfileModel.getStudentModel(studentprofileReqData, (err, studentresult) => {
                if (studentresult) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: studentresult });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
        }
    });
};

exports.updateprofile = (req,res) => {
    console.log(req.params);
    StudentProfileModel.updateprofilemodel(req.params.id,req.body, (err, studentprofile) =>{
        if(studentprofile) {
            res.status(200).send({ status: true, message:"Student Profile Updated \u{1F389} \u{1F389}",data:studentprofile.data});
        }else{
            res.status(500).send(err);
        }
    })
}
