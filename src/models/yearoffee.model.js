var dbConn = require("../../config/db.config");

var YearOFFee = function (year_of_fees) {
    this.fee_amount = year_of_fees.fee_amount;
    this.fee_master_id = year_of_fees.fee_master_id;
    this.grade_id = year_of_fees.grade_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

YearOFFee.getAllYearOFFeeModel = (yearoffeeReqData, result) => {
    let grade_id = yearoffeeReqData.grade_id;
    dbConn.query(`select * from year_of_fees where grade_id=${grade_id}`, (err, res) => {
        if (res) {
            console.log("Year Of Fee fetched successfully");
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

YearOFFee.createYearOFFeeModel = (YearOFFeeReqData, result) => {
    console.log(YearOFFeeReqData, "+++++");
    dbConn.query(`select * from year_of_fees where fee_master_id="${YearOFFeeReqData.fee_master_id}" and grade_id="${YearOFFeeReqData.grade_id}";`, (err, res) => {
        if (res) {
            console.log("year_of_fees fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { IsExsist: true, duplication: res });
            } else {
                dbConn.query("INSERT into year_of_fees SET ?", YearOFFeeReqData, (err, res) => {
                    if (res) {
                        console.log(res);
                        console.log("year_of_fees inserted successfully");
                        let finaldata = {
                            id: res.insertId,
                            ...YearOFFeeReqData,
                        };
                        result(null, { IsExsist: false, data: finaldata });
                    } else {
                        console.log("error inserting data year");
                        result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                    }
                });
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

YearOFFee.deleteYearOFFeeModel = (YearOFFeeReqData, result) => {
    // console.log(`SELECT * FROM year_of_fees WHERE academic_year ="${YearOFFeeReqData.academic_year}" and  fee_master_id=${YearOFFeeReqData.fee_master_id}`);
    dbConn.query(
        `SELECT year_of_fees.year_of_fees_id
    FROM   year_of_fees LEFT JOIN student_payment_infos ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id WHERE student_payment_infos.year_of_fees_id=${YearOFFeeReqData.year_of_fees_id}`,
        (err, res) => {
            if (res) {
                console.log("year fetched successfully");
                var student_payment_infos_data = res;
                console.log(student_payment_infos_data, "student_payment_infos table");
                if (student_payment_infos_data.length > 0) {
                    result(null, { isDeletable: false, data: { res } });
                } else {
                    dbConn.query(
                        `SELECT year_of_fees.year_of_fees_id FROM year_of_fees LEFT JOIN fees_discounts ON year_of_fees.year_of_fees_id = fees_discounts.year_of_fees_id WHERE fees_discounts.year_of_fees_id=${YearOFFeeReqData.year_of_fees_id}`,
                        (err, res) => {
                            console.log(YearOFFeeReqData.year_of_fees_id);
                            var fees_discounts_data = res;
                            console.log(fees_discounts_data);
                            if (fees_discounts_data.length > 0) {
                                result(null, { isDeletable: false, data: { res } });
                            } else {
                                let gradeToFind = { year_of_fees_id: YearOFFeeReqData.year_of_fees_id };
                                dbConn.query("DELETE FROM year_of_fees WHERE ?", gradeToFind, (err, res) => {
                                    if (err) {
                                        console.log("error inserting data year");
                                        result(null, err);
                                    } else {
                                        console.log("year deleted successfully");
                                        console.log(res);
                                        result(null, { isDeletable: true, record: "record Deleted" });
                                    }
                                });
                               // result(null, { isDeletable: true, data: { res } });
                            }
                        }
                    );
                }

                // if (res.length > 0) {
                //     // result(null, { isDeletable: false, data: { res } });
                // } else {
                //     // let gradeToFind = { year_of_fees_id: YearOFFeeReqData.year_of_fees_id };
                //     // dbConn.query("DELETE FROM grade_section WHERE ?", gradeToFind, (err, res) => {
                //     //     if (err) {
                //     //         console.log("error inserting data year");
                //     //         result(null, err);
                //     //     } else {
                //     //         console.log("year deleted successfully");
                //     //         console.log(res);
                //     //         result(null, { isDeletable: true, record: "record Deleted" });
                //     //     }
                //     // });
                // }
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
    //result(null,"data is up")
};

YearOFFee.updateYearOFFeeModel = (id,YearOFFeeReqData, result) => {
    console.log(id,YearOFFeeReqData, "+++++");
    dbConn.query(`UPDATE year_of_fees set fee_amount = "${YearOFFeeReqData.fee_amount}" WHERE year_of_fees_id=${id};`, (err, res) => {
        console.log(res)
        if (res) {
            console.log("year_of_fees updated successfully");
            console.log(res);
            result(null, { message:"Updated Succesfully", data: "Updated Succesfully" });
        } else {
            console.log("error updated data year_of_fees");
            result(null, err);
        }
    });
};

module.exports = YearOFFee;
