//get all year
const YearModel = require("../models/year.model");

const { Validator } = require("node-input-validator");

exports.getAllYear = (req, res) => {
    YearModel.getAllYearModel((err, years) => {
        if (years) {
            let yearsData = years;
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: yearsData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createNewYear = (req, res) => {
    const v = new Validator(req.body, {
        academic_year: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const yearReqData = new YearModel(req.body);
            YearModel.createYear(yearReqData, (err, years) => {
                if (years) {
                    res.status(200).send({
                        status: true,
                        message: years.IsExsist ? `year already present \u{26D4} \u{26D4}` : `year inserted \u{1F973} \u{1F973}`,
                        data: years,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};

exports.deleteAcademicYear = (req, res) => {
    
    YearModel.deleteAcademicYear(req.body, (err, years) => {
        if (years) {
            res.status(200).send({
                status: true,
                message: years.isDeletable ? "year deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: years.data },
                data: { isDeletable: years.isDeletable },
            });
           
        } else {
            res.status(500).send(err);
        }
    });
};
