var dbConn = require("../../config/db.config");

var Grade = function (grade) {
    this.grade_master = grade.grade_master;
    this.description = grade.description;
};

Grade.getAllgradeModel = (result) => {
    dbConn.query("SELECT * FROM grade_master", (err, res) => {
        if (res) {
            console.log("grade fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
}

module.exports = Grade;