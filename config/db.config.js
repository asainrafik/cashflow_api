const mysql = require("mysql");

const dbConn = mysql.createConnection({
    host:5000,
    port:3306,
    user: "root",
    password: "nith@1930M",
    database: "cashflow_api",
});

dbConn.connect(function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});

module.exports = dbConn;
