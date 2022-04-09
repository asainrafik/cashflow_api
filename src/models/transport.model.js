var dbConn = require("../../config/db.config");

var Transportfee = function (transport) {
    this.places_id = transport.places_id;
    this.term_name = transport.term_name;
    this.term_amount = transport.term_amount;
    this.year_id = transport.year_id;
};

Transportfee.gettransportmodel = (result) => {
    dbConn.query(
        `select *
	FROM transport_fees
	LEFT JOIN places
	ON transport_fees.places_id=places.places_id 
    LEFT JOIN years ON years.year_id = transport_fees.year_id `,
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

Transportfee.createtransportModel = (TransportReqData, result) => {
    dbConn.query(`select * from transport_fees where places_id="${TransportReqData.places_id}"  and year_id="${TransportReqData.year_id}";`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                console.log(res, "lll");
                result(null, { IsExsist: true, duplication: res });
            } else {
                // console.log(res,"klk")
                const trans = TransportReqData.term_fees;

                trans.map((ele) => {
                    let Transport_Data = {
                        places_id: TransportReqData.places_id,
                        term_name: ele.term_name,
                        term_amount: ele.term_amount,
                        year_id: TransportReqData.year_id,
                    };
                    dbConn.query("INSERT into transport_fees SET ?", Transport_Data, (err, res) => {
                        if (res) {
                            let transportdata = {
                                id: res.insertId,
                                ...TransportReqData,
                            };
                            result(null, { IsExsist: false, data: transportdata });
                        } else {
                            result(null, { IsExsist: "error", data: "please check the Entered data failed Insert \u{26D4} \u{26D4}" });
                        }
                    });
                });
            }
        } else {
            result(null, err);
        }
    });
};

Transportfee.deletetransportmodel = (transportreqData, result) => {
    dbConn.query(
        `SELECT *
    FROM transport_allocations WHERE places_id=${transportreqData.places_id}`,
        (err, res) => {
            if (res) {
                if (res.length > 0) {
                    result(null, { isDeletable: false, data: { res } });
                } else {
                      let transportTofind = {places_id : transportreqData.places_id}
                    dbConn.query("DELETE FROM transport_fees WHERE ?", transportTofind, (err, res) => {
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

module.exports = Transportfee;
