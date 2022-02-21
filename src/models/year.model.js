var dbConn = require("../../config/db.config");

var Year = function (year) {
    this.academic_year = year.academic_year;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Year.getAllYearModel = (result) => {
    dbConn.query("SELECT * FROM years", (err, res) => {
        if (res) {
            console.log("year fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

Year.createYear = (yearReqData, result) => {
    dbConn.query(`SELECT * FROM years WHERE academic_year ="${yearReqData.academic_year}"`, (err, res) => {
        if (res) {
            console.log("year fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                dbConn.query("INSERT into years SET ?", yearReqData, (err, res) => {
                    if (err) {
                        console.log("error inserting data year");
                        result(null, err);
                    } else {
                        console.log("year inserted successfully");
                        console.log(res);
                        result(null, res);
                    }
                });
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

Year.deleteAcademicYear = (yearReqData, result) => {
    dbConn.query(`SELECT * FROM grade_section WHERE academic_year_id =${yearReqData.year_id}`, (err, res) => {
        if (res) {
            console.log("year fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { isDeletable: false, data: res });
            } else {
                let yearToFind = { year_id: yearReqData.year_id };
                dbConn.query("DELETE FROM years WHERE ?", yearToFind, (err, res) => {
                    if (res) {
                        console.log("year deleted successfully");
                        console.log(res);
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        console.log("error inserting data year");
                        result(null, err);
                    }
                });
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
    //result(null,"data is up")
};

module.exports = Year;
