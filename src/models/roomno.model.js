var dbConn = require("../../config/db.config");

var Roomno = function (room) {
    this.room_no = room.room_no;
    this.room_capacity = room.room_capacity;
    this.hostel_name_id = room.hostel_name_id;
};

Roomno.getRoomno = (result) => {
    dbConn.query(`SELECT * FROM hostal_room LEFT JOIN hostal_name
	ON hostal_room.hostel_name_id=hostal_name.hostel_name_id`, (err, res) => {
        if (res) {
            console.log("RoomNo fetched successfully");
            console.log(res);
            result(null, res);
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
};

Roomno.createroommodel = (roomreq,result) =>{
    dbConn.query(`SELECT * FROM hostal_room WHERE hostel_name_id ="${roomreq.hostel_name_id}" and room_no = "${roomreq.room_no}" and room_capacity=${roomreq.room_capacity}`, (err, res) => {
        if (res) {
            console.log("Room fetched successfully");
            console.log(res);
            if (res.length > 0) {
                result(null, { IsExsist: true });
            } else {
                let insertroom = {
                    hostel_name_id:roomreq.hostel_name_id,
                    room_no:roomreq.room_no,
                    room_capacity: roomreq.room_capacity,
                    room_filled:0
                }
                dbConn.query("INSERT into hostal_room SET ?", insertroom, (err, res) => {
                    if (err) {
                        console.log("error inserting data year");
                        result(null, err);
                    } else {
                        console.log("Room inserted successfully");
                        console.log(res);
                        result(null, res);
                    }
                });
            }
        } else {
            console.log("error fetching data HostalRoom");
            result(null, err);
        }
    });
  
}

Roomno.deletemodel = (roomreq,result) =>{
    dbConn.query(`SELECT * FROM hostel_allocation WHERE room_id =${roomreq.room_id}`, (err, res) => {
        if (res) {
            if (res.length > 0) {
                result(null, { isDeletable: false, data: res });
            } else {
                let roomFind = { room_id: roomreq.room_id };
                dbConn.query("DELETE FROM hostal_room WHERE ?", roomFind, (err, res) => {
                    if (res) {
                        console.log("Room deleted successfully");
                        console.log(res);
                        result(null, { isDeletable: true, record: "record Deleted" });
                    } else {
                        console.log("error inserting data Room");
                        result(null, err);
                    }
                });
            }
        } else {
            console.log("error fetching data year");
            result(null, err);
        }
    });
}
module.exports = Roomno;