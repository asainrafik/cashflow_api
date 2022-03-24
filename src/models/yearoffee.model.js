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
	dbConn.query(`select *
	FROM year_of_fees
	LEFT JOIN terms_year_of_fees
	on  year_of_fees.year_of_fees_id=terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${grade_id} and year_of_fees.year_id=${yearoffeeReqData.year_id};`, (err, res) => {
		if (res) {
			// console.log(res,"lppooo")
		// 	const identicaladmissionId = []
		// 	let tempar =[{yearoffee:res}]
		// 	res.forEach((ele) =>{
		// 		dbConn.query(`select * from terms_year_of_fees where year_of_fee_id =${ele.year_of_fees_id};`, (err, ress) => {
		// 			if(ress){
		// 				var newfilter = ress;
		// 				var go = [];
		// 				newfilter.forEach((element) =>{
		// 					console.log(element,"sdsd")
		// 				})
		// 				go.push(newfilter);
		// 				console.log(go)
		// 			}else{
		// 				console.log(err,"ssd")
		// 			}
		// 		})	
				 
		//  })
		//  console.log(tempar,"hhh")
		 result(null, res); 
		} else {
			console.log("error fetching data year");
			result(null, err);
		}
	});
};

YearOFFee.createYearOFFeeModel = (YearOFFeeReqData, result) => {
	//  console.log(YearOFFeeReqData, "+++++");
	// element.map((YearOFFeeReqData) =>{
		dbConn.query(
			`select * from year_of_fees where fee_master_id="${YearOFFeeReqData.fee_master_id}" and grade_id="${YearOFFeeReqData.grade_id}" and year_id="${YearOFFeeReqData.year_id}";`,
			(err, res) => {
				// console.log(res,"kkk")
				if (res) {
					// console.log("year_of_fees fetched successfully");
					//  console.log(res,"oooo");
					if (res.length > 0) {
						//  console.log(res,"ppp");
						result(null, { IsExsist: true, duplication: res });
					} else {
						//  console.log(YearOFFeeReqData,"kkk");
						let year_of_fees_value = {
							fee_amount:YearOFFeeReqData.fee_amount,
							grade_id: YearOFFeeReqData.grade_id,
							fee_master_id: YearOFFeeReqData.fee_master_id,
							year_id: YearOFFeeReqData.year_id,
							optional_fee: YearOFFeeReqData.optional_fee,
							created_at: new Date(),
							updated_at: new Date(),
						}
						console.log(year_of_fees_value,"optinal")
						//   const tempArr =[]
						//   tempArr.push(year_of_fees_value)
						//  console.log(year_of_fees_value,"year_of_fees_value")
						// const ids = year_of_fees_value.map(o => o.fee_master_id)
						// const filteryear = year_of_fees_value.filter(({fee_master_id}, index) => !ids.includes(fee_master_id, index + 1))
						//  console.log(filteryear,"ASAA");
						dbConn.query("INSERT into year_of_fees SET ?", year_of_fees_value, (err, res) => {
								// console.log(res)
							if (res) {
								// console.log(res);
								// console.log("year_of_fees inserted successfully");
								dbConn.query(`SELECT * FROM year_of_fees where year_of_fees_id=${res.insertId};`, (err, res) => {
									if (res) {
										let year_fees_Data = res[0];
										 console.log(year_fees_Data,"dddd");
										const termfees =YearOFFeeReqData.term_fees;
										termfees.map((ele) =>{
										let terms_ma = {
												year_of_fee_id:year_fees_Data.year_of_fees_id,
												term_name:ele.term_name,
												term_amount: ele.term_amount,
												term_from_months:new Date(),
												term_to_months:new Date(),
												grade_id:year_fees_Data.grade_id,
												year_id: year_fees_Data.year_id
											  }
											  console.log(terms_ma,"termsss");
											  dbConn.query("INSERT into terms_year_of_fees SET ?", terms_ma, (err, res) => {
												  if(res){
													console.log(res,"terms_year_of_fees")
												  }else{
													  console.log(err)
												  }
											  })
										   })
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
										
										
									}
								});
								let finaldata = {
									id: res.insertId,
									...YearOFFeeReqData,
								};
								result(null, { IsExsist: false, data: finaldata });
							} else {
								console.log(err)
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
	// })
	
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
								let gradeToFind = { year_of_fees_id: YearOFFeeReqData.year_of_fees_id };
								dbConn.query("DELETE FROM year_of_fees WHERE ?", gradeToFind, (err, res) => {
									if (err) {
										console.log("error inserting data year");
										result(null, err);
									} else {
										console.log("year of fee deleted successfully");
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

YearOFFee.updateYearOFFeeModel = (id, YearOFFeeReqData, result) => {
	// console.log(id, YearOFFeeReqData, "+++++");
	dbConn.query(`UPDATE year_of_fees set fee_amount = "${YearOFFeeReqData.fee_amount}" WHERE year_of_fees_id=${id};`, (err, res) => {
		if (res) {
			dbConn.query(`SELECT * FROM year_of_fees WHERE year_of_fees_id=${id};`, (err, res) => {
               let fees_response = res[0];
			   let fee_amount = fees_response.fee_amount;
			   let fee_master_id = fees_response.fee_master_id;
			//    console.log(fee_amount);
			   if(res){
				   dbConn.query(`Select * from student_payment_infos WHERE year_of_fees_id=${id};`,(err, res) =>{
					if (res && res.length > 0) {
						res.forEach((element) => {
							let amoumt = Number(fee_amount)-Number(element.amount_paid);
							console.log(Number(amoumt));
							dbConn.query(`UPDATE student_payment_infos set actual_fees ="${fee_amount}",balance="${amoumt}" where fee_master_id=${fee_master_id} and student_payment_info_id=${element.student_payment_info_id}`, (err, res)=>{
								
							})
						   });
					 }
					   			 
				   }) 
			   }
			});
			// console.log("year_of_fees updated successfully");
			// console.log(res);
			result(null, { message: "Updated Succesfully", data: "Updated Succesfully" });
		} else {
			console.log("error updated data year_of_fees");
			result(null, err);
		}
	});
};

module.exports = YearOFFee;
