var dbConn = require("../../config/db.config");

var feemaster = function (feeMaster) {
    this.fee_type_name = feeMaster.fee_type_name;
    this.order_id = feeMaster.order_id;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.transport_fee = feeMaster.transport_fee;
    this.hostal_fee = feeMaster.hostal_fee;
    this.optional_fee = feeMaster.optional_fee;
};

feemaster.getAllfeemasterModel = (result) => {
    dbConn.query("SELECT * FROM fee_masters", (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

feemaster.createfeemasterModel = (feemasterReqData, result) => {
    let dataToSend = {
        fee_type_name: feemasterReqData.fee_type_name.toUpperCase(),
        order_id: feemasterReqData.order_id,
        transport_fee: feemasterReqData.transport_fee,
        hostal_fee: feemasterReqData.hostal_fee,
        created_at: new Date(),
        updated_at: new Date(),
        optional_fee:feemasterReqData.optional_fee
    };
    dbConn.query(`select * from fee_masters where fee_type_name="${dataToSend.fee_type_name}";`, (err, res) => {
        if (res) {
            // console.log("year fetched successfully");
            // console.log(res);
            if (res.length > 0) {
                result(null, { IsExsist: true, duplication: res });
            } else {
                dbConn.query("INSERT into fee_masters SET ?", dataToSend, (err, res) => {
                    if (res) {
                        // console.log("year inserted successfully");
                        let finaldata = {
                            id: res.insertId,
                            ...feemasterReqData,
                        };
                        result(null, { IsExsist: false, data: finaldata });
                    } else {
                        // console.log("error inserting data year");
                        result(null, err);
                    }
                });
            }
        } else {
            // console.log("error fetching data year");
            result(null, err);
        }
    });
};

feemaster.deletefeemasterModel = (feemasterReqData, result) => {
    // console.log(`SELECT * FROM year_of_fees WHERE academic_year ="${feemasterReqData.academic_year}" and  fee_master_id=${feemasterReqData.fee_master_id}`);
    dbConn.query(`SELECT * FROM year_of_fees WHERE  fee_master_id=${feemasterReqData.fee_master_id}`, (err, res) => {
        if (res) {
            // console.log("year fetched successfully");
            // console.log(res);
            if (res.length > 0) {
                result(null, { isDeletable: false, data: { res } });
            } else {
                let gradeToFind = { fee_master_id: feemasterReqData.fee_master_id };
                dbConn.query("DELETE FROM fee_masters WHERE ?", gradeToFind, (err, res) => {
                    if (res) {
                        // console.log("year deleted successfully");
                        // console.log(res);
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        // console.log("error inserting data year");
                        result(null, err);
                    }
                });
            }
        } else {
            // console.log("error fetching data year");
            result(null, err);
        }
    });
    //result(null,"data is up")
};

feemaster.updatefeemastermodel = (id, updatefeemaster, result) => {
    dbConn.query(`UPDATE fee_masters set fee_type_name = "${updatefeemaster.fee_type_name}" WHERE fee_master_id=${id};`, (err, res) => {
        if (res) {
            result(null, res);
        } else {
            result(null, err);
        }
    });
};

module.exports = feemaster;
