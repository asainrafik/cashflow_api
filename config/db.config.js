const mysql = require("mysql2");

const dbConn = mysql.createPool({
    connectionLimit: 20,
    host: 5000,
    port: 3306,
    user: "root",
    password: "password",
    database: "cashflow_test",
    debug: false,
});

// dbConn.connect(function (error) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("db connected");
//     }
// });

module.exports = dbConn;
