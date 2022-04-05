var dbConn = require("../../config/db.config");

var Places = function (places) {
    this.places = places.places;
};

Places.getmodelplaces = (result) => {
    dbConn.query("SELECT * FROM places", (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

Places.createplacesmodel = (placesReq, result) => {
    dbConn.query(`SELECT * FROM places WHERE places ="${placesReq.places}"`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { IsExsist: true, duplication: res });
            } else {
                dbConn.query("INSERT into places SET ?", placesReq, (err, res) => {
                    if (err) {
                        result(null, { IsExsist: "error", data: "please check the entered data failed Insert \u{26D4} \u{26D4}" });
                    } else {
                        result(null, { IsExsist: false, data: res });
                    }
                });
            }
        } else {
            result(null, err);
        }
    });
};

Places.deleteplacemodel = (placesreq, result) => {
    dbConn.query(`SELECT * FROM stopping WHERE places_id =${placesreq.places_id}`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { isDeletable: false, data: res });
            } else {
                let placesFind = { places_id: placesreq.places_id };
                dbConn.query("DELETE FROM places WHERE ?", placesFind, (err, res) => {
                    if (res) {
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        result(null, err);
                    }
                });
            }
        } else {
            result(null, err);
        }
    });
};
module.exports = Places;
