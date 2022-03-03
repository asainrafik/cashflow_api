var dbConn = require("../../config/db.config");

var studentBalance = function (balance) {
    (this.student_payment_info_id = balance.student_payment_info_id),
        (this.student_admissions_id = balance.student_admissions_id),
        (this.payment_date = balance.payment_date),
        (this.actual_fees = balance.actual_fees),
        (this.amount_paid = balance.amount_paid),
        (this.payment_mode = balance.payment_mode),
        (this.comments = balance.comments),
        (this.created_at = balance.created_at),
        (this.updated_at = balance.updated_at),
        (this.year_of_fees_id = balance.year_of_fees_id),
        (this.student_id = balance.student_id),
        (this.refund = balance.refund),
        (this.balance = balance.balance),
        (this.fee_master_id = balance.fee_master_id),
        (this.grade_id = balance.grade_id);
};

//update student_payment_infos SET balance=950,refund=450,amount_paid=0
//WHERE student_id="MVM100060" and grade_id=0 and student_payment_info_id=387;

//update student fees by year based on academic grade
studentBalance.updateStudentWithRefundFeeModel = (studentDataArr, result) => {
    let tempArr = [];
    if (studentDataArr && studentDataArr.length) {
        studentDataArr.forEach((studentData) => {
            dbConn.query(
                `update student_payment_infos SET balance=${studentData.balance},refund=${studentData.refund},comments="${studentData.comments}",payment_mode="${studentData.payment_mode}",payment_date="${studentData.payment_date}",amount_paid=${studentData.amount_paid} WHERE student_id="${studentData.student_id}" and grade_id=${studentData.grade_id} and student_payment_info_id=${studentData.student_payment_info_id};
            `,
                (err, res) => {
                    if (res) {
                        // dbConn.query(
                        //     `select * from student_payment_infos where student_payment_info_id=${studentData.student_payment_info_id};`,
                        //     (err, res) => {
                        //         let getData = res[0];
                        //         let createdObj = {
                        //             student_id :getData.student_id,
                        //             grade_id :getData.grade_id,
                        //             section_id :getData.section_id,
                        //             date_of_transcation :new Date(),
                        //             actual_fees :getData.actual_fees,
                        //             balance :getData.balance,
                        //             amount_paid :getData.amount_paid,
                        //             discount :getData.discount,
                        //             refund :getData.refund,
                        //             fee_master_id :getData.fee_master_id,
                        //             year_id :getData.year_id,
                        //             year_of_fees_id :getData.year_of_fees_id,
                        //             discount_id :getData.discount_id,
                        //             student_admission_id :getData.student_admission_id,
                        //             record_created_at :new Date(),
                        //             comments :getData.comments,
                        //             student_payment_info_id :getData.student_payment_info_id
                        //         };
                        //     }
                        // );
                        console.log("Refund added successfully");
                        tempArr.push(res);
                    } else {
                        console.log("error fetching data year");
                        result(null, err);
                    }
                }
            );
        });
    }
    result(null, tempArr);
};

studentBalance.updateStudentWithBalanceFeeModel = (studentDataArr, result) => {
    if (studentDataArr && studentDataArr.length) {
        studentDataArr.forEach((studentData) => {
            console.log(studentData, "to balance mopdel");
            dbConn.query(
                `update student_payment_infos SET balance=${studentData.balance},comments="${studentData.comments}",payment_mode="${studentData.payment_mode}",payment_date="${studentData.payment_date}",amount_paid=${studentData.amount_paid} WHERE student_id="${studentData.student_id}" and grade_id=${studentData.grade_id} and student_payment_info_id=${studentData.student_payment_info_id};
            `,
                (err, res) => {
                    if (res) {
                        console.log("payment updated successfully");
                    } else {
                        console.log(err);
                        result(null, err);
                    }
                }
            );
        });
    }
    result(null, "success");
};

module.exports = studentBalance;
