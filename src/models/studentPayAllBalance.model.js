var dbConn = require("../../config/db.config");

var studentBalanceAllBalance =  function (balance) {
    this.section_id=balance.section_id,
    this.year_id=balance.year_id
}

//Get Student Balance
studentBalanceAllBalance.getStudentPaymentDetailsModel = (data,result) => {
    dbConn.query(`SELECT * FROM student_payment_record where student_id="${data.student_id}" AND year_id=${data.year_id};`, (err, res) => {
        if (res) {
            console.log("data fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

//Get Student Balance 4 payment
studentBalanceAllBalance.getStudentfourPaymentDetailsModel = (data,result) => {
    dbConn.query(`SELECT * FROM student_payment_record where student_id="${data.student_id}" AND year_id=${data.year_id} ORDER BY payment_transcation_id DESC LIMIT 4 `, (err, res) => {
        if (res) {
            console.log("data fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};


module.exports = studentBalanceAllBalance;