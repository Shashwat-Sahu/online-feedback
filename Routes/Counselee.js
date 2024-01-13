const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Counsellor = mongoose.model("Counsellor")
const Counselee = mongoose.model("Counselee")


router.put("/update", (req, res) => {
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


router.delete("/delete", (req, res) => {
    const { service_id, counsellor_service_id } = req.body;
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



module.exports = router