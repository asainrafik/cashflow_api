var dbConn = require("../../config/db.config");

var hostalallocation = function (hostal) {
    this.grade_id = hostal.grade_id;
    this.year_id = hostal.year_id;
    this.fee_master_id = hostal.fee_master_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

hostalallocation.getallocationModel = (result) => {
    dbConn.query("SELECT * FROM hostal_name", (err, res) => {
        if(res){
            result(null, res);
        }
   
    // dbConn.query("SELECT * FROM hostal_name LEFT JOIN hostal_room ON hostal_name.hostel_name_id = hostal_room.hostel_name_id", (err, res) => {
    //     if (res) {
    //         // res.map((ele)=>{

    //         // })
    //         // console.log(res,"Hostal")
    //         // let RoomNo = [];
    //         // let hostal = [];
    //         // let duplicate = [];

    //         // res.map((ele) =>{
    //         //     let tempobj = {}
    //         //     tempobj.room_id = ele.room_id,
    //         //     tempobj.room_no = ele.room_no,
    //         //     tempobj.room_capacity = ele.room_capacity,
    //         //     tempobj.room_filled = ele.room_filled
    //         //     RoomNo.push(tempobj);
    //         //     hostal.push(ele);
    //         // })
    //         // if (hostal.length > 0) {
    //         //     let hostel_name_id = hostal[0].hostel_name_id;
    //         //     let hostel_name = hostal[0].hostel_name;
    //         //     let ss = { hostel_name_id, hostel_name, RoomNo };
    //         //     duplicate.push(ss);
    //         // }
    //         // console.log(duplicate)
    //        
    //     } 
    else {
            result(null, err);
        }
    });
};

hostalallocation.getfilterallcotion = (reqest,result) =>{
    console.log(reqest.hostel_name_id)
    dbConn.query(`SELECT * FROM hostal_room WHERE hostel_name_id=${reqest.hostel_name_id}`, (err, res) => {
        if(res){
            result(null, res);
        }else {
            result(null, err);
        }
    });
}
hostalallocation.gettermsmodel = (reqest,result) =>{
    console.log(reqest,"request")
    dbConn.query(`select *
	FROM year_of_fees
	LEFT JOIN terms_year_of_fees
	on  year_of_fees.year_of_fees_id=terms_year_of_fees.year_of_fee_id where year_of_fees.grade_id=${reqest.grade_id} and year_of_fees.year_id=${reqest.year_id} and fee_master_id=${reqest.fee_master_id}`,(err,res) =>{
        if(res){
            let re = []
            if(res.length >0){
                let status = true
                res.map((terms) =>{
                    re.push({status,terms})
                })
                
            }
            result(null,re);
        }else{
            result(null,err);
        }
    })
}

module.exports = hostalallocation;
