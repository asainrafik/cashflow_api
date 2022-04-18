var dbConn = require("../../config/db.config");
const moment = require("moment");

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

//Refund
studentBalance.updateStudentWithRefundFeeModel = (studentDataArr, result) => {
    if (studentDataArr && studentDataArr.length) {
        studentDataArr.forEach((studentData) => {
            dbConn.query(`SELECT * FROM student_payment_infos where student_payment_info_id = "${studentData.student_payment_info_id}";`, (err, res) => {
                if (res) {
                    res.forEach((element) => {
                        let recal_balance = Number(element.balance) + Number(studentData.amoundTyped);
                        let recal_amount_paid = Number(element.amount_paid) - Number(studentData.amoundTyped);
                        let refund_amount = Number(element.refund) + Number(studentData.amoundTyped);
                        dbConn.query(
                            `update student_payment_infos SET balance=${recal_balance},refund=${refund_amount},comments="${studentData.comments}",payment_mode="${studentData.payment_mode}",payment_date="${studentData.payment_date}",amount_paid=${recal_amount_paid} WHERE student_id="${studentData.student_id}" and student_payment_info_id=${studentData.student_payment_info_id};`,
                            (err, res) => {
                                if (res) {
                                    dbConn.query(
                                        `select * from student_payment_infos where student_payment_info_id=${studentData.student_payment_info_id};`,
                                        (err, res) => {
                                            res.forEach((element) =>{
                                            console.log(element.student_payment_info_id);
                                            let dateoftrans = new Date();
                                            let now = moment(dateoftrans).format("DD-MM-YYYY(hh:mm)");
                                            let createdObj = {
                                                student_id: element.student_id,
                                                grade_id: Number(element.grade_id),
                                                section_id: Number(element.section_id),
                                                date_of_transcation: element.payment_date,
                                                actual_fees: Number(element.actual_fees),
                                                balance: Number(element.balance),
                                                amount_paid: Number(element.amount_paid),
                                                discount:0,
                                                refund:studentData.amoundTyped,
                                                fee_master_id: Number(element.fee_master_id),
                                                year_id: Number(element.year_id),
                                                year_of_fees_id: Number(element.year_of_fees_id),
                                                discount_id: Number(element.dis_feetype_id),
                                                student_admission_id: Number(element.student_admissions_id),
                                                record_created_at: now,
                                                comments: element.comments,
                                                student_payment_info_id: Number(element.student_payment_info_id),
                                                term_name:element.term_name,
                                                term_amount:element.term_amount,
                                                cum_amt:0,
                                            };
                                            console.log(createdObj,"student_payments")
                                            dbConn.query(`INSERT INTO student_payment_record SET student_id="${createdObj.student_id}", grade_id=${createdObj.grade_id}, section_id=${createdObj.section_id}, date_of_transcation="${createdObj.date_of_transcation}", actual_fees=${createdObj.actual_fees}, balance=${createdObj.balance}, amount_paid=${createdObj.amount_paid}, discount=${createdObj.discount}, refund=${createdObj.refund}, fee_master_id=${createdObj.fee_master_id}, year_id=${createdObj.year_id}, year_of_fees_id=${createdObj.year_of_fees_id}, discount_id=${createdObj.discount_id}, student_admission_id=${createdObj.student_admission_id}, record_created_at="${createdObj.record_created_at}", comments="${createdObj.comments}", student_payment_info_id=${createdObj.student_payment_info_id},cum_amt=${createdObj.cum_amt},term_name="${createdObj.term_name}",term_amount=${createdObj.term_amount};`,
                                                (res, err) => {
                                                    if (res) {
                                                        console.log(res);
                                                    } else {
                                                        console.log(err);
                                                    }
                                                }
                                            );
                                            })
                                            
                                        }
                                    );
                                } else {
                                    console.log(err);
                                }
                            }
                        );
                    });
                }
            });
        });
        result(null, "success");
    }
    // if (studentDataArr && studentDataArr.length) {
    //     studentDataArr.forEach((studentData) => {
    //         dbConn.query(
    //             `update student_payment_infos SET balance=${studentData.balance},refund=${studentData.refund},comments="${studentData.comments}",payment_mode="${studentData.payment_mode}",payment_date="${studentData.payment_date}",amount_paid=${studentData.amount_paid},cum_amt=${studentData.cum_amt} WHERE student_id="${studentData.student_id}" and student_payment_info_id=${studentData.student_payment_info_id};
    //         `,
    //             (err, res) => {
    //                 if (res) {
    //                     dbConn.query(
    //                         `select * from student_payment_infos where student_payment_info_id=${studentData.student_payment_info_id};`,
    //                         (err, res) => {
    //                             let getData = res[0];
    //                             let dateoftrans = new Date();
    //                             let now = moment(dateoftrans).format('DD-MM-YYYY(hh:mm)');
    //                             let createdObj = {
    //                                 student_id :getData.student_id,
    //                                 grade_id :Number(getData.grade_id),
    //                                 section_id :Number(getData.section_id),
    //                                 date_of_transcation :now,
    //                                 actual_fees :Number(getData.actual_fees),
    //                                 balance :Number(getData.balance),
    //                                 amount_paid :Number(getData.amount_paid),
    //                                 discount :Number(getData.discount_amount),
    //                                 refund :Number(getData.refund),
    //                                 fee_master_id :Number(getData.fee_master_id),
    //                                 year_id :Number(getData.year_id),
    //                                 year_of_fees_id :Number(getData.year_of_fees_id),
    //                                 discount_id :Number(getData.dis_feetype_id),
    //                                 student_admission_id :Number(getData.student_admissions_id),
    //                                 record_created_at :new Date(),
    //                                 comments :getData.comments,
    //                                 student_payment_info_id :Number(getData.student_payment_info_id),
    //                                 cum_amt:0
    //                             };
    //                             dbConn.query(`INSERT INTO student_payment_record SET student_id="${createdObj.student_id}", grade_id=${createdObj.grade_id}, section_id=${createdObj.section_id}, date_of_transcation="${createdObj.date_of_transcation}", actual_fees=${createdObj.actual_fees}, balance=${createdObj.balance}, amount_paid=${createdObj.amount_paid}, discount=${createdObj.discount}, refund=${createdObj.refund}, fee_master_id=${createdObj.fee_master_id}, year_id=${createdObj.year_id}, year_of_fees_id=${createdObj.year_of_fees_id}, discount_id=${createdObj.discount_id}, student_admission_id=${createdObj.student_admission_id}, record_created_at="${createdObj.record_created_at}", comments="${createdObj.comments}", student_payment_info_id=${createdObj.student_payment_info_id},cum_amt=${createdObj.cum_amt};`,(res,err)=>{
    //                                 if(res){
    //                                     console.log(res)
    //                                 }else{
    //                                     console.log(err)
    //                                 }
    //                             });
    //                         }
    //                     );
    //                     console.log("Refund added successfully");
    //                     tempArr.push(res);
    //                 } else {
    //                     console.log("error fetching data year");
    //                     result(null, err);
    //                 }
    //             }
    //         );
    //     });
    // }
    // result(null, tempArr);
};

//Balance
studentBalance.updateStudentWithBalanceFeeModel = (studentDataArr, result) => {
    if (studentDataArr && studentDataArr.length) {
        studentDataArr.forEach((studentData) => {
            // console.log(studentData.student_payment_info_id,"kk")
            dbConn.query(`SELECT * FROM student_payment_infos where student_payment_info_id = "${studentData.student_payment_info_id}";`, (err, res) => {
                if (res) {
                    res.forEach((element) => {
                        let cal_balance = Number(element.balance) - Number(studentData.amoundTyped);
                        let cal_amount_paid = Number(element.amount_paid) + Number(studentData.amoundTyped);
                        let cal_cum_amt = Number(element.cum_amt) + Number(studentData.amoundTyped);
                        dbConn.query(
                            `update student_payment_infos SET balance=${cal_balance},comments="${studentData.comments}",payment_mode="${studentData.payment_mode}",payment_date="${studentData.payment_date}",amount_paid=${cal_amount_paid},cum_amt=${cal_cum_amt} WHERE student_id="${studentData.student_id}" and student_payment_info_id=${studentData.student_payment_info_id};`,
                            (err, res) => {
                                if (res) {
                                    dbConn.query(
                                        `select * from student_payment_infos where student_payment_info_id=${studentData.student_payment_info_id};`,
                                        (err, res) => {
                                            res.forEach((element) =>{
                                            console.log(element.student_payment_info_id);
                                            let dateoftrans = new Date();
                                            let now = moment(dateoftrans).format("DD-MM-YYYY(hh:mm)");
                                            let createdObj = {
                                                student_id: element.student_id,
                                                grade_id: Number(element.grade_id),
                                                section_id: Number(element.section_id),
                                                date_of_transcation: element.payment_date,
                                                actual_fees: Number(element.actual_fees),
                                                balance: Number(element.balance),
                                                amount_paid: Number(element.amount_paid),
                                                discount:0,
                                                refund:0,
                                                fee_master_id: Number(element.fee_master_id),
                                                year_id: Number(element.year_id),
                                                year_of_fees_id: Number(element.year_of_fees_id),
                                                discount_id: Number(element.dis_feetype_id),
                                                student_admission_id: Number(element.student_admissions_id),
                                                record_created_at: now,
                                                comments: element.comments,
                                                student_payment_info_id: Number(element.student_payment_info_id),
                                                term_name:element.term_name,
                                                term_amount:element.term_amount,
                                                cum_amt: studentData.amoundTyped,
                                            };
                                            console.log(createdObj,"student_payments")
                                            dbConn.query(
                                                `INSERT INTO student_payment_record SET student_id="${createdObj.student_id}", grade_id=${createdObj.grade_id}, section_id=${createdObj.section_id}, date_of_transcation="${createdObj.date_of_transcation}", actual_fees=${createdObj.actual_fees}, balance=${createdObj.balance}, amount_paid=${createdObj.amount_paid}, discount=${createdObj.discount}, refund=${createdObj.refund}, fee_master_id=${createdObj.fee_master_id}, year_id=${createdObj.year_id}, year_of_fees_id=${createdObj.year_of_fees_id}, discount_id=${createdObj.discount_id}, student_admission_id=${createdObj.student_admission_id}, record_created_at="${createdObj.record_created_at}", comments="${createdObj.comments}", student_payment_info_id=${createdObj.student_payment_info_id},cum_amt=${createdObj.cum_amt},term_name="${createdObj.term_name}",term_amount=${createdObj.term_amount};`,
                                                (res, err) => {
                                                    if (res) {
                                                        console.log(res);
                                                    } else {
                                                        console.log(err);
                                                    }
                                                }
                                            );
                                            })
                                            
                                        }
                                    );
                                } else {
                                    console.log(err);
                                }
                            }
                        );
                    });
                }
            });
        });
        result(null, "success");
    }
    // if (studentDataArr && studentDataArr.length) {
    //     studentDataArr.forEach((studentData) => {
    //         let cum_amt =studentData.amoundTyped;
    //         console.log(studentData,"records");
    //         dbConn.query(
    //             `update student_payment_infos SET balance=${studentData.balance},comments="${studentData.comments}",payment_mode="${studentData.payment_mode}",payment_date="${studentData.payment_date}",amount_paid=${studentData.amount_paid},cum_amt=${studentData.cum_amt} WHERE student_id="${studentData.student_id}" and student_payment_info_id=${studentData.student_payment_info_id};`,
    //             (err, res) => {
    //                 if (res) {
    //                     console.log(res,"update")
    //                     dbConn.query(
    //                         `select * from student_payment_infos where student_payment_info_id=${studentData.student_payment_info_id};`,
    //                         (err, res) => {
    //                             console.log(res,"sss");
    //                             let getData = res[0];
    //                             let dateoftrans = new Date();
    //                             let now = moment(dateoftrans).format('DD-MM-YYYY(hh:mm)');
    //                             let createdObj = {
    //                                 student_id :getData.student_id,
    //                                 grade_id :Number(getData.grade_id),
    //                                 section_id :Number(getData.section_id),
    //                                 date_of_transcation :now,
    //                                 actual_fees :Number(getData.actual_fees),
    //                                 balance :Number(getData.balance),
    //                                 amount_paid :Number(getData.amount_paid),
    //                                 discount :Number(getData.discount_amount),
    //                                 refund :Number(getData.refund),
    //                                 fee_master_id :Number(getData.fee_master_id),
    //                                 year_id :Number(getData.year_id),
    //                                 year_of_fees_id :Number(getData.year_of_fees_id),
    //                                 discount_id :Number(getData.dis_feetype_id),
    //                                 student_admission_id :Number(getData.student_admissions_id),
    //                                 record_created_at :new Date(),
    //                                 comments :getData.comments,
    //                                 student_payment_info_id :Number(getData.student_payment_info_id),
    //                                 cum_amt:cum_amt
    //                             };
    //                             dbConn.query(`INSERT INTO student_payment_record SET student_id="${createdObj.student_id}", grade_id=${createdObj.grade_id}, section_id=${createdObj.section_id}, date_of_transcation="${createdObj.date_of_transcation}", actual_fees=${createdObj.actual_fees}, balance=${createdObj.balance}, amount_paid=${createdObj.amount_paid}, discount=${createdObj.discount}, refund=${createdObj.refund}, fee_master_id=${createdObj.fee_master_id}, year_id=${createdObj.year_id}, year_of_fees_id=${createdObj.year_of_fees_id}, discount_id=${createdObj.discount_id}, student_admission_id=${createdObj.student_admission_id}, record_created_at="${createdObj.record_created_at}", comments="${createdObj.comments}", student_payment_info_id=${createdObj.student_payment_info_id},cum_amt=${createdObj.cum_amt};`,(res,err)=>{
    //                                 if(res){
    //                                     console.log(res)
    //                                 }else{
    //                                     console.log(err)
    //                                 }
    //                             });
    //                         }
    //                     );
    //                     console.log("payment updated successfully");
    //                 } else {
    //                     console.log(err);
    //                     result(null, err);
    //                 }
    //             }
    //         );
    //     });
    // }
    // result(null, "success");
};

module.exports = studentBalance;