const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const AdminAuth = mongoose.model("AdminAuth")
const Counsellor = mongoose.model("Counsellor")
const sha256 = require('sha256');


router.post("/login", (req, res) => {
    console.log(req.body)
    const { service_id, password, type } = req.body;
    
    if (type == "admin") {
        const cryptedPassword = sha256(password)
        AdminAuth.find({ "service_id":service_id, password: cryptedPassword }).then(data => {
            console.log(cryptedPassword,data)
            if (!data)
                res.status(401).json({ error: "Wrong service ID or password" })
            else
                res.json({ message: "Logged in successfully" })
        })
    }
    else{
        const cryptedPassword = sha256(password)
        Counsellor.find({ "service_id":service_id, password: cryptedPassword }).then(data => {
            console.log(cryptedPassword,data)
            if (!data)
                res.status(401).json({ error: "Wrong service ID or password" })
            else
                res.json({ message: "Logged in successfully" })
        })
    }
})


module.exports = router