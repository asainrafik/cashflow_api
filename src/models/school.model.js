var dbConn = require("../../config/db.config");

var School = function (school) {
    this.school_name = school.school_name;
    this.address = school.address;
    this.branch = school.branch;
    this.term_count = school.term_count;
    this.one_time = school.one_time;
};
School.getschoolmodel = (result) =>{
    dbConn.query(`select school_name,address,branch,term_count,one_time from school where one_time=false;`,(err, res) =>{
        result(null,res);
    })
}

School.schoolcreatemodel = (schoolReqData, result) => {
    console.log(schoolReqData,"asss")
    dbConn.query(`SELECT * FROM school WHERE school_name ="${schoolReqData.school_name}"`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                  let schools = {
                    school_name:schoolReqData.school_name,
                    address:schoolReqData.address,
                    branch:schoolReqData.branch,
                    months_start:schoolReqData.months_start,
                    months_end:schoolReqData.months_end,
                    term_count:schoolReqData.term_count,
                    one_time:schoolReqData.one_time,
                  };
                    dbConn.query("INSERT into school SET ?",schools, (err, res) => {
                        if (err) {
                            console.log("error inserting data school");
                            result(null, err);
                        } else {
                            console.log("school inserted successfully");
                            console.log(res);
                            result(null, res);
                        }
                    });
            }
        } else {
            console.log("error fetching data school");
            result(null, err);
        }
    });
};
module.exports = School;
