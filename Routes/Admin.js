const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Counsellor = mongoose.model("Counsellor")
const Counselee = mongoose.model("Counselee")
const verifyToken = require("../Middleware/VerifyTokenAdmin")

router.get("/getCounsellors", verifyToken, (req, res) => {
    Counsellor.find().select("-password -_id -counselee_list -__v").then((data) => {
        return res.send(data)
    })
})

router.get("/getCounselees", verifyToken, (req, res) => {
    const service_id = req.query.service_id;
    Counsellor.find({ service_id }).select("counselee_list").then((data) => {
        if (data.length > 0)
            Counselee.find({ "service_id": { $in: data[0].counselee_list } }).select("-_id -__v").then(data => {
                console.log(data)
                return res.send(data)
            })
    })
})

module.exports = router