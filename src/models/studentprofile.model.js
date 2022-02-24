var dbConn = require("../../config/db.config");

var Studentprofile = function(student_profile) {
    this.student_admissions_id = student_profile.student_admissions_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

Studentprofile.getStudentModel = (studentprofileReqData,result) =>{
    let admission_id= studentprofileReqData.student_admissions_id;
    dbConn.query(`SELECT * FROM cashflow.student_admissions where student_admissions_id = "${admission_id}";`,(err,res)=>{
       if(res){
            result(null,res);
       }else{
            result(null,err);
       }
    });
};



module.exports = Studentprofile;