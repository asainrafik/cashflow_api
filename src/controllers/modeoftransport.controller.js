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

exports.getHostalFeemaster = (req, res) =>{
    modeoftranportModel.getHostalModel((err,gethostal) =>{
        if(gethostal){
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: gethostal });
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
        } else if (req.body && req.body.Self == true) {
            tempArr.push(req.body);
        }

    //   console.log(tempArr);
    if (tempArr[0].transport && tempArr[0].transport == true) {
        //  console.log(req.body,"Data")
        modeoftranportModel.insertransportModel(req.body, (err, data) => {
            if (data) {
                res.status(200).send({
                    status: true, 
                    message:
                    data.IsExsist == "year" ? "Please Fill The Year of fee" :
                    data.IsExsist == "error"
                    ? "Cannot Create insert mode of transport \u{1F6AB}"
                    : data.IsExsist
                    ? `mode of transport already present \u{26D4} \u{26D4}`
                    : `mode of transport inserted \u{1F973} \u{1F973}`,
                    data: data,
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
                    
                    message: data.IsExsist == "year" ? "Please Fill The Year of fee" :
                     data.IsExsist == "error"
                    ? "Cannot Create insert mode of transport \u{1F6AB}"
                    : data.IsExsist
                    ? `mode of transport already present \u{26D4} \u{26D4}`
                    : `mode of transport inserted \u{1F973} \u{1F973}`,
                    data: data,
                });
            } else {
                res.status(500).send(err);
            }
        });
    } else if (tempArr[0].Self && tempArr[0].Self == true) {
        modeoftranportModel.insertSelfmodel(req.body,(err, data) => {
            if(data){
                res.status(200).send({
                    status: true,
                    message: data.IsExsist == "error"
                    ? "Cannot Create insert mode of transport \u{1F6AB}"
                    : data.IsExsist 
                    ? `mode of transport already present \u{26D4} \u{26D4}`
                    : `mode of transport inserted \u{1F973} \u{1F973}`,data: data,
                })
            }
        })
    }
     else {
        res.status(500).send(req.body);
    }
};
