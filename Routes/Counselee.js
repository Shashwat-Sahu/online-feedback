const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Counsellor = mongoose.model("Counsellor")
const Counselee = mongoose.model("Counselee")
const verifyToken = require("../Middleware/VerifyTokenAdmin")

const verifyTokenUser = require("../Middleware/VerifyTokenUser")


router.put("/update", verifyToken, (req, res) => {
    const { service_id, name, rank } = req.body;
    Counselee.findOneAndUpdate({ service_id }, {
        name, rank
    }).then(data => {
        if (!data)
            return res.status(404).json({ error: "Not Found " + service_id })
        if (data) {
            return res.status(200).json({ message: "Updated Successfully" })
        }

    })
})


router.delete("/delete", verifyToken, (req, res) => {
    const { service_id, counsellor_service_id } = req.query;
    Counselee.findOneAndDelete({ service_id }).then(data => {
        if (!data)
            return res.status(404).json({ error: "Not Found " + service_id })

        Counsellor.findOneAndUpdate({ service_id: counsellor_service_id }, {
            $pull: {
                counselee_list: service_id
            }
        }).then(data => {
            return res.status(200).json({ message: "Deleted Successfully" })
        })


    })
})

router.get("/getCounselees", verifyTokenUser, (req, res) => {
    const data = req.counselee_list;
    const service_id = req.query.service_id;
    if (data.length > 0)
        Counselee.find({ "service_id": { $in: data } }).select("-_id -__v").then(data => {
            return res.send(data)
        })

})

module.exports = router