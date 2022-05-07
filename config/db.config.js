const mysql = require("mysql");

const dbConn = mysql.createPool({
    connectionLimit : 20,
    host:5000,
    port:3306,
    user: "cashflow",
    password: "root",
    database: "cashflow_api",
    debug    :  false
});

// dbConn.connect(function (error) {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("db connected");
//     }
// });

module.exports = dbConn;
