const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const CI = mongoose.model("CI")

module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //authorisatin ===Bearer djbdbdjbdbd
    console.log(authorization)
    if (!authorization) {
        res.status(401).json({ error: "Not Authorized" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_CI_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Not Authorized" })
        }
        const { service_id } = payload
        CI.find({ service_id }).select("-password -_id -__v").then(userData => {
            if (userData)
                {
                    req.ci = userData[0]
                    next()
                }
            else
                return res.status(401).json({ error: "Not Authorized" })
        })

    })
}