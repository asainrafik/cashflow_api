const PlacesModel = require("../models/places.model");
const { Validator } = require("node-input-validator");

exports.getplaces = (req, res) => {
    PlacesModel.getmodelplaces((err, places) => {
        if (places) {
            let placesData = places;
            res.status(200).send({ status: true, message: "Places data fetched successfully \u{1F389} \u{1F389}", data: placesData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createplaces = (req, res) => {
    const v = new Validator(req.body, {
        places: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const placesReq = new PlacesModel(req.body);
            PlacesModel.createplacesmodel(placesReq, (err, Places) => {
                if (Places) {
                    res.status(200).send({
                        status: true,
                        message: Places.IsExsist == "error"  ? "Cannot Create Places" :Places.IsExsist ? `Places already present \u{26D4} \u{26D4}` : `Places inserted \u{1F973} \u{1F973}`,
                        data: Places,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};
exports.deleteplaces = (req, res) => {
    PlacesModel.deleteplacemodel(req.body, (err,places) =>{
         if(places){
             res.status(200).send({ status:true, message: places.isDeletable ? "Places deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: places.data },
             data: { isDeletable: places.isDeletable },})
         }else{
             res.status(500).res(err)
         }
     })
}