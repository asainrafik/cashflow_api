//get all year
const PromotionModel = require("../models/promotion.model");

const { Validator } = require("node-input-validator");

exports.getPromotion = (req, res) => {
    const v = new Validator(req.body, {
        year_id: "required",
        grade_id:"required",
        section_id:"required"
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const promoReqData = new PromotionModel(req.body);
            PromotionModel.getStudentPromotion(promoReqData, (err, resdata) => {
                if (resdata) {
                    res.status(200).send({
                        status: true,
                        message: `promotion  details \u{1F973} \u{1F973}`,
                        data: resdata,
                    });
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};

exports.makePromotion = (req, res) => {
    const v = new Validator(req.body, {
        year_id: "required",
        grade_id:"required",
        section_id:"required",
        student_admissions_id:"required",
        student_id:"required",
        from_grade:"required"
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const promoReqData = new PromotionModel(req.body);
            PromotionModel.makePromotion(promoReqData, (err, resdata) => {
                if (resdata) {
                    res.status(200).send({
                        status: true,
                        message: `promotion  details \u{1F973} \u{1F973}`,
                        data: resdata,
                    });
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};