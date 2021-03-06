var dbConn = require("../../config/db.config");

var School = function (school) {
    this.school_name = school.school_name;
    this.address = school.address;
    this.branch = school.branch;
    this.term_count = school.term_count;
    this.one_time = school.one_time;
    this.optional_term_count = school.optional_term_count;
};
School.getschoolmodel = (result) => {
    dbConn.query(`select school_name,address,branch,term_count,one_time,optional_term_count from school where one_time=false;`, (err, res) => {
        if (res) {
            const temp = [];
            res.forEach((term) => {
                let term_count = parseInt(term.term_count);
                let optional_term_count = parseInt(term.optional_term_count);
                let school_name = term.school_name;
                let address = term.address;
                let branch = term.branch;
                let one_time = term.one_time;
                let obj = { term_count, optional_term_count };
                const vals = Object.values(obj);
                const max_count = Math.max(...vals);
                let final = { school_name, address, branch, one_time, term_count, optional_term_count, max_count };
                temp.push(final);
            });
            console.log(temp);
            result(null, temp);
        }
    });
};

School.schoolcreatemodel = (schoolReqData, result) => {
    console.log(schoolReqData, "asss");
    dbConn.query(`SELECT * FROM school WHERE school_name ="${schoolReqData.school_name}"`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                let schools = {
                    school_name: schoolReqData.school_name,
                    address: schoolReqData.address,
                    branch: schoolReqData.branch,
                    months_start: "Apr",
                    months_end: "Mar",
                    term_count: schoolReqData.term_count,
                    one_time: schoolReqData.one_time,
                    optional_term_count: schoolReqData.optional_term_count,
                };
                dbConn.query("INSERT into school SET ?", schools, (err, res) => {
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
