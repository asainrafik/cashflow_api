var dbConn = require("../../config/db.config");

var NewAdmission = function(newadmission){
    this.student_name = newadmission.student_name;
    this.DOB = newadmission.DOB;
    this.gender = newadmission.gender;
    this.email = newadmission.email;
    this.admission_date = newadmission.admission_date;
    this.academic_year = newadmission.academic_year;
    this.grade_id = newadmission.grade_id;
    this.section = newadmission.section;
    this.previous_school_info = newadmission.previous_school_info;
    this.father_name = newadmission.father_name;
    this.father_occupation = newadmission.father_occupation;
    this.address = newadmission.address;
    this.phone_number = newadmission.phone_number;
    this.alt_phone_number = newadmission.alt_phone_number;
    this.student_id = newadmission.student_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}


NewAdmission.getNewAdmissionModel = (newRequestBody,result) => {
    dbConn.query("SELECT * FROM student_admissions ORDER BY student_admissions_id DESC LIMIT 1", (err, res) => {
       let datares = res[0];
       let daaaaaa = datares.stu_code;
       let stucode = datares.stu_code
       let cccccc = datares.student_admissions_id;
       console.log(stucode);
    //    console.log(datares.student_id);
    //    let daaaa = Number(datares.student_id+1);
    //    console.log(Number(datares.student_id)+1);   
    });
};

module.exports = NewAdmission;
