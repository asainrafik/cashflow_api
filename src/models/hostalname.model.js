var dbConn = require("../../config/db.config");

var HostalName = function(hostalname) {
    this.hostel_name = hostalname.hostel_name;
}

HostalName.gethostalModel = (result) => {
    dbConn.query("SELECT * FROM hostal_name", (err, res) => {
        if (res) {
            console.log("HostalName fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data HostalName");
            result(null, err);
        }
    });
};

HostalName.createhostalmodel =(hostalreq,result) =>{
    dbConn.query(`SELECT * FROM hostal_name WHERE hostel_name = "${hostalreq.hostel_name}"`, (err, res) => {
        if (res) {
            // console.log("Hostal fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                dbConn.query("INSERT into hostal_name SET ?", hostalreq, (err, res) => {
                    if (err) {
                        console.log("error inserting data Hostal");
                        result(null, err);
                    } else {
                        console.log("Hostal inserted successfully");
                        console.log(res);
                        result(null, {IsExsist: false,data:res});
                    }
                });
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
}

HostalName.deletehostalname = (hostalreq, result) => {
    dbConn.query(`SELECT * FROM hostal_room WHERE hostel_name_id =${hostalreq.hostel_name_id}`, (err, res) => {
        if (res) {
            console.log("Hostal fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { isDeletable: false, data: res });
            } else {
                let hostalToFind = { hostel_name_id: hostalreq.hostel_name_id };
                dbConn.query("DELETE FROM hostal_name WHERE ?", hostalToFind, (err, res) => {
                    if (res) {
                        console.log("Hostal deleted successfully");
                        console.log(res);
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        console.log("error inserting data Hostal");
                        result(null, err);
                    }
                });
            }
        } else {
            console.log("error fetching data Hostal");
            result(null, err);
        }
    });
    //result(null,"data is up")
};

module.exports = HostalName;