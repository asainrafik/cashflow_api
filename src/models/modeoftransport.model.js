var dbConn = require("../../config/db.config");

var modeoftranportModel = function (modeoftransport) {
    (this.transport_fee_id = modeoftransport.transport_fee_id), (this.year_id = modeoftransport.year_id), (this.place_id = modeoftransport.place_id);
};
modeoftranportModel.getFeemasterModel = (result) => {
    dbConn.query(`SELECT fee_master_id,fee_type_name,order_id FROM fee_masters WHERE transport_fee="true";`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

modeoftranportModel.getHostalModel = (result) => {
    dbConn.query(`select fee_master_id,fee_type_name,order_id from fee_masters WHERE hostal_fee="true";`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

modeoftranportModel.insertransportModel = (transportDataArr, result) => {
                dbConn.query(
                    `update student_allocations set mode_of_transport="Transport",mode_of_transport_allocation=${transportDataArr.transport},mode_of_transport_touched=true where student_admissions_id=${transportDataArr.student_admissions_id} and year_id=${transportDataArr.year_id};`,
                    (err, res) => {
                        if (res) {
                            dbConn.query(
                                `select * from student_payment_infos where student_admissions_id=${transportDataArr.student_admissions_id} and fee_master_id=${transportDataArr.fee_master_id} and year_id=${transportDataArr.year_id};`,
                                (err, res) => {
                                    if (res.length > 0) {
                                        result(null, { IsExsist: true, duplication: res });
                                    } else {
                            dbConn.query(
                                `SELECT * FROM terms_year_of_fees  
                   LEFT JOIN year_of_fees ON 
                   terms_year_of_fees.year_of_fee_id = year_of_fees.year_of_fees_id 
                   LEFT JOIN fee_masters 
                   ON fee_masters.fee_master_id = year_of_fees.fee_master_id WHERE fee_masters.transport_fee="true" and year_of_fees.year_id=${transportDataArr.year_id} and year_of_fees.fee_master_id=${transportDataArr.fee_master_id};`,
                                (err, res) => {
                                    if (res) {
                                        let Inserted = "Insert successfully";
                                        res.map((ele) => {
                                            let paymentinfo = {
                                                student_admissions_id: transportDataArr.student_admissions_id,
                                                payment_date: 0,
                                                actual_fees: ele.fee_amount,
                                                amount_paid: 0,
                                                payment_mode: 0,
                                                comments: 0,
                                                created_at: new Date(),
                                                updated_at: new Date(),
                                                year_of_fees_id: ele.year_of_fees_id,
                                                student_id: transportDataArr.student_id,
                                                fee_master_id: ele.fee_master_id,
                                                refund: 0,
                                                cum_amt: 0,
                                                balance: ele.term_amount,
                                                grade_id: ele.grade_id,
                                                year_id: ele.year_id,
                                                discount_amount: 0,
                                                dis_feetype_id: 0,
                                                section_id: transportDataArr.section_id,
                                                term_name: ele.term_name,
                                                term_amount: ele.term_amount,
                                                optional_fees: ele.optional_fees,
                                                terms_months: ele.terms_months,
                                                terms_id: ele.terms_id,
                                                checked_status: true,
                                            };
                                            console.log(paymentinfo, "fees");
                                            dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
                                                if (res) {
                                                    console.log("Insert successfully");
                                                } else {
                                                    console.log(err);
                                                }
                                            });
                                        });
                                        result(null, { IsExsist: false, data: Inserted });
                                    } else {
                                        result(null, err);
                                    }
                                }
                            );
                        }
                    }
                );
                        } else {
                            result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                        }
                    }
                );
        
    // dbConn.query(`select * from fee_masters where transport_fee = true;`, (err, res) => {
    //     if (res) {
    //         let transport_fees = res[0];
    //         // console.log(transport_fees,"feemasterid")
    //         dbConn.query(
    //             `select * from transport_fees where places_id = ${transportDataArr.places_id} and year_id =${transportDataArr.year_id};`,
    //             (err, res) => {
    //                 if (res) {
    //                     res.map((ele) => {
    //                         let paymentinfo = {
    //                             student_admissions_id: transportDataArr.student_admissions_id,
    //                             payment_date: 0,
    //                             actual_fees: ele.term_amount,
    //                             amount_paid: 0,
    //                             payment_mode: null,
    //                             comments: null,
    //                             created_at: new Date(),
    //                             updated_at: new Date(),
    //                             year_of_fees_id: ele.transport_fee_id,
    //                             student_id: transportDataArr.student_id,
    //                             fee_master_id: transport_fees.fee_master_id,
    //                             refund: 0,
    //                             cum_amt: 0,
    //                             balance: ele.term_amount,
    //                             grade_id: transportDataArr.grade_id,
    //                             year_id: transportDataArr.year_id,
    //                             discount_amount: 0,
    //                             dis_feetype_id: 0,
    //                             section_id: transportDataArr.section_id,
    //                             term_name: ele.term_name,
    //                             term_amount: ele.term_amount,
    //                             optional_fees: 0,
    //                             terms_months: null,
    //                         };
    //                         console.log(paymentinfo, "fees");
    //                         dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
    //                             if (res) {
    //                                 console.log("Insert successfully");
    //                             } else {
    //                                 console.log(err);
    //                             }
    //                         });
    //                     });
    //                 }
    //             }
    //         );
    //     }
    // });
};

modeoftranportModel.inserthostelModel = (transportDataArr, result) => {
    dbConn.query(
        `update student_allocations set mode_of_transport="Hostal",mode_of_transport_allocation=${transportDataArr.Hostal},mode_of_transport_touched=true where student_admissions_id=${transportDataArr.student_admissions_id} and year_id=${transportDataArr.year_id};`,
        (err, res) => {
            if (res) {
                dbConn.query(
                    `select * from student_payment_infos where student_admissions_id=${transportDataArr.student_admissions_id} and fee_master_id=${transportDataArr.fee_master_id} and year_id=${transportDataArr.year_id};`,
                    (err, res) => {
                        if (res.length > 0) {
                            result(null, { IsExsist: true, duplication: res });
                        } else {
                            dbConn.query(
                                `SELECT * FROM terms_year_of_fees  
                    LEFT JOIN year_of_fees  ON 
                    terms_year_of_fees.year_of_fee_id = year_of_fees.year_of_fees_id 
                    LEFT JOIN fee_masters 
                    ON fee_masters.fee_master_id = year_of_fees.fee_master_id WHERE fee_masters.hostal_fee="true" and year_of_fees.year_id=${transportDataArr.year_id} and year_of_fees.grade_id=${transportDataArr.grade_id};`,
                                (err, res) => {
                                    if (res) {
                                        let Inserted = "Insert successfully";
                                        res.map((ele) => {
                                            let paymentinfo = {
                                                student_admissions_id: transportDataArr.student_admissions_id,
                                                payment_date: 0,
                                                actual_fees: ele.fee_amount,
                                                amount_paid: 0,
                                                payment_mode: 0,
                                                comments: 0,
                                                created_at: new Date(),
                                                updated_at: new Date(),
                                                year_of_fees_id: ele.year_of_fees_id,
                                                student_id: transportDataArr.student_id,
                                                fee_master_id: ele.fee_master_id,
                                                refund: 0,
                                                cum_amt: 0,
                                                balance: ele.term_amount,
                                                grade_id: ele.grade_id,
                                                year_id: ele.year_id,
                                                discount_amount: 0,
                                                dis_feetype_id: 0,
                                                section_id: transportDataArr.section_id,
                                                term_name: ele.term_name,
                                                term_amount: ele.term_amount,
                                                optional_fees: ele.optional_fees,
                                                terms_months: ele.terms_months,
                                                terms_id: ele.terms_id,
                                                checked_status: true,
                                            };
                                            console.log(paymentinfo, "fees");
                                            dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
                                                if (res) {
                                                    console.log("Insert successfully");
                                                } else {
                                                    console.log(err);
                                                }
                                            });
                                        });
                                        result(null, { IsExsist: false, data: Inserted });
                                    }
                                }
                            );
                        }
                    }
                );
            } else {
                result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
            }
        }
    );

    // console.log(transportDataArr);
    // dbConn.query(`select * from fee_masters where hostal_fee = true;`, (err, res) => {
    //     if (res) {
    //         let Hostal_fees = res[0];
    //         // console.log(Hostal_fees, "Hostel_fees");
    //         dbConn.query(
    //             `select * from year_of_fees
    //         left join terms_year_of_fees on
    //             year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${transportDataArr.grade_id} and year_of_fees.year_id=${transportDataArr.year_id} and fee_master_id = ${Hostal_fees.fee_master_id} and term_name = "${transportDataArr.term_name}"`,
    //             (err, res) => {
    //                 let temp = [];
    //                 res.map((ele) => {
    //                     console.log(ele,"terms");
    //                     let paymentinfo = {
    //                         student_admissions_id: transportDataArr.student_admissions_id,
    //                         payment_date: 0,
    //                         actual_fees: ele.term_amount,
    //                         amount_paid: 0,
    //                         payment_mode: null,
    //                         comments: null,
    //                         created_at: new Date(),
    //                         updated_at: new Date(),
    //                         year_of_fees_id: ele.year_of_fees_id,
    //                         student_id: transportDataArr.student_id,
    //                         fee_master_id: Hostal_fees.fee_master_id,
    //                         refund: 0,
    //                         cum_amt: 0,
    //                         balance: ele.term_amount,
    //                         grade_id: transportDataArr.grade_id,
    //                         year_id: transportDataArr.year_id,
    //                         discount_amount: 0,
    //                         dis_feetype_id: 0,
    //                         section_id: transportDataArr.section_id,
    //                         term_name: ele.term_name,
    //                         term_amount: ele.term_amount,
    //                         optional_fees: 0,
    //                         terms_months: ele.terms_months,
    //                     };
    //                     console.log(paymentinfo, "fees");
    //                     dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
    //                         if (res) {
    //                             console.log("Insert successfully");
    //                             temp.push(res);
    //                         } else {
    //                             console.log(err);
    //                         }
    //                     });
    //                 })
    //                 result(null,"Sucess");
    //             }
    //         );
    //     }
    // });
};

modeoftranportModel.insertSelfmodel = (transportDataArr, result) => {
    dbConn.query(
        `update student_allocations set mode_of_transport="Self",mode_of_transport_allocation=${transportDataArr.Self},mode_of_transport_touched=${transportDataArr.mode_of_transport_touched} where student_admissions_id=${transportDataArr.student_admissions_id} and year_id=${transportDataArr.year_id};`,
        (err, res) => {
            if (res) {
                result(null, { IsExsist: false, data: res });
            } else {
                result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
            }
        }
    );
};
module.exports = modeoftranportModel;
