const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Counsellor = mongoose.model("Counsellor")
const Counselee = mongoose.model("Counselee")
const HOF = mongoose.model("HOF")
const CI = mongoose.model("CI")
const FeedbackReport = mongoose.model("FeedbackReport")
const verifyToken = require("../Middleware/VerifyTokenCI")

const sha256 = require('sha256');


router.get("/getReports",verifyToken,(req,res)=>{
    console.log(req.ci)
    FeedbackReport.find({report_ci:req.ci.service_id}).sort({"created_at":-1}).then(data=>{
        res.json({reports:data,ci:req.ci})
    })
})

router.get("/getReport",verifyToken,(req,res)=>{
    const report_id = req.query._id
    FeedbackReport.findById(report_id).then(data=>{
        res.send(data)
    })
})

router.put("/updateReport",verifyToken,(req,res)=>{
    const {report_id, ci_comments} = req.body;
    FeedbackReport.find({_id:report_id,ci_comments:""}).then(data=>{
        if(data.length>0){
    console.log("exists",data)
    FeedbackReport.findByIdAndUpdate(report_id,{
        $set:{
            ci_comments,
        }
    },{
        new:true
    }).then(data=>{
        console.log(data)
        res.json({message:"Updated Successfully", report:data})
    }).catch(err=>{
        res.status(500).json({error:"Error occurred"})
    })
}
else{
    res.status(403).json({error:"Report can't be modified now!"})
}
})
})


router.get("/getfeedback",verifyToken,(req,res)=>{
    const service_id  = req.query.service_id
    const report_ci = req.query.ci_service_id
    FeedbackReport.find({service_id}).sort({"created_at":-1}).then(data=>{
        res.send(data)
    })
})


module.exports = router