const hostalmodel = require("../models/hostal_allcation.model");
const { Validator } = require("node-input-validator");

exports.getallocation = (req, res) => {
    hostalmodel.getallocationModel((err, allocation) => {
        if (allocation) {
            let allocationData = allocation;
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: allocationData });
        } else {
            res.status(400).send(err);
        }
    });
};
exports.getfilterallocation = (req, res) => {
    const requset = req.params
    hostalmodel.getfilterallcotion(requset,(err, getallocation) => {
        if (getallocation) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: getallocation });
        } else {
            res.status(400).send(err);
        }
    });
};
exports.gettransport = (req, res) => {
    hostalmodel.gettransportmodel((err,transport) =>{
        if(transport) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: transport });
        }else{
            res.status(400).send(err);
        }
    })
}

exports.getfiltertransport = (req, res) => {
    const requset = req.params
    hostalmodel.getfiltertransportmodel(requset,(err, transportallocation) => {
        if (transportallocation) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: transportallocation });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.getterms = (req, res) => {
    hostalmodel.gettermsmodel(req.body,(err, terms) => {
        if(terms){
            res.status(200).send({ status:true,message:"data fetched successfully",data:terms});
        }else{
            res.status(400).send(err);
        }
    })
}