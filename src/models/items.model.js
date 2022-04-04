var dbConn = require("../../config/db.config");

var Items = function (year) {
    this.items = year.items;
   
};

Items.getitemmodel = (result) => {
    dbConn.query("SELECT * FROM items", (err, res) => {
        if (res) {
            console.log("items fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data items");
            result(null, err);
        }
    });
};

Items.createitemmodel = (itemreq, result) => {
    dbConn.query(`SELECT * FROM items WHERE items ="${itemreq.items}"`, (err, res) => {
        if (res) {
            
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                dbConn.query("INSERT into items SET ?", itemreq, (err, res) => {
                    if (err) {
                        result(null, err);
                    } else {
                        result(null, res);
                    }
                });
            }
        } else {
            result(null, err);
        }
    });
};

Items.deleteitemmodel = (itemsReq, result) => {
    dbConn.query(`SELECT * FROM uniform_price WHERE items_id =${itemsReq.items_id}`, (err, res) => {
        if (res) {
         
            if (res.length > 0) {
                result(null, { isDeletable: false, data: res });
            } else {
                let itemFind = { items_id: itemsReq.items_id };
                dbConn.query("DELETE FROM items WHERE ?", itemFind, (err, res) => {
                    if (res) {
                        console.log("items deleted successfully");
                        console.log(res);
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        console.log("error inserting data items");
                        result(null, err);
                    }
                });
            }
        } else {
            console.log("error fetching data items");
            result(null, err);
        }
    });
    //result(null,"data is up")
};

module.exports = Items;
