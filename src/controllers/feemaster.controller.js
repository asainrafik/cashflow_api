
const FeeMasterModel = require('../models/feemaster.model');

exports.getAllFeeMaster = (req,res)=>{
    console.log("get all Grade Section");
    FeeMasterModel.getAllfeemasterModel((err,feeMaster)=>{
        if(err){
            res.status(500).send({status:false,message:err});
        }
        else{
            res.status(200).send({status:true,message:'data fetched successfully \u{1F389} \u{1F389}',data:feeMaster})
        }
    })
}

exports.createNewGradeSection = (req,res)=>{
    const gradeReqData = new FeeMasterModel(req.body)
    console.log(req.body);
    FeeMasterModel.createfeemasterModel(gradeReqData,(err,feeMaster)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send({status:true,message:feeMaster.IsExsist ? `feemaster already present \u{26D4} \u{26D4}` :`feemaster inserted \u{1F973} \u{1F973}`,data:feeMaster})
        } 
    })
}

exports.deletefeemaster = (req,res)=>{
    console.log("delete feemaster");
    console.log(req.body);
    FeeMasterModel.deletefeemasterModel(req.body,(err,feemaster)=>{
        console.log("controller feemaster")
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send({status:true,message: feemaster.isDeletable ? 'feemaster deleted \u{1F5D1} \u{1F5D1}':{dataExsists:feemaster.data.res[0]},data:{isDeletable:feemaster.isDeletable}})
        }
    })
}