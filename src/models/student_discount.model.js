var dbConn = require("../../config/db.config");

var Discountoffee = function(discountfee){
    this.balance = discountfee.balance;
    this.fee_master_id = discountfee.fee_master_id;
    this.fee_type_name = discountfee.fee_type_name;
    this.student_admissions_id = discountfee.student_admissions_id;
    this.dis_feetype_id = discountfee.dis_feetype_id;
    this.year_id = discountfee.year_id;
    this.created_at = new Date();
	this.updated_at = new Date();
}

Discountoffee.getAllStudentModel = (discountfeeReqData, result) => {
        dbConn.query(`SELECT * FROM cashflow_api.student_payment_infos where student_admissions_id=${discountfeeReqData.student_admissions_id} and year_id = ${discountfeeReqData.year_id};`,(err, res)=>{
               console.log(res)
        });
}

module.exports = Discountoffee;	