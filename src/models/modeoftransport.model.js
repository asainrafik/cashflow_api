var dbConn = require("../../config/db.config");

var modeoftranportModel = function (modeoftransport) {
    (this.student_admissions_id = modeoftransport.student_admissions_id), (this.year_id = modeoftransport.year_id), (this.fee_master_id = modeoftransport.fee_master_id);
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
        `SELECT * FROM terms_year_of_fees  
    LEFT JOIN year_of_fees ON 
    terms_year_of_fees.year_of_fee_id = year_of_fees.year_of_fees_id 
    LEFT JOIN fee_masters 
    ON fee_masters.fee_master_id = year_of_fees.fee_master_id WHERE fee_masters.transport_fee="true" and year_of_fees.year_id=${transportDataArr.year_id} and year_of_fees.fee_master_id=${transportDataArr.fee_master_id};`,
        (err, res) => {
            if (res.length > 0) {
                dbConn.query(
                    `update student_allocations set mode_of_transport="Transport",mode_of_transport_allocation=${transportDataArr.transport},mode_of_transport_touched=true where student_admissions_id=${transportDataArr.student_admissions_id} and year_id=${transportDataArr.year_id};`,
                    (err, res) => {
                        if (res) {
                            dbConn.query(
                                `select * from student_payment_infos where student_admissions_id=${transportDataArr.student_admissions_id} and fee_master_id=${transportDataArr.fee_master_id} and year_id=${transportDataArr.year_id};`,
                                (err, res) => {
                                    if (res.length > 0) {
                                        result(null, { IsExsist: false, duplication: "Fees Already Add the Payment Page" });
                                    } else {
                                        dbConn.query(
                                            `SELECT * FROM terms_year_of_fees  
                           LEFT JOIN year_of_fees ON 
                           terms_year_of_fees.year_of_fee_id = year_of_fees.year_of_fees_id 
                           LEFT JOIN fee_masters 
                           ON fee_masters.fee_master_id = year_of_fees.fee_master_id WHERE fee_masters.transport_fee="true" and year_of_fees.year_id=${transportDataArr.year_id} and year_of_fees.fee_master_id=${transportDataArr.fee_master_id};`,
                                            (err, res) => {
                                                if (res) {
                                                    let Inserted = [];
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
                                                                Inserted.push(res);
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
                            result(null, { IsExsist: "error", data: "please check the entered data failed Insert" });
                        }
                    }
                );
            } else {
                result(null, { IsExsist: "year", data: "please Fill the Year of Fee" });
                console.log("Please Fill the Year of Fee");
            }
        }
    );
};

modeoftranportModel.inserthostelModel = (transportDataArr, result) => {
    dbConn.query(
        `SELECT * FROM terms_year_of_fees  
    LEFT JOIN year_of_fees  ON 
    terms_year_of_fees.year_of_fee_id = year_of_fees.year_of_fees_id 
    LEFT JOIN fee_masters 
    ON fee_masters.fee_master_id = year_of_fees.fee_master_id WHERE fee_masters.hostal_fee="true" and year_of_fees.year_id=${transportDataArr.year_id} and year_of_fees.grade_id=${transportDataArr.grade_id};`,
        (err, res) => {
            if (res.length > 0) {
                dbConn.query(
                    `update student_allocations set mode_of_transport="Hostal",mode_of_transport_allocation=${transportDataArr.Hostal},mode_of_transport_touched=true where student_admissions_id=${transportDataArr.student_admissions_id} and year_id=${transportDataArr.year_id};`,
                    (err, res) => {
                        if (res) {
                            console.log(res);
                            dbConn.query(
                                `select * from student_payment_infos where student_admissions_id=${transportDataArr.student_admissions_id} and fee_master_id=${transportDataArr.fee_master_id} and year_id=${transportDataArr.year_id};`,
                                (err, res) => {
                                    if (res.length > 0) {
                                        console.log(res, "aa");
                                        result(null, { IsExsist: false, duplication: "Fees Already Add the Payment Page" });
                                    } else {
                                        dbConn.query(
                                            `SELECT * FROM terms_year_of_fees  
                            LEFT JOIN year_of_fees  ON 
                            terms_year_of_fees.year_of_fee_id = year_of_fees.year_of_fees_id 
                            LEFT JOIN fee_masters 
                            ON fee_masters.fee_master_id = year_of_fees.fee_master_id WHERE fee_masters.hostal_fee="true" and year_of_fees.year_id=${transportDataArr.year_id} and year_of_fees.grade_id=${transportDataArr.grade_id};`,
                                            (err, res) => {
                                                if (res) {
                                                    console.log(res, "value");
                                                    let Inserted = [];
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
                                                                Inserted.push(res);
                                                                console.log("Insert successfully");
                                                            } else {
                                                                console.log(err);
                                                            }
                                                        });
                                                    });
                                                    result(null, { IsExsist: false, data: Inserted });
                                                } else {
                                                    console.log("Please fill the Optional Fee");
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        } else {
                            result(null, { IsExsist: "error", data: "please check the entered data failed Insert" });
                        }
                    }
                );
            } else {
                result(null, { IsExsist: "year", data: "please Fill the Year of Fee" });
                console.log("Please Fill the Year of Fee");
            }
        }
    );
};

modeoftranportModel.insertSelfmodel = (transportDataArr, result) => {
    dbConn.query(
        `update student_allocations set mode_of_transport="Self",mode_of_transport_allocation=${transportDataArr.Self},mode_of_transport_touched=${transportDataArr.mode_of_transport_touched} where student_admissions_id=${transportDataArr.student_admissions_id} and year_id=${transportDataArr.year_id};`,
        (err, res) => {
            if (res) {
                result(null, { IsExsist: false, data: res });
            } else {
                result(null, { IsExsist: "error", data: "please check the entered data failed Insert" });
            }
        }
    );
};
module.exports = modeoftranportModel;
