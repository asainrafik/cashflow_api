var dbConn = require("../../config/db.config");

var TransportFee = function (transport_fee) {
    this.fee_amount = transport_fee.fee_amount;
    this.fee_master_id = transport_fee.fee_master_id;
    this.year_id = transport_fee.year_id;
    this.grade_id = transport_fee.grade_id;
    this.term_amount = transport_fee.term_amount;
    this.created_at = new Date();
    this.updated_at = new Date();
};
TransportFee.getAllTransportModel = (TransportReqData, result) => {
    let grade_id = TransportReqData.grade_id;
    dbConn.query(
        `select *
	FROM year_of_fees
	LEFT JOIN terms_year_of_fees
	on year_of_fees.year_of_fees_id=terms_year_of_fees.year_of_fee_id left join fee_masters on year_of_fees.fee_master_id = fee_masters.fee_master_id where year_of_fees.grade_id=${grade_id} and year_of_fees.year_id=${TransportReqData.year_id} and transport_fee = "true";`,
        (err, res) => {
            if (res) {
                const unique = [...new Set(res.map((item) => item.fee_master_id))];
                let terms_fees_data = [];
                unique.forEach((values) => {
                    let filter = res.filter((d) => d.fee_master_id === values);
                    terms_fees_data.push({ fee_master_name: filter[0].fee_type_name, terms: filter });
                });
                result(null, terms_fees_data);
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};
TransportFee.createTransportModel = (TransportReq, result) => {
    if (TransportReq && TransportReq.grade_id && TransportReq.grade_id.length) {
        TransportReq.grade_id.forEach((gradeid) => {
            dbConn.query(
                `select * from year_of_fees where fee_master_id="${TransportReq.fee_master_id}" and grade_id="${gradeid}" and year_id="${TransportReq.year_id}";`,
                (err, res) => {
                    if (res) {
                        if (res.length > 0) {
                        } else {
                            let transport_value = {
                                fee_amount: TransportReq.fee_amount,
                                grade_id: gradeid,
                                fee_master_id: TransportReq.fee_master_id,
                                year_id: TransportReq.year_id,
                                optional_fee: TransportReq.optional_fee,
                                created_at: new Date(),
                                updated_at: new Date(),
                            };
                            dbConn.query("INSERT into year_of_fees SET ?", transport_value, (err, res) => {
                                if (res) {
                                    dbConn.query(`SELECT * FROM year_of_fees where year_of_fees_id=${res.insertId};`, (err, res) => {
                                        if (res) {
                                            let Transportfee = res[0];
                                            const termfees = TransportReq.term_fees;
                                            const yearofid = Transportfee.year_id;
                                            dbConn.query(`select * from years where year_id =${yearofid}`, (err, res) => {
                                                if (res) {
                                                    let tempermonth = [];
                                                    res.map((ele) => {
                                                        tempermonth.push(ele.academic_months);
                                                    });
                                                    let Splityear = tempermonth[0].split(",");
                                                    let induchuval = Splityear[0].split("-");
                                                    let secondevalue = Splityear[1].split("-");
                                                    const termlength = TransportReq.term_count;
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
                                                    termfees.map((eleee) => {
                                                        let terms_ma = {
                                                            year_of_fee_id: Transportfee.year_of_fees_id,
                                                            term_name: eleee.term_name,
                                                            term_amount: eleee.term_amount,
                                                            term_from_months: new Date(),
                                                            grade_id: gradeid,
                                                            year_id: Transportfee.year_id,
                                                            optional_fees: Transportfee.optional_fee,
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
                                                } else {
                                                    console.log(err);
                                                    console.log("error inserting data year");
                                                    result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    } else {
                        console.log(err);
                    }
                }
            );
        });
        result(null, { IsExsist: false, data: "Insert Successful" });
    }
};
module.exports = TransportFee;
