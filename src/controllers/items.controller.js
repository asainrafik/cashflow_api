const ItemModel = require("../models/items.model");
const { Validator } = require("node-input-validator");

exports.getitem = (req, res) => {
    ItemModel.getitemmodel((err, item) => {
        if (item) {
            let itemData = item;
            res.status(200).send({ status: true, message: "items data fetched successfully \u{1F389} \u{1F389}", data: itemData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createitem = (req, res) => {
    const v = new Validator(req.body, {
        items: "required"
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const itemreq = new ItemModel(req.body);
            ItemModel.createitemmodel(itemreq, (err, items) => {
                if (items) {
                    res.status(200).send({
                        status: true,
                        message: items.IsExsist ? `items already present \u{26D4} \u{26D4}` : `items inserted \u{1F973} \u{1F973}`,
                        data: items,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};
exports.deleteitem = (req, res) => {
    ItemModel.deleteitemmodel(req.body, (err,item) =>{
         if(item){
             res.status(200).send({ status:true, message: item.isDeletable ? "items deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: item.data },
             data: { isDeletable: item.isDeletable },})
         }else{
             res.status(500).res(err)
         }
     })
}