const studentBalanceAllBalance = require("../models/studentPayAllBalance.model")
const { Validator } = require("node-input-validator");

exports.studentBalance = (req, res) => {
    studentBalanceAllBalance.getStudentPaymentDetailsModel(req.body, (err, resdata) => {
        if (resdata) {
            res.status(200).send({
                status: true,
                message: "success",
                data: resdata,
            });
           
        } else {
            res.status(500).send(err);  
        }
    });
};

exports.studentFourBalance = (req, res) => {
    studentBalanceAllBalance.getStudentfourPaymentDetailsModel(req.body, (err, resdata) => {
        if (resdata) {
            res.status(200).send({
                status: true,
                message: "success",
                data: resdata,
            });
           
        } else {
            res.status(500).send(err);  
        }
    });
};



