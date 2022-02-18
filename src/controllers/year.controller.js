//get all year
const YearModel = require("../models/year.model");

exports.getAllYear = (req, res) => {
    console.log("get all year");
    YearModel.getAllYearModel((err, years) => {
        console.log("controller year");
        if (years) {
            let yearsData = years;
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: yearsData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createNewYear = (req, res) => {
    const yearReqData = new YearModel(req.body);
    console.log("create new year");
    console.log(req.body);
    YearModel.createYear(yearReqData, (err, years) => {
        console.log("controller year");
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send({ status: true, message: years.IsExsist ? `year already present \u{26D4} \u{26D4}` : `year inserted \u{1F973} \u{1F973}`, data: years });
        }
    });
};

exports.deleteAcademicYear = (req, res) => {
    console.log("delete year");
    console.log(req.body);
    YearModel.deleteAcademicYear(req.body, (err, years) => {
        console.log("controller year");
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ status: true, message: years.isDeletable ? "year deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: years.data[0] }, data: { isDeletable: years.isDeletable } });
        }
    });
};
