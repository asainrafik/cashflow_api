var dbConn = require("../../config/db.config");

var Discount = function (Discount) {
    this.dis_feetype_name = Discount.dis_feetype_name;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Discount.getAllDiscountModel = (result) => {
    dbConn.query("SELECT * FROM  discount_type_masters", (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

Discount.createDiscount = (DiscountReqData, result) => {
    dbConn.query(`SELECT * FROM discount_type_masters WHERE dis_feetype_name ="${DiscountReqData.dis_feetype_name}"`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                dbConn.query("INSERT into discount_type_masters SET ?", DiscountReqData, (err, res) => {
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
    });
};

Discount.deleteDiscountfee = (DiscountReqData, result) => {
    dbConn.query(`SELECT * FROM fees_discounts WHERE dis_feetype_id =${DiscountReqData.dis_feetype_id}`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { isDeletable: false,data:res });
            } else {
                let DiscountToFind = { dis_feetype_id: DiscountReqData.dis_feetype_id };
                dbConn.query("DELETE FROM discount_type_masters WHERE ?", DiscountToFind, (err, res) => {
                    if (err) {
                        result(null, err);
                    } else {
                    result(null, { isDeletable: true, record: "record Deleted" });
                    }
                });
            }
           
        } else { 
            result(null, err);
        }
    });
    
};

module.exports = Discount;
