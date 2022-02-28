var dbConn = require("../../config/db.config");

var Studentprofile = function(student_profile) {
    this.student_admissions_id = student_profile.student_admissions_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

Studentprofile.getStudentModel = (studentprofileReqData,result) =>{
    let admission_id= studentprofileReqData.student_admissions_id;
    dbConn.query(`SELECT * FROM student_admissions LEFT JOIN grade_master ON student_admissions.grade_id = grade_master.grade_master_id LEFT JOIN grade_section ON student_admissions.grade_section_id = grade_section.grade_section_id where student_admissions.student_id = "${admission_id}";`,(err,res)=>{
       if(res){
            result(null,res);
       }else{
            result(null,err);
       }
    });
};
Studentprofile.updateprofilemodel = (id,studentprofileReqData,result) => {
    dbConn.query(`UPDATE student_admissions set student_name = "${studentprofileReqData.student_name}", email="${studentprofileReqData.email}",father_name="${studentprofileReqData.father_name}",address="${studentprofileReqData.address}",phone_number="${studentprofileReqData.phone_number}",alt_phone_number="${studentprofileReqData.alt_phone_number}",status="${studentprofileReqData.status}",admission_no="${studentprofileReqData.admission_no}",grade_id="${studentprofileReqData.grade_id}" WHERE student_admissions_id='${id}';`,(err, res) => {
      if(res){
          result(null, res);
      }else{
          result(null,err);
      }
    });
};

module.exports = Studentprofile;