const { getLoginModule } = require("../models/login.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { sign } = require("jsonwebtoken");
var dbConn = require("../../config/db.config");

exports.login = (req, res) => {
    const body = req.body;
    getLoginModule(body.email, (err, results) => {
        if (err) {
            console.log(err);
        }
        if (!results) {
            return res.json({
                success: 0,
                data: "Invaild email or password",
            });
        }
        let passwordd = results.password;
        let needresult = () => {
            bcrypt.compare(body.password, `${passwordd}`, function (err, result) {
                if (result) {
                    results.password = undefined;
                    const jsontoken = sign({ result: results }, "qwe1234", {
                        expiresIn: "1h",
                    });
                    return res.json({
                        success: 1,
                        message: "Login successfully",
                        token: jsontoken,
                    });
                } else {
                    return res.json({
                        success: 0,
                        data: "Invaild email or password",
                    });
                }
            });
        };
        needresult();

    });
};
