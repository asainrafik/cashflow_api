const RoomModel = require("../models/roomno.model");
const { Validator } = require("node-input-validator");

exports.getroomno = (req, res) => {
    RoomModel.getRoomno((err, room) => {
        if (room) {
            let roomData = room;
            res.status(200).send({ status: true, message: "RoomNo data fetched successfully \u{1F389} \u{1F389}", data: roomData });
        } else {
            res.status(400).send(err);
        }
    });
};

exports.createroom = (req, res) => {
    const v = new Validator(req.body, {
        room_no: "required",
        room_capacity: "required",
    });
    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            const roomreq = new RoomModel(req.body);
            RoomModel.createroommodel(roomreq, (err, Room) => {
                if (Room) {
                    res.status(200).send({
                        status: true,
                        message: Room.IsExsist == "error"  ? "Cannot Create Room":Room.IsExsist ? `Room already present \u{26D4} \u{26D4}` : `Room inserted \u{1F973} \u{1F973}`,
                        data: Room,
                    });
                   
                } else {
                    res.status(500).send(err);  
                }
            });
        }
    });
};
exports.deleteroom = (req, res) => {
     RoomModel.deletemodel(req.body, (err,room) =>{
         if(room){
             res.status(200).send({ status:true, message: room.isDeletable ? "year deleted \u{1F5D1} \u{1F5D1}" : { dataExsists: room.data },
             data: { isDeletable: room.isDeletable },})
         }else{
             res.status(500).res(err)
         }
     })
}