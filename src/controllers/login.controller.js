const { getLoginModule } = require("../models/login.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");
var dbConn = require("../../config/db.config");

exports.login = (req, res) => {
    const body = req.body;
    getLoginModule(body.email, (err, results) => {
        if (!results) {
            return res.status(400).json({
                success: 0,
                data: "Invaild email or password",
            });
        }else if(err){
            return res.status(500).json({
                success: 0,
                data: "Error",
            })
        }
        let passwordd = results.password;
        let needresult = () => {
            bcrypt.compare(body.password, `${passwordd}`, function (err, result) {
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({ result: results }, "qwe1234", {
                        expiresIn: "24h",
                    });
                    return res.status(200).json({
                        success: 1,
                        message: "Login successfully",
                        token: jsontoken,
                    });
                } else {
                    return res.status(400).json({
                        success: 0,
                        data: "Invaild email or password",
                    });
                }
            });
        };
        needresult();

    });
};
