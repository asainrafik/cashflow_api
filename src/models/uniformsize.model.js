var dbConn = require("../../config/db.config");

var Size = function (size) {
    this.size_name =size.size_name;	
}
Size.getRoomno = (result) =>{
    dbConn.query("SELECT * FROM size", (err, res) => {
        if (res) {
            console.log("Size fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data Size");
            result(null, err);
        }
    });
}

Size.createuniform = (uniformReqData, result) =>{
    dbConn.query(`SELECT * FROM size WHERE size_name ="${uniformReqData.size_name}"`, (err, res) => {
        if (res) {
            // console.log("year fetched successfully");
            // console.log(res);
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                dbConn.query("INSERT into size SET ?", uniformReqData, (err, res) => {
                    if (err) {
                        console.log("error inserting data size");
                        result(null, err);
                    } else {
                        console.log("size inserted successfully");
                        console.log(res);
                        result(null, res);
                    }
                });
            }
        } else {
            console.log("error fetching data size");
            result(null, err);
        }
    });
}

Size.deletesizemodel = (sizeReqData,result) =>{
    dbConn.query(`SELECT * FROM uniform_price WHERE size_id =${sizeReqData.size_id}`, (err, res) => {
        if(res){
            if(res.length > 0){
                result(null, { isDeletable: false, data: res });   
            }else{
                let uniformfind = {size_id:sizeReqData.size_id};
                dbConn.query("DELETE FROM size WHERE ?",uniformfind, (err, res) =>{
                    if(res){
                        result(null, { isDeletable: true, record: "record Deleted" });
                    }else{
                        result(null, err);
                    }
                   
                })
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
}

module.exports = Size;