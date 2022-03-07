var dbConn = require("../../config/db.config");

var StudentYear = function (student_year){
    this.student_allocation_id = student_year.student_allocation_id;
    this.student_admissions_id = student_year.student_admissions_id;
    this.academic_year = student_year.academic_year;
}

StudentYear.getStudentyear = (studentreq,result) =>{
    dbConn.query(`select
    * from cashflow_api.student_allocations
    INNER JOIN cashflow_api.years ON student_allocations.year_id = years.year_id where student_admissions_id =${studentreq.student_admissions_id};`,(err, res) =>{
        if(res) {
            result(null, res);
        }else{
            result(null, err);
        }
    })
}

module.exports = StudentYear;
