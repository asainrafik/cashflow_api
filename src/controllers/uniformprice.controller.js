const UniformPriceModel = require("../models/uniformprice.model");
const { Validator } = require("node-input-validator");

exports.getuniformprice = (req, res) => {
    UniformPriceModel.getpricemodel((err, uniform) => {
        if (uniform) {
            let uniformData = uniform;
            res.status(200).send({ status: true, message: "UniformPrice data fetched successfully \u{1F389} \u{1F389}", data: uniformData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createprice = (req, res) => {
    const v = new Validator(req.body, {
        year_id: "required",
        items_id:"required",
        size_id:"required",
        items_price:"required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const priceReqData = new UniformPriceModel(req.body);
            UniformPriceModel.createprice(priceReqData, (err, price) => {
                if (price) {
                    res.status(200).send({
                        status: true,
                        message: price.IsExsist == "error" ? "Cannot Create Price" : price.IsExsist ? `UniformPrice already present \u{26D4} \u{26D4}` : `UniformPrice inserted \u{1F973} \u{1F973}`,
                        data: price,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};

exports.deleteprice = (req, res) => {
    UniformPriceModel.deletepricemodel(req.body, (err, price) => {
        if (price) {
            res.status(200).send({
                status: true,
                message: price.isDeletable ? "Items deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: price.data },
                data: { isDeletable: price.isDeletable },
            });
           
        } else {
            res.status(500).send(err);
        }
    });
};
