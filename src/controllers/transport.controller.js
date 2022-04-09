const TransportModel = require("../models/transport.model");
const { Validator } = require("node-input-validator");

exports.gettransport = (req, res) => {
            TransportModel.gettransportmodel((err, transport) => {
                if (transport) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: transport });
                } else {
                    res.status(500).send({ status: false, message: err });
                }
            });
};

exports.createtransport = (req, res) => {
    const v = new Validator(req.body, {
        places_id: "required",
        year_id: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            TransportModel.createtransportModel(req.body, (err, transportfee) => {
                if (transportfee) {
                    res.status(200).send({
                        status: true,
                        message:
                        transportfee.IsExsist == "error"
                                ? "Cannot Create TransportFee \u{1F6AB}"
                                : transportfee.IsExsist
                                ? `TransportFee already present \u{26D4} \u{26D4}`
                                : `TransportFee inserted \u{1F973} \u{1F973}`,
                        data: transportfee,
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
};

exports.deletetransport = (req, res) => { 
    TransportModel.deletetransportmodel(req.body, (err, transport) => {
        if (transport) {
            res.status(200).send({
                status: true,
                message: transport.isDeletable ? "transport deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: transport.data },
                data: { isDeletable: transport.isDeletable },
            });
        } else {
            res.status(500).send(err);
        }
    });
};

// exports.UpdateYearOFFee = (req, res) => {
//     // console.log("Update feemaster");
//     // console.log(req.body);
//     // console.log(req.params.id);
//     YearOFFeeModel.updateYearOFFeeModel(req.params.id, req.body, (err, yearOfFee) => {
//         // console.log("controller feemaster");
//         // console.log(yearOfFee);
//         if (yearOfFee) {
//             res.status(200).send({
//                 status: true,
//                 message: "YearOFFee update \u{1F389} \u{1F389}",
//                 data: yearOfFee.data,
//             });
//         } else {
//             res.status(500).send(err);
//         }
//     });
// };
