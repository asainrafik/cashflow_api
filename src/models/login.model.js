var dbConn = require("../../config/db.config");


module.exports = {
    getLoginModule : (email,callBack) => {
        dbConn.query("SELECT * FROM users where email =? ",[email], (error, results) => {
            if (error) {
                callBack(error);
            } else {
                callBack(null, results[0]);
            }
        });
    }
 }
    
