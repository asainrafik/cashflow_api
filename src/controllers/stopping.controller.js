const StoppingModel = require("../models/stopping.model");
const { Validator } = require("node-input-validator");

exports.getstopping = (req, res) => {
        StoppingModel.getstopingmodel((err, Stopping) => {
                if (Stopping) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: Stopping });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
};

exports.createstopping = (req, res) => {
    const v = new Validator(req.body, {
        places_id: "required",
        stopping: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            StoppingModel.createstoppingModel(req.body, (err, StoppingFee) => {
                if (StoppingFee) {
                    res.status(200).send({
                        status: true,
                        message:
                        StoppingFee.IsExsist == "error"
                                ? "Cannot Create StoppingFee \u{1F6AB}"
                                : StoppingFee.IsExsist
                                ? `StoppingFee already present \u{26D4} \u{26D4}`
                                : `StoppingFee inserted \u{1F973} \u{1F973}`,
                        data: StoppingFee,
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};

exports.deletestopping = (req, res) => { 
    StoppingModel.deletestoppingmodel(req.body, (err, stopping) => {
        if (stopping) {
            res.status(200).send({
                status: true,
                message: stopping.isDeletable ? "stopping deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: stopping.data },
                data: { isDeletable: stopping.isDeletable },
            });
        } else {
            res.status(500).send(err);
        }
    });
};