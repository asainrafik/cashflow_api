var dbConn = require("../../config/db.config");

var StoppingModel = function (stopping) {
    this.places_id = stopping.places_id;
    this.stopping = stopping.stopping;
};

StoppingModel.getstopingmodel = (result) => {
    dbConn.query(
        `select *
	FROM stopping
	LEFT JOIN places
	ON stopping.places_id=places.places_id`,
        (err, res) => {
            if (res) {
                result(null, res);
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

StoppingModel.createstoppingModel = (StoppingReq, result) => {
    dbConn.query(`select * from stopping where places_id="${StoppingReq.places_id}" and stopping="${StoppingReq.stopping}";`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { IsExsist: true, duplication: res });
            } else {
                    dbConn.query("INSERT into stopping SET ?", StoppingReq, (err, res) => {
                        if (res) {
                            let stoppingdata = {
                                id: res.insertId,
                                ...StoppingReq,
                            };
                            result(null, { IsExsist: false, data: stoppingdata });
                        } else {
                            result(null, { IsExsist: "error", data: "please check the Entered data failed Insert \u{26D4} \u{26D4}" });
                        }
                    });
             
            }
        } else {
            result(null, err);
        }
    });
};

StoppingModel.deletestoppingmodel = (stoppingreqData, result) => {
    dbConn.query(
        `SELECT *
    FROM transport_allocations WHERE stop_id=${stoppingreqData.stop_id}`,
        (err, res) => {
            if (res) {
                if (res.length > 0) {
                    result(null, { isDeletable: false, data: { res } });
                } else {
                      let StoppingTofind = {stop_id : stoppingreqData.stop_id}
                    dbConn.query("DELETE FROM stopping WHERE ?", StoppingTofind, (err, res) => {
                        if (err) {
                            result(null, err);
                        } else {
                            result(null, { isDeletable: true, record: "record Deleted" });
                        }
                    });
                }
            }
        }
    );
};

// YearOFFee.updateYearOFFeeModel = (id, YearOFFeeReqData, result) => {
//     // console.log(YearOFFeeReqData,"+++");
//     // console.log(YearOFFeeReqData.term_fees,"--+---+--");
//     // console.log(id,"Aaa")
//     // console.log(id, YearOFFeeReqData, "+++++");
//     dbConn.query(`UPDATE year_of_fees set fee_amount = "${YearOFFeeReqData.fee_amount}" WHERE year_of_fees_id=${id};`, (err, res) => {
//         if (res) {
//             console.log(res,"ddss")
//             const termfees = YearOFFeeReqData.term_fees;
// 					termfees.forEach((updateterm) =>{
// 						dbConn.query(
// 							`UPDATE terms_year_of_fees set term_name = "${updateterm.term_name}",term_amount="${updateterm.term_amount}" WHERE year_of_fee_id=${id}`,
// 							(err, res) => {
// 								console.log(res,"looo")
// 							 }
// 							);
// 					})
//             // dbConn.query(`SELECT * FROM year_of_fees WHERE year_of_fees_id=${id};`, (err, res) => {
//             //     let fees_response = res[0];
//             //     let fee_amount = fees_response.fee_amount;
//             //     let fee_master_id = fees_response.fee_master_id;
//             //     //    console.log(fee_amount);
//             //     if (res) {

//             //                 // if (res) {
// 			// 				// 	console.log(res,"ll")
//             //                 //     dbConn.query(`Select * from student_payment_infos WHERE year_of_fees_id=${id};`, (err, res) => {
//             //                 //         if (res && res.length > 0) {
//             //                 //             res.forEach((element) => {
//             //                 //                 let amoumt = Number(fee_amount) - Number(element.amount_paid);
//             //                 //                 console.log(Number(amoumt));
//             //                 //                 dbConn.query(
//             //                 //                     `UPDATE student_payment_infos set actual_fees ="${fee_amount}",balance="${amoumt}" where fee_master_id=${fee_master_id} and student_payment_info_id=${element.student_payment_info_id}`,
//             //                 //                     (err, res) => {}
//             //                 //                 );
//             //                 //             });
//             //                 //         }
//             //                 //     });
//             //                 // }

//             //     }
//             // });
//             // console.log("year_of_fees updated successfully");
//             // console.log(res);
//             result(null, { message: "Updated Succesfully", data: "Updated Succesfully" });
//         } else {
//             console.log("error updated data year_of_fees");
//             result(null, err);
//         }
//     });
// };

module.exports = StoppingModel;
