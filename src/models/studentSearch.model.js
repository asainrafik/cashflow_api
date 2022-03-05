var dbConn = require("../../config/db.config");

var studentSearch = function () {
    this.student_admissions_id = student_admissions_id;
    this.student_name = student_name;
    this.DOB = DOB;
    this.gender = gender;
    this.email = email;
    this.admission_date = admission_date;
    this.grade_id = grade_id;
    this.previous_school_info = previous_school_info;
    this.father_name = father_name;
    this.father_occupation = father_occupation;
    this.address = address;
    this.phone_number = phone_number;
    this.alt_phone_number = alt_phone_number;
    this.student_id = student_id;
    this.status = status;
    this.admission_no = admission_no;
};

// SELECT * FROM student_admissions WHERE CONCAT(student_admissions_id, student_name, DOB, gender, email, admission_date, academic_year, grade_id, section, previous_school_info, father_name, father_occupation, address, phone_number, alt_phone_number,student_id, status, admission_no) LIKE '%99651%';
// SELECT * FROM student_admissions LEFT JOIN grade_section ON grade_section.grade_section_id = student_admissions.grade_id LEFT JOIN years ON years.year_id = grade_section.academic_year_id WHERE CONCAT(student_admissions.student_name,years.academic_year) LIKE "%2023%";
studentSearch.getautoSearchModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN grade_master ON grade_master.grade_master_id = student_admissions.grade_id 
LEFT JOIN years ON years.year_id = student_admissions.year_id WHERE CONCAT(student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,student_admissions.phone_number,student_admissions.alt_phone_number) LIKE "%${textsearch.search}%"`,

        (err, res) => {
            if (res) {
                console.log("year fetched successfully");
                console.log(res);
                result(null, res);
            } else {
                console.log("error fetching data year");
                result(null, err);
            }
        }
    );
};

// studentSearch.getParticularStudentDetailsModel = (textsearch, result) => {
//     dbConn.query(
//         `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_section ON grade_section.grade_section_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=grade_section.academic_year_id WHERE CONCAT(student_admissions.phone_number,student_admissions.alt_phone_number,student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,grade_section.grade,grade_section.section,years.academic_year) LIKE "%${textsearch.searchby}%" and years.academic_year="${textsearch.academic_year}";`,
//         (err, res) => {
//             if (res) {
//                 console.log("year fetched successfully");
//                 let academic_yearArr = [];
//                 res.forEach((element) => {
//                     academic_yearArr.push(element.student_admissions_id);
//                 });
//                 let uniqueTempArr = [...new Set(academic_yearArr)];
//                 //   console.log(uniqueTempArr);

//                 const ids = res.map((o) => o.academic_year_id);
//                 const filtered = res.filter(({ academic_year_id }, index) => !ids.includes(academic_year_id, index + 1));

//                 let identicaladmissionId = [];
//                 uniqueTempArr.forEach((uniq) => {
//                     if (uniq != null) {
//                         let idArr = [{ student_admission_id: uniq }];
//                         filtered.forEach((uqyearid) => {
//                             if (uqyearid.academic_year != null) {
//                                 let FilterByYear = uqyearid.academic_year;
//                                 var newFilterYear = [{ academic_year: FilterByYear }];
//                                 res.forEach((resalldata) => {
//                                     if (uqyearid.year_id == resalldata.year_id) {
//                                         if (uniq == resalldata.student_admissions_id) {
//                                             newFilterYear.push({ studentData: resalldata });
//                                         }
//                                     }
//                                 });
//                                 idArr.push(newFilterYear);
//                             }
//                         });

//                         // res.forEach((resalldata) => {
//                         //     if(uniq == resalldata.student_admissions_id){
//                         //         uniqueTempArrYearId.forEach(uqyearid => {
//                         //             if(uqyearid == resalldata.year_id){
//                         //                 newFilterYear.push({studentData:resalldata})
//                         //             }
//                         //         });
//                         //         idArr.push(newFilterYear)
//                         //     }
//                         // });
//                         identicaladmissionId.push(idArr);
//                     }
//                 });
//                 // console.log(res)
//                 // if(res){
//                 //     res.filter(res => {
//                 //         return(JSON.stringify(res).toLocaleLowerCase()).match(y.toLocaleLowerCase());
//                 // });
//                 // }
//                 result(null, identicaladmissionId);
//             } else {
//                 console.log("error fetching data year");
//                 result(null, err);
//             }
//         }
//     );
// };

//text year
studentSearch.getSearchBYYearStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE CONCAT(student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,grade_section.section,years.academic_year,student_admissions.phone_number,student_admissions.alt_phone_number) LIKE "%${textsearch.searchby}%" and years.academic_year="${textsearch.academic_year}";`,
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
                                let totalRefund = 0;
                                let totalpaid = 0;
                                let totalFees = 0;
                                newFilterYear.forEach((addBalance) => {
                                    // console.log(newFilterYear)
                                    if (addBalance.studentData) {
                                        balance = Number(addBalance.studentData.balance) + balance;
                                        totalRefund = Number(addBalance.studentData.refund) + totalRefund;
                                        totalpaid = Number(addBalance.studentData.refund) + totalpaid;
                                        totalFees = Number(addBalance.studentData.actual_fees) + totalFees;
                                    }
                                });
                                console.log(balance);
                                newFilterYear.push({ balance: balance },{totalRefund:totalRefund},{totalpaid:totalpaid},{totalFees:totalFees});
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

//text year grade
studentSearch.getSearchBYYearGradeStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE CONCAT(student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,grade_section.section,years.academic_year,student_admissions.phone_number,student_admissions.alt_phone_number) LIKE "%${textsearch.searchby}%" and years.academic_year="${textsearch.academic_year}" and grade_master.grade_master="${textsearch.grade}";`,
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

//text year section
studentSearch.getSearchBYYearSectionStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE CONCAT(student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,grade_section.section,years.academic_year,student_admissions.phone_number,student_admissions.alt_phone_number) LIKE "%${textsearch.searchby}%" and years.academic_year="${textsearch.academic_year}" and grade_section.section="${textsearch.section}";`,
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

//text year grade section
studentSearch.getSearchBYYearGradeSectionStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE CONCAT(student_admissions.student_name,student_admissions.student_id,student_admissions.admission_no,grade_section.section,years.academic_year,student_admissions.phone_number,student_admissions.alt_phone_number) LIKE "%${textsearch.searchby}%" and years.academic_year="${textsearch.academic_year}" and grade_master.grade_master="${textsearch.grade}" and grade_section.section="${textsearch.section}";`,
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

//year grade section
studentSearch.getYearGradeSectionStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE  years.academic_year="${textsearch.academic_year}" and grade_master.grade_master="${textsearch.grade}" and grade_section.section="${textsearch.section}";`,
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

//year grade
studentSearch.getYearGradeStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE  years.academic_year="${textsearch.academic_year}" and grade_master.grade_master="${textsearch.grade}";`,
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

//year section
studentSearch.getYearSectionStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE  years.academic_year="${textsearch.academic_year}" and grade_section.section="${textsearch.section}";`,
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

//year
studentSearch.getYearStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE  years.academic_year="${textsearch.academic_year}";`,
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

//search for all balance
studentSearch.getallBalanceStudentDetailsModel = (textsearch, result) => {
    dbConn.query(
        `SELECT * FROM student_admissions LEFT JOIN student_allocations ON student_admissions.student_admissions_id = student_allocations.student_admissions_id  LEFT JOIN student_payment_infos ON student_allocations.student_admissions_id=student_payment_infos.student_admissions_id LEFT JOIN year_of_fees ON year_of_fees.year_of_fees_id = student_payment_infos.year_of_fees_id LEFT JOIN fee_masters ON fee_masters.fee_master_id = year_of_fees.fee_master_id LEFT JOIN grade_master ON grade_master.grade_master_id=year_of_fees.grade_id LEFT JOIN years ON years.year_id=student_payment_infos.year_id LEFT JOIN grade_section ON grade_section.grade_section_id = student_allocations.grade_section_id WHERE  student_admissions.student_id="${textsearch.allbalance}";`,
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


module.exports = studentSearch;