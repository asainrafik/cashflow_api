var dbConn = require("../../config/db.config");

var Uniformprice = function (price) {
    this.year_id = price.year_id, 
    this.items_id = price.items_id, 
    this.size_id = price.size_id, 
    this.items_price = price.items_price
};
Uniformprice.getpricemodel = (result) => {
    dbConn.query("SELECT * FROM uniform_price", (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

Uniformprice.createprice = (priceReqData, result) => {
    dbConn.query(
        `SELECT * FROM uniform_price WHERE year_id ="${priceReqData.year_id}" and items_id = "${priceReqData.items_id}" and size_id = "${priceReqData.size_id}" and items_price = "${priceReqData.items_price}"`,
        (err, res) => {
            if (res) {
                if (res.length > 0) {
                    result(null, { IsExsist: true });
                } else {
                    dbConn.query("INSERT into uniform_price SET ?", priceReqData, (err, res) => {
                        if (res) {
                            result(null, res);
                        } else {
                            result(null, err);
                        }
                    });
                }
            } else {
                
                result(null, err);
            }
        }
    );
};

Uniformprice.deletepricemodel = (PriceReqData, result) => {
    dbConn.query(`SELECT * FROM items_allocation WHERE items_price_id =${PriceReqData.item_price_id}`, (err, res) => {
        if (res) {
            console.log(res,"pp")
            if (res.length > 0) {
                result(null, { isDeletable: false, data: res });
            } else {
                let Pricefind = { item_price_id: PriceReqData.item_price_id };
                console.log(Pricefind,"sdfd")
                dbConn.query("DELETE FROM uniform_price WHERE ?",Pricefind, (err, res) => {
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

module.exports = Uniformprice;
