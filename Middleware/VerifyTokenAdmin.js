const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const AdminAuth = mongoose.model("AdminAuth")

module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //authorisatin ===Bearer djbdbdjbdbd
    console.log(authorization)
    if (!authorization) {
        res.status(401).json({ error: "Not Authorized" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, process.env.JWT_ADMIN_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "Not Authorized" })
        }
        const { service_id } = payload
        AdminAuth.find({ service_id }).then(userData => {
            if (userData)
                next()
            else
                return res.status(401).json({ error: "Not Authorized" })
        })

    })
}