const studentBalanceModel = require("../models/studentBalance.model");
const { Validator } = require("node-input-validator");

exports.updateStudentBalance = (req, res) => {
    let tempArr = [];
    req.body.forEach((element) => {
        if (element && element.balance == true) {
            tempArr.push(element);
        } else if (element && element.refund == true) {
            tempArr.push(element.refund);
        }
    });
    console.log(tempArr);
    if (tempArr[0].balance && tempArr[0].balance == true) {
        studentBalanceModel.updateStudentWithBalanceFeeModel(req.body, (err, data) => {
            if (data) {
                res.status(200).send({
                    status: true,
                    message: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } else if (tempArr[0].refund && tempArr[0].refund == true) {
        studentBalanceModel.updateStudentWithRefundFeeModel(req.body, (err, years) => {
            if (years) {
                res.status(200).send({
                    status: true,
                    message: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } 
    // else {
    //     res.status(500).send("failed");
    // }
};
