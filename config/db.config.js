const mysql = require("mysql");

const dbConn = mysql.createConnection({
    host:5000,
    port:3306,
    user: "cashflow",
    password: "root",
    database: "cashflow_empty_db",
});

dbConn.connect(function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});

module.exports = dbConn;
