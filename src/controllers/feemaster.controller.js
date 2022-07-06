const FeeMasterModel = require("../models/feemaster.model");
const { Validator } = require("node-input-validator");

exports.getAllFeeMaster = (req, res) => {
    // console.log("get all Grade Section");
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
        transport_fee: "required",
        hostal_fee: "required",
        optional_fee:"required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const gradeReqData = new FeeMasterModel(req.body);
            // console.log(req.body);
            FeeMasterModel.createfeemasterModel(gradeReqData, (err, feeMaster) => {
                if (feeMaster) {
                    if(feeMaster.IsExsist == true) {
                        res.status(409).send({
                            status: false,
                            message:`feemaster already present`,
                            data: feeMaster,
                        });
                    }
                    else if(feeMaster.IsExsist == false){
                        res.status(201).send({
                            status: true,
                            message:`feemaster inserted`,
                            data: feeMaster,
                        });
                    }
                   
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};

exports.deletefeemaster = (req, res) => {
    // console.log("delete feemaster");
    // console.log(req.body);
    FeeMasterModel.deletefeemasterModel(req.body, (err, feemaster) => {
        // console.log("controller feemaster");
        if (feemaster) {
            if(feemaster.isDeletable == true){
                res.status(200).send({
                    status: true,
                    message:"feemaster deleted"
                })
            }else if (feemaster.isDeletable == false){
                res.status(409).send({
                    message:"year of fee bind the data"
                })
            }
            
        } else {
            res.status(500).send(err);
        }
    });
};
exports.updatefeemaster = (req, res) => {
    FeeMasterModel.updatefeemastermodel(req.params.id, req.body, (err, updatefeemaster) => {
        if (updatefeemaster) {
            res.status(200).send({
                status: true,
                message: "Update Sucessfully",
                data: updatefeemaster,
            });
        } else {
            res.status(500).send(err);
        }
    });
};
