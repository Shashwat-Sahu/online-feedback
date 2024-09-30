const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const VerifyTokenUser = require("../Middleware/VerifyTokenUser");
const FeedbackReport = mongoose.model("FeedbackReport");
const Questions = mongoose.model("CounsellingQuestions");

router.post("/feedbackreport", VerifyTokenUser, (req, res) => {
  const {
    service_id,

    counsellor_service_id,
    counselling_session,
  } = req.body;

  if (!service_id)
    return res.status(422).json({ error: "Service ID is empty" });

  FeedbackReport.findOneAndUpdate(
    { service_id, counsellor_service_id },
    {
      counsellor_service_id,
      service_id,
      counselling_session,
      $push: {
        counselling_session_timestamp: new Date(),
      },
    },
    {
      new: true,
      upsert: true,
    },
  ).then((data) => {
    if (!data)
      return res.status(404).json({ error: "Not Found " + service_id });
    if (data)
      return res.status(200).json({ message: "Added Record Successfully" });
  });
});

router.get("/getfeedback", VerifyTokenUser, (req, res) => {
  const service_id = req.query.service_id;
  const counsellor_service_id = req.query.counsellor_service_id;
  FeedbackReport.find({ service_id, counsellor_service_id }).then((data) => {
    var val = data.length > 0 ? data[0] : null;
    res.send(val);
  });
});

router.get("/getQuestions", VerifyTokenUser, (req, res) => {
  Questions.find()
    .select("-_id")
    .then((data) => {
      res.send(data);
    });
});

module.exports = router;
