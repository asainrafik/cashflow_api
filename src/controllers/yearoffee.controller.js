const YearOFFeeModel = require("../models/yearoffee.model");
const { Validator } = require("node-input-validator");

exports.getAllYearOFFee = (req, res) => {
    const v = new Validator(req.body, {
        grade_id: "required|integer",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const yearOfFeeReqData = new YearOFFeeModel(req.body);
            console.log("get all year of fee");
            YearOFFeeModel.getAllYearOFFeeModel(yearOfFeeReqData, (err, YearOFFee) => {
                if (YearOFFee) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: YearOFFee });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
        }
    });
};

exports.createNewYearOFFee = (req, res) => {
    const v = new Validator(req.body, {
        grade_id: "required|integer",
        fee_amount: "required",
        fee_master_id: "required|integer",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            // const yearOfFeeReqData = new YearOFFeeModel(req.body);
            // console.log(req.body,"ssss");
            YearOFFeeModel.createYearOFFeeModel(req.body, (err, YearOFFee) => {
                if (YearOFFee) {
                    res.status(200).send({
                        status: true,
                        message:
                            YearOFFee.IsExsist == "error"
                                ? "Cannot Create Year of fee"
                                : YearOFFee.IsExsist
                                ? `Year of Fee already present`
                                : `Year of Fee inserted`,
                        data: YearOFFee,
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};

exports.deleteYearOFFee = (req, res) => {
    console.log("delete YearOFFee");
    console.log(req.body);
    YearOFFeeModel.deleteYearOFFeeModel(req.body, (err, YearOFFee) => {
        console.log("controller YearOFFee");
        if (YearOFFee) {
            res.status(200).send({
                status: true,
                message: YearOFFee.isDeletable ? "YearOFFee deleted" : { dataExsists: YearOFFee.data },
                data: { isDeletable: YearOFFee.isDeletable },
            });
        } else {
            res.status(500).send(err);
        }
    });
};

exports.UpdateYearOFFee = (req, res) => {
    // console.log("Update feemaster");
    // console.log(req.body);
    // console.log(req.params.id);
    YearOFFeeModel.updateYearOFFeeModel(req.params.id, req.body, (err, yearOfFee) => {
        // console.log("controller feemaster");
        // console.log(yearOfFee);
        if (yearOfFee) {
            res.status(200).send({
                status: true,
                message:
                yearOfFee.IsExsist == "error"
                    ? "Cannot Create Year of fee"
                    : yearOfFee.IsExsist
                    ? `Year of Fee already Insert Data`
                    : `Year of Fee updated`,
            data: yearOfFee,
            });
        } else {
            res.status(500).send(err);
        }
    });
};
