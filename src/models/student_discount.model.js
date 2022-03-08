var dbConn = require("../../config/db.config");
const moment = require('moment');

var Discountoffee = function (discountfee) {
    this.student_admissions_id = discountfee.student_admissions_id;
    this.year_id = discountfee.year_id;
    this.discount_amount = discountfee.discount_amount;
    this.dis_feetype_id = discountfee.dis_feetype_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Discountoffee.getAllStudentModel = (discountfeeReqData, result) => {
    dbConn.query(
        `SELECT * FROM student_payment_infos where student_admissions_id="${discountfeeReqData.student_admissions_id}" and year_id ="${discountfeeReqData.year_id}";`,
        (err, res) => {
            console.log(res);
            if (res) {
                result(null, res);
            } else {
                console.log(err);
            }
        }
    );
};

Discountoffee.updatediscountmodel = (id, discountreqdata, result) => {
    dbConn.query(`SELECT * FROM student_payment_infos where student_payment_info_id = "${id}";`, (err, res) => {
        if (res) {
            let response = res[0];
            let balance = response.balance;
            let discount = response.discount_amount;
            let calculationbalanceb = Number(discount) - Number(discountreqdata.discount_amount);
            console.log(calculationbalanceb);
            let balancecalculation = Number(balance) + Number(calculationbalanceb);
            dbConn.query(
                `UPDATE student_payment_infos set discount_amount = "${discountreqdata.discount_amount}",dis_feetype_id ="${discountreqdata.dis_feetype_id}",balance = "${balancecalculation}" WHERE student_payment_info_id=${id};`,
                (err, res) => {
                    if (res) {
                         dbConn.query(`SELECT * FROM student_payment_infos where student_payment_info_id = "${id}";`,(err, res) =>{
                            if(res){
                                let response =res[0];
                                // console.log(response);
                                let dateoftrans = new Date();
                                let now = moment(dateoftrans).format('DD-MM-YYYY(hh:mm)');
                                let comments = "Discount Changes";
                               // console.log(now);
                                let transactionhistory = {
                                    student_id:response.student_id,
                                    grade_id:response.grade_id,
                                    section_id:response.section_id,
                                    date_of_transcation: now,
                                    actual_fees:response.actual_fees,
                                    balance:response.balance,
                                    amount_paid:response.amount_paid,
                                    discount:discountreqdata.discount_amount,
                                    refund:response.refund,
                                    fee_master_id:response.fee_master_id,
                                    year_id:response.year_id,
                                    year_of_fees_id:response.year_of_fees_id,
                                    discount_id:discountreqdata.dis_feetype_id,
                                    student_admission_id:response.student_admissions_id,
                                    record_created_at:new Date(),
                                    comments:comments,
                                    student_payment_info_id:response.student_payment_info_id
                                };
                                console.log(transactionhistory);
                                dbConn.query("INSERT into student_payment_record SET ?",transactionhistory,(err, res) =>{
                                    if(res){
                                        result(null, { message: "Updated Succesfully", data: "Updated Succesfully" });
                                    }
                                    else{
                                        result(null, err);
                                    }
                                })
                               
                            }
                        });
                        
                    } 
                }
            );
        }
    });
};

module.exports = Discountoffee;
