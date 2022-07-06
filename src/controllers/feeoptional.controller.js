const optionalModel = require("../models/feeoptional.model");
const { Validator } = require("node-input-validator");

exports.getoptional = (req, res) => {
    console.log("get all Grade Section");
    optionalModel.getoptionalModel(req.body, (err, optional) => {
        if (optional) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: optional });
        } else {
            res.status(500).send({ status: false, message: err });
        }
    });
};

exports.getoptionalsearch = (req, res) => {
    if(req.body.student_id &&
        req.body.student_id.length > 0){
            const text = req.body;
            optionalModel.getoneModel(text, (err, optionalsearch)=>{
                if (optionalsearch) {
                    res.status(200).send({
                        status: true,
                        message: optionalsearch.Nodata ? "data fetched successfully \u{1F389} \u{1F389}" : "No Data Found",
                        data: optionalsearch,
                    });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            })
            console.log(req.body,"ss")
        }else{
            const text = req.body;
            optionalModel.getoptionalsearchModel(text, (err, optionalsearch) => {
                if (optionalsearch) {
                    res.status(200).send({
                        status: true,
                        message: optionalsearch.Nodata ? "data fetched successfully \u{1F389} \u{1F389}" : "No Data Found",
                        data: optionalsearch,
                    });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
        }
}


exports.createoptional = (req, res) => {
    let matched = req.body.length > 0     
    if (!matched) {
        res.status(400).send({error: "please send valid data 🚫🚫"});
    } else if(matched) {
            optionalModel.createoptionalModel(req.body, (err, option) => {
                if (option) {
                    res.status(201).send({
                        status: true,
                        message:option.IsExsist == "error"
                        ? "Cannot Create Optional"
                        : option.IsExsist
                        ? `optionalFee already present \u{26D4} \u{26D4}`
                        : `optionalFee inserted \u{1F973} \u{1F973}`,
                        data: option,
                    });

                } else {
                     res.status(500).send(err);
                }
            });
        }
};

// exports.deletefeemaster = (req, res) => {
//     console.log("delete feemaster");
//     console.log(req.body);
//     FeeMasterModel.deletefeemasterModel(req.body, (err, feemaster) => {
//         console.log("controller feemaster");
//         if (feemaster) {
//             res.status(200).send({
//                 status: true,
//                 message: feemaster.isDeletable ? "feemaster deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: feemaster.data.res[0] },
//                 data: { isDeletable: feemaster.isDeletable },
//             });
//         } else {
//             res.status(500).send(err);
//         }
//     });
// };
// exports.updatefeemaster = (req, res) => {
//     FeeMasterModel.updatefeemastermodel(req.params.id, req.body, (err, updatefeemaster) => {
//         if (updatefeemaster) {
//             res.status(200).send({
//                 status: true,
//                 message: "Update Sucessfully",
//                 data: updatefeemaster,
//             });
//         } else {
//             res.status(500).send(err);
//         }
//     });
// };
