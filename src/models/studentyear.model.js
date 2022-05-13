var dbConn = require("../../config/db.config");

var StudentYear = function (student_year){
    this.student_allocation_id = student_year.student_allocation_id;
    this.student_admissions_id = student_year.student_admissions_id;
    this.student_id = student_year.student_id;
    this.academic_year = student_year.academic_year;
}

StudentYear.getStudentyear = (studentreq,result) =>{
    dbConn.query(`select
    * from student_allocations
    INNER JOIN years ON student_allocations.year_id=years.year_id where student_id ="${studentreq.student_id}";`,(err, res) =>{
        if(res) {
            result(null, res);
        }else{
            result(null, err);
        }
    })
}

module.exports = StudentYear;
