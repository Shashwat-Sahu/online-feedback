const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const VerifyTokenUser = require('../Middleware/VerifyTokenUser')
const FeedbackReport = mongoose.model("FeedbackReport")
const HOF = mongoose.model("HOF")

router.post("/feedbackreport",VerifyTokenUser, (req, res) => {
    const { service_id,
        academics,
        projects,
        sick_report,
        olq,
        games,
        cultural,
        financial,
        personal,
        report_hof,
        ds_comments,
        counsellor_service_id } = req.body;

        if(!service_id)
        return res.status(422).json({error:"Service ID is empty"})
    

    FeedbackReport.insertMany([{
        counsellor_service_id,
        service_id,
        academics,
        projects,
        sick_report,
        olq,
        games,
        cultural,
        financial,
        personal,
        report_hof,
        ds_comments
    }]).then(data => {

        if (!data)
            return res.status(404).json({ error: "Not Found " + service_id })
        if (data)
            return res.status(200).json({ message: "Added Record Successfully" })
    })
})

router.get("/getfeedback",VerifyTokenUser,(req,res)=>{
    const service_id  = req.query.service_id
    const counsellor_service_id = req.query.counsellor_service_id
    FeedbackReport.find({service_id,counsellor_service_id}).then(data=>{
        res.send(data)
    })
})


router.get("/getAllHof",VerifyTokenUser,(req,res)=>{
    HOF.find().select("-password").then(data=>{
        console.log(data)
        res.json({HOF:data})
    })
})

module.exports = router