var dbConn = require("../../config/db.config");

var lastfourpaymentrecord = function (year) {
    this.academic_year = year.academic_year;
    this.created_at = new Date();
    this.updated_at = new Date();
};

lastfourpaymentrecord.getlastfourpaymentrecordModel = (req, result) => {
    // console.log(`select * from student_payment_infos where student_id="${req.student_id}" ORDER BY updated_at DESC LIMIT 4`)
    dbConn.query(
        `select * from student_payment_infos where student_id="${req.student_id}" ORDER BY updated_at DESC LIMIT 4
    `,
        (err, res) => {
            if (err) {
                console.log("error fetching data year");
                result(null, err);
            } else {
                console.log("year fetched successfully");
                console.log(res);
                result(null, res);
            }
        }
    );
};

lastfourpaymentrecord.getStuBalModel = (req, result) => {
    // console.log(`select * from student_payment_infos where student_id="${req.student_id}" ORDER BY updated_at DESC LIMIT 4`)
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_section ON grade_section.grade_section_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=grade_section.academic_year_id WHERE CONCAT(student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,grade_section.grade,grade_section.section,years.academic_year) LIKE "%${req.student_id}%"`,
        (err, res) => {
            if (res) {
                console.log("year fetched successfully");
                let academic_yearArr = [];
                res.forEach((element) => {
                    academic_yearArr.push(element.student_admissions_id);
                });
                let uniqueTempArr = [...new Set(academic_yearArr)];
                //   console.log(uniqueTempArr);

                const ids = res.map((o) => o.academic_year_id);
                const filtered = res.filter(({ academic_year_id }, index) => !ids.includes(academic_year_id, index + 1));

                let identicaladmissionId = [];
                uniqueTempArr.forEach((uniq) => {
                    if (uniq != null) {
                        let idArr = [{ student_admission_id: uniq }];
                        filtered.forEach((uqyearid) => {
                            if (uqyearid.academic_year != null) {
                                let FilterByYear = uqyearid.academic_year;
                                var newFilterYear = [{ academic_year: FilterByYear }];
                                res.forEach((resalldata) => {
                                    if (uqyearid.year_id == resalldata.year_id) {
                                        if (uniq == resalldata.student_admissions_id) {
                                            newFilterYear.push({ studentData: resalldata });
                                        }
                                    }
                                });
                                let balance = 0;
                                newFilterYear.forEach((addBalance) => {
                                    // console.log(newFilterYear)
                                    if (addBalance.studentData) {
                                        balance = Number(addBalance.studentData.balance) + balance;
                                    }
                                });
                                console.log(balance);
                                newFilterYear.push({ balance: balance });
                                idArr.push(newFilterYear);
                            }
                        });

                        // res.forEach((resalldata) => {
                        //     if(uniq == resalldata.student_admissions_id){
                        //         uniqueTempArrYearId.forEach(uqyearid => {
                        //             if(uqyearid == resalldata.year_id){
                        //                 newFilterYear.push({studentData:resalldata})
                        //             }
                        //         });
                        //         idArr.push(newFilterYear)
                        //     }
                        // });
                        identicaladmissionId.push(idArr);
                    }
                });
                // console.log(res)
                // if(res){
                //     res.filter(res => {
                //         return(JSON.stringify(res).toLocaleLowerCase()).match(y.toLocaleLowerCase());
                // });
                // }
                result(null, identicaladmissionId);
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

module.exports = lastfourpaymentrecord;
