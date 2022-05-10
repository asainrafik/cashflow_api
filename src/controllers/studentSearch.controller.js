const studentSearch = require("../models/studentSearch.model");
const { Validator } = require("node-input-validator");

exports.studentSearchController = (req, res) => {
    console.log("auto search");
    if (req.body.search && req.body.search.length > 0) {
        const v = new Validator(req.body, {
            search: "required",
        });
        v.check().then((matched) => {
            if (!matched) {
                res.status(422).send(v.errors);
            } else {
                const textsearch = req.body;
                studentSearch.getautoSearchModel(textsearch, (err, resultData) => {
                    console.log("auto search");
                    if (resultData) {
                        res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
                    } else {
                        res.status(400).send(err);
                    }
                });
            }
        });
    }

    //text year grade section
    else if (
        req.body.searchby &&
        req.body.academic_year &&
        req.body.academic_year.length > 0 &&
        req.body.searchby.length > 0 &&
        req.body.grade &&
        req.body.grade.length > 0 &&
        req.body.section &&
        req.body.section.length > 0
    ) {
        const textsearch = req.body;
        studentSearch.getSearchBYYearGradeSectionStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }

    //text year grade
    else if (
        req.body.searchby &&
        req.body.academic_year &&
        req.body.academic_year.length > 0 &&
        req.body.searchby.length > 0 &&
        req.body.grade &&
        req.body.grade.length > 0
    ) {
        const textsearch = req.body;
        studentSearch.getSearchBYYearGradeStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }

    //text year section
    else if (
        req.body.searchby &&
        req.body.academic_year &&
        req.body.academic_year.length > 0 &&
        req.body.searchby.length > 0 &&
        req.body.section &&
        req.body.section.length > 0
    ) {
        const textsearch = req.body;
        studentSearch.getSearchBYYearSectionStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }

    //text year
    else if (req.body.searchby && req.body.academic_year && req.body.academic_year.length > 0 && req.body.searchby.length > 0) {
        const textsearch = req.body;
        studentSearch.getSearchBYYearStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }
    else if (req.body.academic_year &&
        req.body.academic_year.length > 0 &&
        req.body.grade &&
        req.body.grade.length > 0 &&
        req.body.section &&
        req.body.section.length > 0 ){
            studentSearch.getYearGradeSectionStudentDetailsModelWithoutterm(textsearch, (err, resultData) => {
                console.log("auto search");
                if (resultData) {
                    res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
                } else {
                    res.status(400).send(err);
                }
            });
        }
    //year grade section
    else if (
        req.body.academic_year &&
        req.body.academic_year.length > 0 &&
        req.body.grade &&
        req.body.grade.length > 0 &&
        req.body.section &&
        req.body.section.length > 0 &&
        req.body.term &&
        req.body.term.length > 0
    ) {
        const textsearch = req.body;
        studentSearch.getYearGradeSectionStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }

    //year grade
    else if (req.body.academic_year && req.body.academic_year.length > 0 && req.body.grade && req.body.grade.length > 0) {
        const textsearch = req.body;
        studentSearch.getYearGradeStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }

    //year section
    else if (req.body.academic_year && req.body.academic_year.length > 0 && req.body.section && req.body.section.length > 0) {
        const textsearch = req.body;
        studentSearch.getYearSectionStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }

    //year
    else if (req.body.academic_year && req.body.academic_year.length > 0) {
        const textsearch = req.body;
        studentSearch.getYearStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }
    
    //all balance by student id
    else if (req.body.allbalance && req.body.allbalance.length > 0) {
        const textsearch = req.body;
        studentSearch.getallBalanceStudentDetailsModel(textsearch, (err, resultData) => {
            console.log("auto search");
            if (resultData) {
                res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: resultData });
            } else {
                res.status(400).send(err);
            }
        });
    }
};
