var dbConn = require("../../config/db.config");

var transportall = function (transport) {
    this.places_id = transport.places_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

transportall.gettransportModel = (result) => {
    dbConn.query("SELECT * FROM places", (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};
transportall.getfiltertransportmodel = (reqest, result) => {
    dbConn.query(`SELECT * FROM stopping WHERE places_id=${reqest.places_id}`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};
transportall.gettermsmodel = (reqest, result) => {
    dbConn.query(`select * FROM cashflow_newdata.transport_fees where places_id=${reqest.places_id} and year_id=${reqest.year_id};`, (err, res) => {
        console.log(err);
        if (res) {
            let re = [];
            if (res.length > 0) {
                let status = true;
                res.map((terms) => {
                    re.push({ status, terms });
                });
            }
            result(null, re);
        } else {
            result(null, err);
        }
    });
};

module.exports = transportall;
