const transportall = require("../models/tranportall.model");
const { Validator } = require("node-input-validator");

exports.gettransport = (req, res) => {
    transportall.gettransportModel((err, transportall) => {
        if (transportall) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: transportall });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.getfiltertransport = (req, res) => {
    const requset = req.params;
    transportall.getfiltertransportmodel(requset,(err, transportallocation) => {
        if (transportallocation) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: transportallocation });
        } else {
            res.status(400).send(err);
        }
    });
}
exports.getterms = (req, res) => {
    transportall.gettermsmodel(req.body,(err, terms) => {
        if(terms){
            res.status(200).send({ status:true,message:"data fetched successfully",data:terms});
        }else{
            res.status(400).send(err);
        }
    })
}