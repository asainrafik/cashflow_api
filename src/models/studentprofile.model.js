var dbConn = require("../../config/db.config");

var Studentprofile = function (student_profile) {
    this.student_admissions_id = student_profile.student_admissions_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Studentprofile.getStudentModel = (studentprofileReqData, result) => {
    let admission_id = studentprofileReqData.student_admissions_id;
    dbConn.query(
        `SELECT * FROM student_allocations LEFT JOIN grade_master on
    student_allocations.grade_id = grade_master.grade_master_id 
    LEFT JOIN grade_section ON student_allocations.grade_section_id = grade_section.grade_section_id
    left join student_admissions on student_admissions.student_admissions_id = student_allocations.student_admissions_id where student_allocations.student_admissions_id="${admission_id}" ORDER BY student_allocation_id DESC LIMIT 1;`,
        (err, res) => {
            if (res) {
                result(null, res);
            } else {
                result(null, err);
            }
        }
    );
};
Studentprofile.updateprofilemodel = (id, studentprofileReqData, result) => {
    dbConn.query(
        `UPDATE student_admissions set student_name = "${studentprofileReqData.student_name}", email="${studentprofileReqData.email}",father_name="${studentprofileReqData.father_name}",address="${studentprofileReqData.address}",phone_number="${studentprofileReqData.phone_number}",alt_phone_number="${studentprofileReqData.alt_phone_number}",status="${studentprofileReqData.status}" WHERE student_admissions_id='${id}';`,
        (err, res) => {
            if (res) {
                dbConn.query(
                    `UPDATE student_allocations set grade_section_id ="${studentprofileReqData.grade_section_id}" WHERE student_admissions_id='${id}';`);
                result(null, res);
            } else {
                result(null, err);
            }
        }
    );
};

module.exports = Studentprofile;
