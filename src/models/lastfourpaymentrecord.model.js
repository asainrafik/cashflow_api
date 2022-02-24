var dbConn = require("../../config/db.config");

var lastfourpaymentrecord = function (year) {
    this.academic_year = year.academic_year;
    this.created_at = new Date();
    this.updated_at = new Date();
};

lastfourpaymentrecord.getlastfourpaymentrecordModel = (result) => {
    dbConn.query("SELECT * FROM years", (err, res) => {
        if (err) {
            console.log("error fetching data year");
            result(null, err);
        } else {
            console.log("year fetched successfully");
            console.log(res);
            result(null, res);
        }
    });
};

module.exports = lastfourpaymentrecord;