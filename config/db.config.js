const mysql = require("mysql");

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: "root",
    password: "nith@1930M",
    database: "cashflow_feb26",
});

dbConn.connect(function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("db connected");
    }
});

module.exports = dbConn;
