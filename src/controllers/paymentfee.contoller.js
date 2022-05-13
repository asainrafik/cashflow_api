//get all year
const paymentfee = require("../models/paymentfee.model");
const { Validator } = require("node-input-validator");

exports.getpaymentlist = (req, res) => {
    const v = new Validator(req.body, {
        student_id: "required",
        year_id:"required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const PaymentReqData = new paymentfee(req.body);
            paymentfee.getPaymentModel(PaymentReqData, (err, Payment) => {
                if (Payment) {
                    res.status(200).send({
                        status: true,
                        message:"data fetched successfully \u{1F389} \u{1F389}",
                        data: Payment,
                    });
                } else {
                    res.status(500).send(err);

                }
            });
        }
    });
};

