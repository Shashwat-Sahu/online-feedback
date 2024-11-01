const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = mongoose.model("AdminAuth");
const Counsellor = mongoose.model("Counsellor");
const nodemailer = require("nodemailer");
const { randomInt } = require("crypto");
const sha256 = require("sha256");

const sendEmail = (service_id, otp) => {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "apurvavishwakarma293@gmail.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "apurvavishwakarma293@gmail.com",
      to: `av28061997@gmail.com`,
      subject: "OTP for verification",
      text: `OTP for verification of password : ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        rej("Error occurred");
      } else {
        res("Email Sent");
      }
    });
  });
};

router.post("/sendOTP", (req, res) => {
  const { type, service_id } = req.body;
  console.log(req.body)
  let databaseType = null;
  if (type == "admin") {
    databaseType = Admin;
  } else {
    databaseType = Counsellor;
  }
  const otp = randomInt(100000, 999999);
  databaseType
    .findOneAndUpdate(
      { service_id },
      {
        $set: {
          otp,
          otpExpiration: Date.now() + 600000,
          otpVerified: false,
        },
      },
      {
        new: true,
      }
    )
    .then((user) => {
      console.log(user);
        if(user){
      sendEmail(service_id, otp)
        .then((result) => {
          console.log(result);
          return res.status(200).json({ message: "OTP Sent" });
        })
        .catch((err) => {
            return res.status(404).json({ error: err });
        });
    }
    else{
        return res.status(404).json({ error:"User Not found" });
    }
    });
});

router.post("/verifyOTP", (req, res) => {
  const { type, service_id, otp, password } = req.body;
  let databaseType = null;
  if (type == "admin") {
    databaseType = Admin;
  } else {
    databaseType = Counsellor;
  }

  const cryptedPassword = sha256(password);
  databaseType.findOne({ service_id, otp, otpVerified: false }).then((user) => {
    if (!user || user.otpExpiration < Date.now()) {
      return res.status(404).json({ error: "Invalid OTP" });
    } else {
      databaseType
        .findOneAndUpdate(
          { service_id, otp },
          {
            $set: {
              otpVerified: true,
              password: cryptedPassword,
            },
          }
        )
        .then((user) => {
          return res.status(200).json({ message: "Password changed Successfully" });
        });
    }
  });
});

module.exports = router;
