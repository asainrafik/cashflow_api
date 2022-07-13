const TransportModel = require("../models/transportfee.model");
const { Validator } = require("node-input-validator");

exports.gettranportfee = (req, res) => {
    const v = new Validator(req.body, {
        grade_id: "required|integer",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const TransportReqData = new TransportModel(req.body);
            TransportModel.getAllTransportModel(TransportReqData, (err, transportFee) => {
                if (transportFee) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: transportFee });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
        }
    });
};

exports.createTransport = (req, res) => {
    const v = new Validator(req.body, {
        grade_id: "required",
        fee_amount: "required",
        fee_master_id: "required|integer",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            TransportModel.createTransportModel(req.body, (err, Transportfee) => {
                if (Transportfee) {
                    res.status(200).send({
                        status: true,
                        message:
                            Transportfee.IsExsist == "error"
                                ? "Cannot Create Transport of fee"
                                : Transportfee.IsExsist
                                ? `Transport fee already present`
                                : `Transport fee inserted`,
                        data: Transportfee,
                    });
                }
            });
        }
    });
};
