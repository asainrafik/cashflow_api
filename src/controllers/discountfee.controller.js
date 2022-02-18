const DiscountModel = require("../models/discountfee.model");

const { Validator } = require("node-input-validator");

exports.getAllDiscount = (req, res) => {
    
    DiscountModel.getAllDiscountModel((err, Discount) => {
        if (Discount) {
            let DiscountData = Discount;
            res.status(200).send({ status: true, message: "data fetched successfully \u{1F389} \u{1F389}", data: DiscountData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createDiscounts = (req, res) => {
    const v = new Validator(req.body, {
        dis_feetype_name: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        }
        else{
            const DiscountReqData = new DiscountModel(req.body);
         
            DiscountModel.createDiscount(DiscountReqData, (err, Discount) => {
            
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({ status: true, message: "Discount inserted \u{1F973} \u{1F973}", data: Discount });
                }
            });
        }
    });
};

exports.deleteDiscount = (req, res) => {
    DiscountModel.deleteDiscountfee(req.body, (err, Discount) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({ status: true, message: Discount.isDeletable ? "year deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: Discount.data[0] }, data: { isDeletable: Discount.isDeletable } });
        }
    });

}



