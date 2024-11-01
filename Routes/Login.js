const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AdminAuth = mongoose.model("AdminAuth");
const Counsellor = mongoose.model("Counsellor");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");

router.post("/login", (req, res) => {
  console.log(req.body);
  const { service_id, password, type } = req.body;

  if (type == "admin") {
    const cryptedPassword = sha256(password);
    AdminAuth.find({ service_id: service_id, password: cryptedPassword }).then(
      (data) => {
        console.log(cryptedPassword, data);
        if (data.length > 0) {
          const token = jwt.sign(
            { service_id, time: new Date().toDateString() },
            process.env.JWT_ADMIN_KEY,
            { expiresIn: "1h" },
          );
          res.json({
            message: "Logged in successfully",
            token,
            service_id,
            type,
          });
        } else res.status(401).json({ error: "Wrong service ID or password" });
      },
    );
  } else if (type == "counsellor") {
    const cryptedPassword = sha256(password);
    console.log("user", service_id, password, cryptedPassword);
    Counsellor.find({ service_id: service_id, password: cryptedPassword }).then(
      (data) => {
        console.log(cryptedPassword, data);
        if (data.length > 0) {
          const token = jwt.sign(
            { service_id, time: new Date().toDateString() },
            process.env.JWT_DS_KEY,
            { expiresIn: "1h" },
          );
          res.json({
            message: "Logged in successfully",
            token,
            service_id,
            type,
          });
        } else res.status(401).json({ error: "Wrong service ID or password" });
      },
    );
  }
});

module.exports = router;
