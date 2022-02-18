
const GradeSectionModel = require('../models/grade.model');

exports.getAllGradeSection = (req,res)=>{
    console.log("get all Grade Section");
    GradeSectionModel.getAllGradeSectionModel((err,gradeSection)=>{
        if(err){
            res.status(500).send({status:false,message:err});
        }
        else{
            res.status(200).send({status:true,message:'data fetched successfully \u{1F389} \u{1F389}',data:gradeSection})
        }
    })
}

exports.createNewGradeSection = (req,res)=>{
    const gradeReqData = new GradeSectionModel(req.body)
    console.log(req.body);
    GradeSectionModel.createGradeSectionModel(gradeReqData,(err,gradeSection)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send({status:true,message:gradeSection.IsExsist ? `grade and section already present \u{26D4} \u{26D4}` :`grade and section inserted \u{1F973} \u{1F973}`,data:gradeSection})
        } 
    })
}

exports.deleteGradeSection = (req,res)=>{
    console.log("delete gradeSection");
    console.log(req.body);
    GradeSectionModel.deleteGradeSectionModel(req.body,(err,gradeSection)=>{
        console.log("controller gradeSection")
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send({status:true,message: gradeSection.isDeletable ? 'gradeSection deleted \u{1F5D1} \u{1F5D1}':{dataExsists:gradeSection.data.res[0]},data:{isDeletable:gradeSection.isDeletable}})
        }
    })
}