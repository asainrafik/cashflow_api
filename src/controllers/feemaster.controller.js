const FeeMasterModel = require("../models/feemaster.model");
 const { Validator } = require("node-input-validator");

exports.getAllFeeMaster = (req, res) => {
    console.log("get all Grade Section");
    FeeMasterModel.getAllfeemasterModel((err, feeMaster) => {
        if (feeMaster) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: feeMaster });
        } else {
            res.status(500).send({ status: false, message: err });
        }
    });
};

exports.createNewGradeSection = (req, res) => {
    const v = new Validator(req.body, {
        fee_type_name: "required",
        order_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const gradeReqData = new FeeMasterModel(req.body);
            console.log(req.body);
            FeeMasterModel.createfeemasterModel(gradeReqData, (err, feeMaster) => {
                if (feeMaster) {
                    res.status(200).send({
                        status: true,
                        message: feeMaster.IsExsist ? `feemaster already present \u{26D4} \u{26D4}` : `feemaster inserted \u{1F973} \u{1F973}`,
                        data: feeMaster,
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};

exports.deletefeemaster = (req, res) => {
    console.log("delete feemaster");
    console.log(req.body);
    FeeMasterModel.deletefeemasterModel(req.body, (err, feemaster) => {
        console.log("controller feemaster");
        if (feemaster) {
            res.status(200).send({
                status: true,
                message: feemaster.isDeletable ? "feemaster deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: feemaster.data.res[0] },
                data: { isDeletable: feemaster.isDeletable },
            });
        } else {
            res.status(500).send(err);
        }
    });
};