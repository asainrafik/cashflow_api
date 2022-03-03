const studentBalanceModel = require("../models/studentBalance.model");
const { Validator } = require("node-input-validator");

exports.updateStudentBalance = (req, res) => {
    let tempArr = [];
    console.log(req.body,"dd")

    req.body.data.forEach((element) => {
        if (element && element.Sendbalance == true) {
            tempArr.push(element);
        } else if (element && element.Sendrefund == true) {
            tempArr.push(element);
        }
    });
    console.log(tempArr);
    if (tempArr[0].Sendbalance && tempArr[0].Sendbalance == true) {
        console.log(req.body.data,"Data")
        studentBalanceModel.updateStudentWithBalanceFeeModel(req.body.data, (err, data) => {
            if (data) {
                res.status(200).send({
                    status: true,
                    message: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } else if (tempArr[0].Sendrefund && tempArr[0].Sendrefund == true) {
        studentBalanceModel.updateStudentWithRefundFeeModel(req.body.data, (err, data) => {
            if (data) {
                res.status(200).send({
                    status: true,
                    message: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } 
    else {
        res.status(500).send(req.body);
    }
};
