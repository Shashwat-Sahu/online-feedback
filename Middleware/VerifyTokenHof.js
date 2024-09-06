const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const HOF = mongoose.model("HOF")

module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //authorisatin ===Bearer djbdbdjbdbd
    if (!authorization) {
        res.status(401).json({ error: "Not Authorized" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_HOF_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Not Authorized" })
        }
        const { service_id } = payload
        HOF.find({ service_id }).select("-password -_id -__v").then(userData => {
            if (userData)
                {
                    req.hof = userData[0]
                    next()
                }
            else
                return res.status(401).json({ error: "Not Authorized" })
        })

    })
}