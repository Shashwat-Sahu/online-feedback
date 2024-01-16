const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Counsellor = mongoose.model("Counsellor")
const Counselee = mongoose.model("Counselee")
const verifyToken = require("../Middleware/VerifyToken")
const sha256 = require('sha256');

router.post("/add",verifyToken, (req, res) => {
    const { name, rank, service_id, password } = req.body;
    Counsellor.findOne({ service_id }).then(data => {
        if (data)
            return res.status(422).json({ error: "Counsellor already exists" })
        const counsellor = new Counsellor({
            name, rank, service_id, password:sha256(password), counselee_list: []
        })

        counsellor.save().then(data => {
            res.json({ message: "Added Successfully" })
        })
    })
})

async function addCounselee(counselee_list, counsellor_service_id) {

    var added = counselee_list.map(element => {
        const { name, rank, service_id } = element
        return Counselee.findOneAndUpdate({ service_id }, {
            $set: {
                name, rank, service_id
            }
        }, {
            upsert: true,
            new: true
        }).then(data => {
            console.log(data)
            if (data) {
                return Counsellor.findOneAndUpdate({ service_id: counsellor_service_id, counselee_list: { $nin: [service_id] } }, {
                    $push: {
                        counselee_list: service_id
                    }
                }).then(data => {
                    if (data)
                        return service_id
                })
            }


        })
    })

    var result = await Promise.all(added);
    console.log(result)
    return result

}

router.put("/update",verifyToken, (req, res) => {
    const { service_id,name, rank } = req.body;
    Counsellor.findOneAndUpdate({ service_id },{
        name, rank
    }).then(data => {
        if (!data)
            return res.status(404).json({ error: "Not Found " + service_id })
        if (data) {
            return res.status(200).json({ message: "Updated Successfully" })
        }

    })
})


router.delete("/delete",verifyToken, (req, res) => {
    console.log(req.query)
    const service_id  = req.query.service_id;
    Counsellor.findOneAndDelete({ service_id }).then(data => {
        if (!data)
            return res.status(404).json({ error: "Not Found " + service_id })
        if (data?.counselee_list.length > 0) {
            Counselee.deleteMany({ service_id: { $in: data.counselee_list } }).then(data => {
                return res.status(200).json({ message: "Deleted Successfully" })
            })
        }
        else{
            return res.status(200).json({ message: "Deleted Successfully" })
        }

    })
})

router.put("/addCounseleeList",verifyToken, async (req, res) => {

    const { counselee_list, counsellor_service_id } = req.body;

    Counsellor.findOne({ service_id: counsellor_service_id}).then(data=>{
        if(!data)
        return res.status(404).json({error:"Counsellor not found"})
    })
    var promises = counselee_list.map(element => {
        const { name, rank, service_id } = element
        return Counsellor.findOne({ service_id: counsellor_service_id, counselee_list: { $nin: [service_id] } }).then(data => {
            if (!data)
                return service_id
        })
    })
    Promise.all(promises).then(async (result) => {
        var alreadyExist = result.filter(service_id => service_id != undefined)
        if (alreadyExist.length > 0)
            return res.status(422).json({ error: "Already Existing: " + alreadyExist.join(", ") })
        else {
            var result = await addCounselee(counselee_list, counsellor_service_id)
            if (result.length == counselee_list.length)
                res.json({ message: "Added Successfully: " + result.join(", ") })
        }
    })
})

module.exports = router