const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Counsellor = mongoose.model("Counsellor");
const Counselee = mongoose.model("Counselee");
const HOF = mongoose.model("HOF");
const CI = mongoose.model("CI");
const FeedbackReport = mongoose.model("FeedbackReport");
const verifyToken = require("../Middleware/VerifyTokenHof");

const sha256 = require("sha256");

router.get("/getReports", verifyToken, (req, res) => {
  FeedbackReport.find({ report_hof: req.hof.service_id })
    .sort({ created_at: -1 })
    .then((data) => {
      res.json({ reports: data, hof: req.hof });
    });
});

router.get("/getReport", verifyToken, (req, res) => {
  const report_id = req.query._id;
  FeedbackReport.findById(report_id).then((data) => {
    res.send(data);
  });
});

router.put("/updateReport", verifyToken, (req, res) => {
  const { report_id, hof_comments, report_ci } = req.body;
  FeedbackReport.find({ _id: report_id, ci_comments: "" }).then((data) => {
    if (data.length > 0) {
      FeedbackReport.findByIdAndUpdate(
        report_id,
        {
          $set: {
            hof_comments,
            report_ci,
          },
        },
        {
          new: true,
        },
      )
        .then((data) => {
          res.json({ message: "Updated Successfully", report: data });
        })
        .catch((err) => {
          res.status(500).json({ error: "Error occurred" });
        });
    } else {
      res.status(403).json({ error: "Report can't be modified now!" });
    }
  });
});

router.get("/getfeedback", verifyToken, (req, res) => {
  const service_id = req.query.service_id;
  const report_hof = req.query.hof_service_id;
  FeedbackReport.find({ service_id })
    .sort({ created_at: -1 })
    .then((data) => {
      res.send(data);
    });
});

router.get("/getAllCi", verifyToken, (req, res) => {
  CI.find()
    .select("-password")
    .then((data) => {
      res.json({ CI: data });
    });
});
module.exports = router;
