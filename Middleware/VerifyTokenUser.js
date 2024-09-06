const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const Counsellor = mongoose.model("Counsellor")

module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //authorisatin ===Bearer djbdbdjbdbd
    if (!authorization) {
        res.status(401).json({ error: "Not Authorized" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_DS_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Not Authorized" })
        }
        const { service_id } = payload
        Counsellor.find({ service_id }).select("-password -_id -__v").then(userData => {
            if (userData)
                {
                    req.user = userData[0]
                    next()
                }
            else
                return res.status(401).json({ error: "Not Authorized" })
        })

    })
}