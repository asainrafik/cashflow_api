var dbConn = require("../../config/db.config");

var OptinalModel = function (optional) {
    this.student_admissions_id = optional.student_admissions_id;
    this.student_id = optional.student_id;
    this.fee_master_id = optional.fee_master_id;
};

OptinalModel.getoptionalModel = (req, result) => {
    dbConn.query(
        `select * from year_of_fees left join fee_masters on year_of_fees.fee_master_id = fee_masters.fee_master_id where year_of_fees.optional_fee=true and year_id=${req.year_id} and grade_id =${req.grade_id};`,
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

OptinalModel.createoptionalModel = (optionalReqData, result) => {
    let temp = [];
    let response = [];

    // console.log(temp,"ll")
    // console.log(optionalReqData,"OptionalFee")
    if (optionalReqData && optionalReqData.length) {
        optionalReqData.forEach((optional) => {
            // console.log(optional.student_admissions_id);
            dbConn.query(
                `select * from student_payment_infos where student_id="${optional.student_id}" and fee_master_id=${optional.fee_master_id} and grade_id =${optional.grade_id} and year_id =${optional.year_id}`,
                (err, res) => {
                    if (res.length > 0) {
                        temp.push(res);
                    } else {
                        dbConn.query(
                            `select * from year_of_fees left join terms_year_of_fees on year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.year_id = ${optional.year_id} and year_of_fees.grade_id = ${optional.grade_id} and fee_master_id = ${optional.fee_master_id} and year_of_fees.optional_fee=true`,
                            (err, res) => {
                                if (res) {
                                    //console.log(res,"response");
                                    res.forEach((ele) => {
                                        // function aa() {
                                        //     if (ele.term_amount == null) {
                                        //         return (balance = ele.fee_amount);
                                        //     } else {
                                        //         return (balance = ele.term_amount);
                                        //     }
                                        // }
                                        // let balanceterm = aa();
                                        let optionalfee = {
                                            student_admissions_id: optional.student_admissions_id,
                                            payment_date: 0,
                                            actual_fees: ele.fee_amount,
                                            amount_paid: 0,
                                            payment_mode: null,
                                            comments: null,
                                            created_at: new Date(),
                                            updated_at: new Date(),
                                            year_of_fees_id: ele.year_of_fees_id,
                                            student_id: optional.student_id,
                                            fee_master_id: optional.fee_master_id,
                                            refund: 0,
                                            cum_amt: 0,
                                            balance: ele.term_amount,
                                            grade_id: optional.grade_id,
                                            year_id: optional.year_id,
                                            discount_amount: 0,
                                            dis_feetype_id: 0,
                                            section_id: optional.grade_section_id,
                                            term_name: ele.term_name,
                                            term_amount: ele.term_amount,
                                            optional_fees: 1,
                                            terms_months: ele.terms_months,
                                        };
                                        // console.log(optionalfee, "feeoptional");
                                        // console.log(optionalfee, "optional");
                                        dbConn.query("INSERT into student_payment_infos SET ?", optionalfee, (err, res) => {
                                            if (res) {
                                                response.push(res);
                                                console.log("Insert Successful");
                                            } else {
                                                //    result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                                                console.log(err);
                                            }
                                        });
                                    });
                                }
                            }
                        );
                    }
                    //        console.log(res,"+++")
                    //            dbConn.query(
                    //                `select * from year_of_fees left join terms_year_of_fees on year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.year_id = ${optional.year_id} and year_of_fees.grade_id = ${optional.grade_id} and fee_master_id = ${optional.fee_master_id} and year_of_fees.optional_fee=true`,
                    //                (err, res) => {
                    //                    if (res) {
                    //                        // console.log(res, "response");
                    //                        res.forEach((ele) => {
                    //                            function aa() {
                    //                                if (ele.term_amount == null) {
                    //                                    return (balance = ele.fee_amount);
                    //                                } else {
                    //                                    return (balance = ele.term_amount);
                    //                                }
                    //                            }
                    //                            let balanceterm = aa();
                    //                            let optionalfee = {
                    //                                student_admissions_id: optional.student_admissions_id,
                    //                                payment_date: 0,
                    //                                actual_fees: ele.fee_amount,
                    //                                amount_paid: 0,
                    //                                payment_mode: null,
                    //                                comments: null,
                    //                                created_at: new Date(),
                    //                                updated_at: new Date(),
                    //                                year_of_fees_id: ele.year_of_fees_id,
                    //                                student_id: optional.student_id,
                    //                                fee_master_id: optional.fee_master_id,
                    //                                refund: 0,
                    //                                cum_amt: 0,
                    //                                balance: balanceterm,
                    //                                grade_id: optional.grade_id,
                    //                                year_id: optional.year_id,
                    //                                discount_amount: 0,
                    //                                dis_feetype_id: 0,
                    //                                section_id: optional.grade_section_id,
                    //                                term_name: ele.term_name,
                    //                                term_amount: ele.term_amount,
                    //                                optional_fees: 1,
                    //                                terms_months: ele.terms_months,
                    //                            };
                    //                            // console.log(optionalfee, "optional");
                    //                            dbConn.query("INSERT into student_payment_infos SET ?", optionalfee, (err, res) => {
                    //                                if (res) {
                    //                                    result(null, { IsExsist: false, data: res });
                    //                                    console.log("Insert Successful");
                    //                                } else {
                    //                                    result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                    //                                    console.log(err);
                    //                                }
                    //                            });
                    //                        });
                    //                    }
                    //                }
                    //            );
                    //    }
                }
            );
        });
        //    });
    }
    result(null, { IsExsist: false, data: "success" });

    // result(null, { IsExsist: true, duplication: temp });
};

module.exports = OptinalModel;
