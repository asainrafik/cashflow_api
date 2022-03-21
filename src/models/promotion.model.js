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
    let allocations = {
        student_admissions_id: newRequestBody.student_admissions_id,
        student_id: newRequestBody.student_id,
        student_type: "day scholar",
        from_grade_id: newRequestBody.from_grade,
        grade_section_id: newRequestBody.section_id,
        grade_id: newRequestBody.grade_id,
        year_id: newRequestBody.year_id,
        created_at: new Date(),
        updated_at: new Date(),
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
                    dbConn.query(`SELECT * FROM year_of_fees where grade_id=${grade_id} and year_id=${year_id};`, (err, res) => {
                        if (res && res.length > 0) {
                            res.forEach((element) => {
                                let zero = "000";
                                let paymentinfo = {
                                    student_admissions_id: newRequestBody.student_admissions_id,
                                    payment_date: null,
                                    actual_fees: element.fee_amount,
                                    amount_paid: zero,
                                    payment_mode: null,
                                    comments: null,
                                    created_at: new Date(),
                                    updated_at: new Date(),
                                    year_of_fees_id: element.year_of_fees_id,
                                    student_id: newRequestBody.student_id,
                                    fee_master_id: element.fee_master_id,
                                    refund: zero,
                                    cum_amt: zero,
                                    balance: element.fee_amount,
                                    grade_id: grade_id,
                                    year_id: year_id,
                                    discount_amount: zero,
                                    dis_feetype_id: zero,
                                    section_id: newRequestBody.section_id,
                                };
                                dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
                                    if (res) {
                                        console.log("Insert successfully");
                                    } else {
                                        console.log(err);
                                        return(null,err)
                                    }
                                });
                            });
                        }else{
                            console.log("result",res,"error",err)
                        }
                    });
                }
            });
            let finaldata = {
                id: newRequestBody.student_id,
                ...newRequestBody,
            };
            result(null, { IsExsist: false, data: finaldata });
        } else {
            console.log("error inserting data NewAdmission");
            result(null, err);
        }
    });
};

module.exports = PromotionModel;
