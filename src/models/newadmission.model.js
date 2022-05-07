var dbConn = require("../../config/db.config");

var NewAdmission = function (newadmission) {
    this.student_admissions_id = newadmission.student_admissions_id;
    this.student_name = newadmission.student_name;
    this.DOB = newadmission.DOB;
    this.gender = newadmission.gender;
    this.email = newadmission.email;
    this.admission_date = newadmission.admission_date;
    this.grade_id = newadmission.grade_id;
    this.previous_school_info = newadmission.previous_school_info;
    this.father_name = newadmission.father_name;
    this.father_occupation = newadmission.father_occupation;
    this.address = newadmission.address;
    this.phone_number = newadmission.phone_number;
    this.alt_phone_number = newadmission.alt_phone_number;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.stu_code = newadmission.stu_code;
    this.student_id = newadmission.student_id;
    this.status = newadmission.status;
    this.admission_no = newadmission.admission_no;
    this.grade_section_id = newadmission.grade_section_id;
    this.year_id = newadmission.year_id;
    this.from_grade = newadmission.from_grade;
};

NewAdmission.getNewAdmissionModel = (newRequestBody, result) => {
    dbConn.query(`select * from student_admissions where admission_no="${newRequestBody.admission_no}";`, (err, res) => {
        if (res.length > 0) {
            result(null, { IsExsist: true, duplication: res });
        } else {
            dbConn.query(
                `select * from year_of_fees
            left join terms_year_of_fees on
                year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${newRequestBody.grade_id} and year_of_fees.year_id=${newRequestBody.year_id} and year_of_fees.optional_fee=false;`,
                (err, res) => {
                    if (res.length > 0) {
            let stucode = "MVM";
            let studentcodeid = new Date().getFullYear() + newRequestBody.admission_no;
            let studentstatus = "Active";
            let post = {
                student_name: newRequestBody.student_name,
                DOB: newRequestBody.DOB,
                gender: newRequestBody.gender,
                email: newRequestBody.email,
                from_grade: newRequestBody.from_grade,
                admission_date: newRequestBody.admission_date,
                grade_section_id: newRequestBody.grade_section_id,
                grade_id: newRequestBody.grade_id,
                year_id: newRequestBody.year_id,
                previous_school_info: newRequestBody.previous_school_info,
                father_name: newRequestBody.father_name,
                father_occupation: newRequestBody.father_occupation,
                address: newRequestBody.address,
                phone_number: newRequestBody.phone_number,
                alt_phone_number: newRequestBody.alt_phone_number,
                student_id: studentcodeid,
                admission_no: newRequestBody.admission_no,
                status: studentstatus,
                stu_code: stucode,
                created_at: new Date(),
                updated_at: new Date(),
            };
            // console.log(post);
            dbConn.query("INSERT into student_admissions SET ?", post, (err, res) => {
                if (res) {
                    dbConn.query(`SELECT * FROM student_admissions where student_id="${studentcodeid}"`, (err, res) => {
                        let studentaaa = res[0];

                        //let studentid = studentaaa.student_admissions_id;
                        // let to_gradesection_id = studentaaa.grade_section_id;

                        let studentid = studentaaa.student_admissions_id;
                        // let to_gradesection_id = studentaaa.grade_id;

                        let studentId = studentcodeid;
                        if (res) {
                            let allocations = {
                                student_admissions_id: studentaaa.student_admissions_id,
                                student_id: studentId,
                                from_grade_id: newRequestBody.from_grade,
                                grade_section_id: newRequestBody.grade_section_id,
                                grade_id: newRequestBody.grade_id,
                                year_id: newRequestBody.year_id,
                                mode_of_transport:"Self",
                                mode_of_transport_allocation:0,
                                mode_of_transport_touched:0,
                                created_at: new Date(),
                                updated_at: new Date(),
                            };
                            console.log("student_allocations", allocations);
                            dbConn.query("INSERT into student_allocations SET ?", allocations, (err, res) => {
                                if (res) {
                                    dbConn.query(`SELECT * FROM student_allocations where student_id="${studentcodeid}"`, (err, res) => {
                                        let studentall_response = res[0];
                                        let student_admissions_id = studentall_response.student_admissions_id;
                                        let student_id = studentall_response.student_id;
                                        let grade_id = studentall_response.grade_id;
                                        let year_id = studentall_response.year_id;
                                        if (res) {
                                            dbConn.query(
                                                `select * from year_of_fees
                                            left join terms_year_of_fees on
                                                year_of_fees.year_of_fees_id = terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${grade_id} and year_of_fees.year_id=${year_id} and year_of_fees.optional_fee=false;`,
                                                (err, res) => {
                                                    console.log(res, "sdds");
                                                    if (res && res.length > 0) {
                                                        // console.log(res);
                                                        res.map((ele) => {
                                                            console.log(ele.optional_fee, "Year Of Fees ID");
                                                            //  function aa(){
                                                            //     if(ele.term_amount == null){
                                                            //       return balance = ele.fee_amount
                                                            //     }else{
                                                            //         return balance = ele.term_amount
                                                            //     }
                                                            //  }   
                                                            //  let balanceterm = aa();
                                                            //  console.log(balanceterm,"ssd");
                                                                let paymentinfo = {
                                                                    student_admissions_id:studentid,
                                                                    payment_date: 0,
                                                                    actual_fees: ele.fee_amount,
                                                                    amount_paid: 0,
                                                                    payment_mode: null,
                                                                    comments: null,
                                                                    created_at: new Date(),
                                                                    updated_at: new Date(),
                                                                    year_of_fees_id: ele.year_of_fees_id,
                                                                    student_id: studentId,
                                                                    fee_master_id: ele.fee_master_id,
                                                                    refund: 0,
                                                                    cum_amt: 0,
                                                                    balance:ele.term_amount,
                                                                    grade_id:newRequestBody.grade_id,
                                                                    year_id: newRequestBody.year_id,
                                                                    discount_amount: 0,
                                                                    dis_feetype_id: 0,
                                                                    section_id: newRequestBody.grade_section_id,
                                                                    term_name: ele.term_name,
                                                                    term_amount: ele.term_amount,
                                                                    optional_fees:0,
                                                                    terms_months: ele.terms_months,
                                                                    terms_id:ele.terms_id,
                                                                    checked_status:true
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
                                                  
                                                    } else {
                                                        console.log("Please fill The Year of Fee");
                                                    }
                                                }
                                            );
                                        }
                                    });
                                    let finaldata = {
                                        id: studentid,
                                        ...newRequestBody,
                                    };
                                    result(null, { IsExsist: false, data: finaldata });
                                } else {
                                    console.log("error inserting data NewAdmission");
                                    result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                                }
                            });
                        }
                    });
                } else {
                    result(null, err);
                }
            });
        }else {
            result(null, { IsExsist: "year", data: "Please fill The Year of Fee \u{26D4} \u{26D4}" });
        }
    });
}
});
};

module.exports = NewAdmission;
