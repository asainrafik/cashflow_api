const lastFour = require('../models/lastfourpaymentrecord.model');
const { Validator } = require("node-input-validator");

exports.getLastFourRecordRoute = (req, res) => {
    const v = new Validator(req.body, {
        student_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            lastFour.getlastfourpaymentrecordModel(req.body, (err, dataVal) => {
                if (dataVal) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: dataVal });
                } else {
                    res.status(400).send(err);
                }
            });
        }
    });

};

exports.getStubal = (req, res) => {
    const v = new Validator(req.body, {
        student_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            lastFour.getStuBalModel(req.body, (err, dataVal) => {
                if (dataVal) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: dataVal });
                } else {
                    res.status(400).send(err);
                }
            });
        }
    });

};