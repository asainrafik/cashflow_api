const mysql = require("mysql");

const dbConn = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "root",
    database: "cashflow",
});

dbConn.connect(function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});

module.exports = dbConn;
