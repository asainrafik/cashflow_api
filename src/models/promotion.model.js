var dbConn = require("../../config/db.config");

var PromotionModel = function (promotion) {
    this.year_id = promotion.year_id;
    this.grade_id = promotion.grade_id;
    this.section_id = promotion.section_id;
    this.student_admissions_id=promotion.student_admissions_id;
    this.student_id=promotion.student_id;
    this.from_grade=promotion.from_grade;    
    this.created_at = new Date();
    this.updated_at = new Date();

};

PromotionModel.getStudentPromotion = (promoReqData, result) => {
    dbConn.query(
        `SELECT * FROM student_allocations WHERE year_id=${promoReqData.year_id} and grade_section_id=${promoReqData.section_id} and grade_id=${promoReqData.grade_id}`,
        (err, res) => {
            if (res) {
                console.log("promotion fetched successfully");
                console.log(res);
                if (res.length > 0) {
                    result(null, res);
                } else {
                    result(null, []);
                }
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

PromotionModel.makePromotion = (newRequestBody, result) => {
    dbConn.query(`select * from student_payment_infos where grade_id=${newRequestBody.grade_id} and year_id=${newRequestBody.year_id} and student_id="${newRequestBody.student_id}" and student_admissions_id="${newRequestBody.student_admissions_id}";`, (err, res) => {
        if (res.length > 0) {
            result(null, { IsExsist: true, duplication: res });
        } else {
            dbConn.query(
                `select * from year_of_fees
            left join terms_year_of_fees on
                year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${newRequestBody.grade_id} and year_of_fees.year_id=${newRequestBody.year_id} and year_of_fees.optional_fee=false;`,
                (err, res) => {
                     if(res.length > 0) {
            console.log(newRequestBody);
            let allocations = {
                student_admissions_id: newRequestBody.student_admissions_id,
                student_id: newRequestBody.student_id,
                from_grade_id: newRequestBody.from_grade,
                grade_section_id: newRequestBody.section_id,
                grade_id: newRequestBody.grade_id,
                year_id: newRequestBody.year_id,
                created_at: new Date(),
                updated_at: new Date(),
                mode_of_transport:"Self",
                mode_of_transport_allocation:0,
                mode_of_transport_touched:0
            };
            console.log("student_allocations", allocations);
            dbConn.query("INSERT into student_allocations SET ?", allocations, (err, res) => {
                if (res) {
                    dbConn.query(`SELECT * FROM student_allocations where student_id="${newRequestBody.student_id}"`, (err, res) => {
                        if (res) {
                            let student_admissions_id = newRequestBody.student_admissions_id;
                            let student_id = newRequestBody.student_id;
                            let grade_id = newRequestBody.grade_id;
                            let year_id = newRequestBody.year_id;
                            dbConn.query(
                                `select *
                                FROM year_of_fees
                                LEFT JOIN terms_year_of_fees on year_of_fees.year_of_fees_id=terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${grade_id} and year_of_fees.year_id=${year_id} and optional_fee=false;`,
                                (err, res) => {
                                    if (res && res.length > 0) {
                                        // console.log(res,"Response");
                                        res.forEach((element) => {
                                            // function aa() {
                                            //     if (element.term_amount == null) {
                                            //         return (balance = element.fee_amount);
                                            //     } else {
                                            //         return (balance = element.term_amount);
                                            //     }
                                            // }
                                            // let balanceterm = aa();
                                            let zero = "000";
                                            let paymentinfo = {
                                                student_admissions_id: newRequestBody.student_admissions_id,
                                                payment_date: 0,
                                                actual_fees: element.fee_amount,
                                                amount_paid: zero,
                                                payment_mode: 0,
                                                comments: 0,
                                                created_at: new Date(),
                                                updated_at: new Date(),
                                                year_of_fees_id: element.year_of_fees_id,
                                                student_id: newRequestBody.student_id,
                                                fee_master_id: element.fee_master_id,
                                                refund: zero,
                                                cum_amt: zero,
                                                balance: element.term_amount,
                                                grade_id: grade_id,
                                                year_id: year_id,
                                                discount_amount: zero,
                                                dis_feetype_id: zero,
                                                term_name: element.term_name,
                                                term_amount: element.term_amount,
                                                terms_months: element.terms_months,
                                                optional_fees: element.optional_fees,
                                                section_id: newRequestBody.section_id,
                                                terms_id: element.terms_id,
                                                checked_status:true
                                            };
                                            dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
                                                if (res) {
                                                    console.log("Insert successfully");
                                                } else {
                                                    console.log(err);
                                                    return null, err;
                                                }
                                            });
                                        });
                                    } else {
                                        console.log("result", res, "error", err);
                                    }
                                }
                            );
                        }
                    });
                    let finaldata = {
                        id: newRequestBody.student_id,
                        ...newRequestBody,
                    };
                    result(null, { IsExsist: false, data: finaldata });
                } else {
                    console.log("error inserting data NewAdmission");
                    result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });                }
            });
        } else {
            result(null, { IsExsist: "year", data: "Please fill The Year of Fee \u{26D4} \u{26D4}" });
        }
    })
}
    });
};

module.exports = PromotionModel;
