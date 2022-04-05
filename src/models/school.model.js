var dbConn = require("../../config/db.config");

var School = function (school) {
    this.school_name = school.school_name;
    this.address = school.address;
    this.branch = school.branch;
    this.months_start = school.months_start;
    this.months_end = school.months_end;
};

School.schoolcreatemodel = (schoolReqData, result) => {
    console.log(schoolReqData,"asss")
    dbConn.query(`SELECT * FROM school WHERE school_name ="${schoolReqData.school_name}"`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { IsExsist: true ,duplication: res});
            } else {
                  let schools = {
                    school_name:schoolReqData.school_name,
                    address:schoolReqData.address,
                    branch:schoolReqData.branch,
                    months_start:schoolReqData.months_start,
                    months_end:schoolReqData.months_end
                  };
                    dbConn.query("INSERT into school SET ?",schools, (err, res) => {
                        if (err) {
                            console.log("error inserting data school");
                            result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                        } else {
                            console.log("school inserted successfully");
                            console.log(res);
                            result(null, { IsExsist: false, data: res });
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
