const HostalModel = require("../models/hostalname.model");
const { Validator } = require("node-input-validator");

exports.gethostal = (req, res) => {
    HostalModel.gethostalModel((err, hostal) => {
        if (hostal) {
            let hostalData = hostal;
            res.status(200).send({ status: true, message: "Hostal data fetched successfully \u{1F389} \u{1F389}", data: hostalData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createhostal = (req, res) => {
    const v = new Validator(req.body, {
        hostel_name: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const hostalreq = new HostalModel(req.body);
            HostalModel.createhostalmodel(hostalreq, (err, hostal) => {
                if (hostal) {
                    res.status(200).send({
                        status: true,
                        message: hostal.IsExsist ? `Hostal already present \u{26D4} \u{26D4}` : `Hostal inserted \u{1F973} \u{1F973}`,
                        data: hostal,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};

exports.deletehostal = (req, res) => {
    
    HostalModel.deletehostalname(req.body, (err, hostal) => {
        if (hostal) {
            res.status(200).send({
                status: true,
                message: hostal.isDeletable ? "hostal deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: hostal.data },
                data: { isDeletable: hostal.isDeletable },
            });
           
        } else {
            res.status(500).send(err);
        }
    });
};