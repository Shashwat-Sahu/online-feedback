const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Counsellor = mongoose.model("Counsellor")
const Counselee = mongoose.model("Counselee")
const HOF = mongoose.model("HOF")
const FeedbackReport = mongoose.model("FeedbackReport")
const verifyToken = require("../Middleware/VerifyTokenHof")

const sha256 = require('sha256');


router.get("/getReports",verifyToken,(req,res)=>{
    console.log(req.hof)
    FeedbackReport.find({report_hof:req.hof.service_id}).then(data=>{
        res.json({reports:data,hof:req.hof})
    })
})

router.get("/getReport",verifyToken,(req,res)=>{
    const report_id = req.query._id
    FeedbackReport.findById(report_id).then(data=>{
        res.send(data)
    })
})

router.put("/updateReport",verifyToken,(req,res)=>{
    const {report_id, hof_comments} = req.body;
    FeedbackReport.findByIdAndUpdate(report_id,{
        $set:{
            hof_comments
        }
    },{
        new:true
    }).then(data=>{
        console.log(data)
        res.json({message:"Updated Successfully", report:data})
    }).catch(err=>{
        res.status(500).json({error:"Error occurred"})
    })
})


router.get("/getfeedback",verifyToken,(req,res)=>{
    const service_id  = req.query.service_id
    const report_hof = req.query.hof_service_id
    FeedbackReport.find({service_id,report_hof}).then(data=>{
        res.send(data)
    })
})
module.exports = router