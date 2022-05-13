
const gradeModel = require("../models/gradeMaster.model");


exports.gerAllGradeMaster = (req, res) => {
    gradeModel.getAllgradeModel((err, data_res) => {
        if (data_res) {
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: data_res });
        } else {
            res.status(400).send(err);
        }
    });
};