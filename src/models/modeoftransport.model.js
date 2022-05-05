var dbConn = require("../../config/db.config");

var modeoftranportModel = function (modeoftransport) {
    (this.transport_fee_id = modeoftransport.transport_fee_id), (this.year_id = modeoftransport.year_id), (this.place_id = modeoftransport.place_id);
};
modeoftranportModel.getFeemasterModel = (result) =>{
    dbConn.query(`SELECT fee_master_id,fee_type_name,order_id FROM fee_masters WHERE transport_fee="true";`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
}
modeoftranportModel.insertransportModel = (transportDataArr, result) => {
    console.log(transportDataArr.places_id);
    dbConn.query(`select * from fee_masters where transport_fee = true;`, (err, res) => {
        if (res) {
            let transport_fees = res[0];
            // console.log(transport_fees,"feemasterid")
            dbConn.query(
                `select * from transport_fees where places_id = ${transportDataArr.places_id} and year_id =${transportDataArr.year_id};`,
                (err, res) => {
                    if (res) {
                        res.map((ele) => {
                            let paymentinfo = {
                                student_admissions_id: transportDataArr.student_admissions_id,
                                payment_date: 0,
                                actual_fees: ele.term_amount,
                                amount_paid: 0,
                                payment_mode: null,
                                comments: null,
                                created_at: new Date(),
                                updated_at: new Date(),
                                year_of_fees_id: ele.transport_fee_id,
                                student_id: transportDataArr.student_id,
                                fee_master_id: transport_fees.fee_master_id,
                                refund: 0,
                                cum_amt: 0,
                                balance: ele.term_amount,
                                grade_id: transportDataArr.grade_id,
                                year_id: transportDataArr.year_id,
                                discount_amount: 0,
                                dis_feetype_id: 0,
                                section_id: transportDataArr.section_id,
                                term_name: ele.term_name,
                                term_amount: ele.term_amount,
                                optional_fees: 0,
                                terms_months: null,
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
                    }
                }
            );
        }
    });
};

modeoftranportModel.inserthostelModel = (transportDataArr, result) => {
    // console.log(transportDataArr);
    dbConn.query(`select * from fee_masters where hostal_fee = true;`, (err, res) => {
        if (res) {
            let Hostal_fees = res[0];
            // console.log(Hostal_fees, "Hostel_fees");
            dbConn.query(
                `select * from year_of_fees
            left join terms_year_of_fees on
                year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${transportDataArr.grade_id} and year_of_fees.year_id=${transportDataArr.year_id} and fee_master_id = ${Hostal_fees.fee_master_id} and term_name = "${transportDataArr.term_name}"`,
                (err, res) => {
                    let temp = [];
                    res.map((ele) => {
                        console.log(ele,"terms");
                        let paymentinfo = {
                            student_admissions_id: transportDataArr.student_admissions_id,
                            payment_date: 0,
                            actual_fees: ele.term_amount,
                            amount_paid: 0,
                            payment_mode: null,
                            comments: null,
                            created_at: new Date(),
                            updated_at: new Date(),
                            year_of_fees_id: ele.year_of_fees_id,
                            student_id: transportDataArr.student_id,
                            fee_master_id: Hostal_fees.fee_master_id,
                            refund: 0,
                            cum_amt: 0,
                            balance: ele.term_amount,
                            grade_id: transportDataArr.grade_id,
                            year_id: transportDataArr.year_id,
                            discount_amount: 0,
                            dis_feetype_id: 0,
                            section_id: transportDataArr.section_id,
                            term_name: ele.term_name,
                            term_amount: ele.term_amount,
                            optional_fees: 0,
                            terms_months: ele.terms_months,
                        };
                        console.log(paymentinfo, "fees");
                        dbConn.query("INSERT into student_payment_infos SET ?", paymentinfo, (err, res) => {
                            if (res) {
                                console.log("Insert successfully");
                                temp.push(res);
                            } else {
                                console.log(err);
                            }
                        });
                    })
                    result(null,"Sucess");
                }
            );
        }
    });
};
module.exports = modeoftranportModel;
