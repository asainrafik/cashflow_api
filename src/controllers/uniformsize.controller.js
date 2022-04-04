const UniformsizeModel = require("../models/uniformsize.model");
const { Validator } = require("node-input-validator");

exports.getuniform = (req, res) => {
    UniformsizeModel.getRoomno((err, room) => {
        if (room) {
            let roomData = room;
            res.status(200).send({ status: true, message: "Uniform data fetched successfully \u{1F389} \u{1F389}", data: roomData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createuniform = (req, res) => {
    const v = new Validator(req.body, {
        size_name: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const uniformReqData = new UniformsizeModel(req.body);
            UniformsizeModel.createuniform(uniformReqData, (err, uniform) => {
                if (uniform) {
                    res.status(200).send({
                        status: true,
                        message: uniform.IsExsist ? `uniformsize already present \u{26D4} \u{26D4}` : `uniformsize inserted \u{1F973} \u{1F973}`,
                        data: uniform,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};

exports.deleteuniform = (req, res) => {
    
    UniformsizeModel.deletesizemodel(req.body, (err, size) => {
        if (size) {
            res.status(200).send({
                status: true,
                message: size.isDeletable ? "Size deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: size.data },
                data: { isDeletable: size.isDeletable },
            });
           
        } else {
            res.status(500).send(err);
        }
    });
};
