var dbConn = require("../../config/db.config");

var YearOFFee = function (year_of_fees) {
    this.fee_amount = year_of_fees.fee_amount;
    this.fee_master_id = year_of_fees.fee_master_id;
    this.year_id = year_of_fees.year_id;
    this.grade_id = year_of_fees.grade_id;
    this.term_name = year_of_fees.term_name;
    this.term_amount = year_of_fees.term_amount;
    this.created_at = new Date();
    this.updated_at = new Date();
};

YearOFFee.getAllYearOFFeeModel = (yearoffeeReqData, result) => {
    let grade_id = yearoffeeReqData.grade_id;
    dbConn.query(
        `select *
	FROM year_of_fees
	LEFT JOIN terms_year_of_fees
	on year_of_fees.year_of_fees_id=terms_year_of_fees.year_of_fee_id left join fee_masters on year_of_fees.fee_master_id = fee_masters.fee_master_id where year_of_fees.grade_id=${grade_id} and year_of_fees.year_id=${yearoffeeReqData.year_id};`,
        (err, res) => {
            if (res) {
                const unique = [...new Set(res.map((item) => item.fee_master_id))];
                let terms_fees_data = []
                unique.forEach((values) => {
                    let filter = res.filter((d) => d.fee_master_id === values);
                    terms_fees_data.push({fee_master_name:filter[0].fee_type_name,terms:filter})
                });
                result(null, terms_fees_data);
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

YearOFFee.createYearOFFeeModel = (YearOFFeeReqData, result) => {
    //  console.log(YearOFFeeReqData, "+++++");
    // element.map((YearOFFeeReqData) =>{
    dbConn.query(
        `select * from year_of_fees where fee_master_id="${YearOFFeeReqData.fee_master_id}" and grade_id="${YearOFFeeReqData.grade_id}" and year_id="${YearOFFeeReqData.year_id}";`,
        (err, res) => {
            if (res) {
                if (res.length > 0) {
                    result(null, { IsExsist: true, duplication: res });
                } else {
                    let year_of_fees_value = {
                        fee_amount: YearOFFeeReqData.fee_amount,
                        grade_id: YearOFFeeReqData.grade_id,
                        fee_master_id: YearOFFeeReqData.fee_master_id,
                        year_id: YearOFFeeReqData.year_id,
                        optional_fee: YearOFFeeReqData.optional_fee,
                        created_at: new Date(),
                        updated_at: new Date(),
                    };
                    dbConn.query("INSERT into year_of_fees SET ?", year_of_fees_value, (err, res) => {
                        console.log(res);
                        if (res) {
                            dbConn.query(`SELECT * FROM year_of_fees where year_of_fees_id=${res.insertId};`, (err, res) => {
                                if (res) {
                                    let year_fees_Data = res[0];
                                    const termfees = YearOFFeeReqData.term_fees;
                                    const yearofid = year_fees_Data.year_id;
                                    dbConn.query(`select * from years where year_id =${yearofid}`, (err, res) => {
                                        if (res) {
                                            let tempermonth = [];
                                            res.map((ele) => {
                                                console.log(ele.academic_months);
                                                tempermonth.push(ele.academic_months);
                                            });
                                            let Splityear = tempermonth[0].split(",");
                                            let induchuval = Splityear[0].split("-");
                                            let secondevalue = Splityear[1].split("-");
                                            console.log(secondevalue[0]);
                                            console.log(secondevalue[1]);
                                            console.log(induchuval[0]);
                                            console.log(induchuval[1]);
                                            const termlength = YearOFFeeReqData.term_count;
                                            console.log(termlength, "lll");
                                            let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                            let academicyearEnd = secondevalue[1];
                                            let startYearMonth = [];
                                            let endYearMonth = [];
                                            month.forEach((val, index) => {
                                                month.indexOf(academicyearEnd) < index
                                                    ? startYearMonth.push(val + induchuval[0])
                                                    : endYearMonth.push(val + secondevalue[0]);
                                            });
                                            let FinalMonths = [...startYearMonth, ...endYearMonth];
                                            let a = FinalMonths;
                                            console.log(FinalMonths);
                                            let toSplit = termlength;
                                            let splitofyears = 12 / toSplit;
                                            let c = a.length / splitofyears;
                                            console.log(Math.round(c));
                                            let tempArr = [];
                                            for (i = 0; i < c; i++) {
                                                let dataVal = 0;
                                                if (a.length >= splitofyears) {
                                                    let term = a.splice(dataVal, splitofyears);
                                                    tempArr.push(term);
                                                } else {
                                                    tempArr.push(a);
                                                }
                                            }
                                            tempArr.map((el, index) => {
                                                termfees[index].termfess = el;
                                            });
                                            console.log(termfees);

                                            termfees.map((eleee) => {
                                                let terms_ma = {
                                                    year_of_fee_id: year_fees_Data.year_of_fees_id,
                                                    term_name: eleee.term_name,
                                                    term_amount: eleee.term_amount,
                                                    term_from_months: new Date(),
                                                    grade_id: year_fees_Data.grade_id,
                                                    year_id: year_fees_Data.year_id,
                                                    optional_fees: year_fees_Data.optional_fee,
                                                    terms_months: JSON.stringify(eleee.termfess),
                                                };
                                                dbConn.query("INSERT into terms_year_of_fees SET ?", terms_ma, (err, res) => {
                                                    if (res) {
                                                        console.log(res, "terms_year_of_fees");
                                                    } else {
                                                        console.log(err);
                                                    }
                                                });
                                            });
                                        }

                                        // dbConn.query(
                                        // 	`SELECT * FROM student_admissions where grade_id=${YearOFFeeReqData.grade_id} and year_id=${YearOFFeeReqData.year_id};`,
                                        // 	(err, resData) => {
                                        // 		console.log(resData);
                                        // 		if (resData && resData.length > 0) {
                                        // 			console.log(resData);
                                        // 			let Zero = 0;
                                        // 			resData.forEach((element) => {
                                        // 				let paymentinfo = {
                                        // 					student_admissions_id: element.student_admissions_id,
                                        // 					payment_date: null,
                                        // 					actual_fees: year_fees_Data.fee_amount,
                                        // 					amount_paid: Zero,
                                        // 					payment_mode: null,
                                        // 					comments: null,
                                        // 					created_at: new Date(),
                                        // 					updated_at: new Date(),
                                        // 					year_of_fees_id: year_fees_Data.year_of_fees_id,
                                        // 					student_id: element.student_id,
                                        // 					fee_master_id: year_fees_Data.fee_master_id,
                                        // 					refund: Zero,
                                        // 					balance: year_fees_Data.fee_amount,
                                        // 					grade_id: element.grade_id,
                                        // 					year_id: element.year_id,
                                        // 					section_id: element.grade_section_id,
                                        // 					cum_amt:element.cum_amt
                                        // 				};
                                        // 				console.log(paymentinfo,"lll")
                                        // 				dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
                                        // 					if (res) {
                                        // 						console.log("Insert successfully");
                                        // 					} else {
                                        // 						console.log(err);
                                        // 					}
                                        // 				});
                                        // 			});
                                        // 		}
                                        // 	}
                                        // );
                                    });
                                }
                            });
                            let finaldata = {
                                id: res.insertId,
                                ...YearOFFeeReqData,
                            };
                            result(null, { IsExsist: false, data: finaldata });
                        } else {
                            console.log(err);
                            console.log("error inserting data year");
                            result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                        }
                    });
                }
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

YearOFFee.deleteYearOFFeeModel = (YearOFFeeReqData, result) => {
    // console.log(`SELECT * FROM year_of_fees WHERE academic_year ="${YearOFFeeReqData.academic_year}" and  fee_master_id=${YearOFFeeReqData.fee_master_id}`);
    dbConn.query(
        `SELECT *
    FROM student_payment_infos  WHERE year_of_fees_id=${YearOFFeeReqData.year_of_fees_id}`,
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
                                dbConn.query(`select * from terms_year_of_fees where year_of_fee_id = "${YearOFFeeReqData.year_of_fees_id}";`, (err, res) => {
                                    let termsTofind = { year_of_fee_id: YearOFFeeReqData.year_of_fees_id };
                                    dbConn.query("DELETE FROM terms_year_of_fees WHERE ?", termsTofind);
                                    let gradeToFind = { year_of_fees_id: YearOFFeeReqData.year_of_fees_id };
                                    dbConn.query("DELETE FROM year_of_fees WHERE ?", gradeToFind, (err, res) => {
                                        if (res) {
                                            console.log("year of fee deleted successfully");
                                            console.log(res);
                                            result(null, { isDeletable: true, record: "record Deleted" });
                                        } else {
                                            console.log("error inserting data year");
                                            result(null, err);
                                        }
                                    });
                                });

                                // result(null, { isDeletable: true, data: { res } });
                            }
                        }
                    );
                }
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
    //result(null,"data is up")
};

YearOFFee.updateYearOFFeeModel = (id, YearOFFeeReqData, result) => {
    dbConn.query(`select * from student_payment_infos where year_of_fees_id = "${id}";`, (err, res) => {
        if (res.length > 0) {
            result(null, { IsExsist: true, duplication: res });
        } else {
            dbConn.query(`UPDATE year_of_fees set fee_amount = "${YearOFFeeReqData.fee_amount}" WHERE year_of_fees_id=${id};`, (err, res) => {
                if (res) {
                    dbConn.query(`select * from terms_year_of_fees where year_of_fee_id = "${id}";`, (err, res) => {
                        if (res) {
                            const termfees = YearOFFeeReqData.term_fees;

                            res.map((el, index) => {
                                termfees[index].termfess = el;
                            });
                            termfees.forEach((updateterm) => {
                                console.log(updateterm, "aasas");
                                console.log(updateterm.termfess.terms_id, "sss");
                                dbConn.query(
                                    `UPDATE terms_year_of_fees set term_name = "${updateterm.term_name}",term_amount="${updateterm.term_amount}" WHERE terms_id=${updateterm.termfess.terms_id}`,
                                    (err, res) => {}
                                );
                            });
                            result(null, { IsExsist: false, data: "Updated Succesfully" });
                        }
                    });
                } else {
                    console.log("error updated data year_of_fees");
                    result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                }
            });
        }
    });
};

module.exports = YearOFFee;
