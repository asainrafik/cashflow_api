const modeoftranportModel = require("../models/modeoftransport.model");
const { Validator } = require("node-input-validator");

exports.getFeemaster = (req, res) =>{
    modeoftranportModel.getFeemasterModel((err,getfeemaster) =>{
        if(getfeemaster){
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: getfeemaster });
        } else {
            res.status(400).send(err);
        }
    })
}

exports.postmodeoftranport = (req, res) => {
    let tempArr = [];
    //  console.log(req.body,"dd")
        if (req.body && req.body.transport == true) {
            tempArr.push(req.body);
        } else if (req.body && req.body.Hostal == true) {
            tempArr.push(req.body);
        }

    //   console.log(tempArr);
    if (tempArr[0].transport && tempArr[0].transport == true) {
        //  console.log(req.body,"Data")
        modeoftranportModel.insertransportModel(req.body, (err, data) => {
            if (data) {
                res.status(200).send({
                    status: true,
                    message: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } else if (tempArr[0].Hostal && tempArr[0].Hostal == true) {
        modeoftranportModel.inserthostelModel(req.body, (err, data) => {
            if (data) {
                res.status(200).send({
                    status: true,
                    message: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } else {
        res.status(500).send(req.body);
    }
};
