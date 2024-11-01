const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Counsellor = mongoose.model("Counsellor");
const Counselee = mongoose.model("Counselee");
const FeedbackReport = mongoose.model("FeedbackReport");
const verifyToken = require("../Middleware/VerifyTokenAdmin");

const Questions = mongoose.model("CounsellingQuestions");

router.get("/getCounsellors", verifyToken, (req, res) => {
  Counsellor.find()
    .select("-password -_id -counselee_list -__v")
    .then((data) => {
      return res.send(data);
    });
});

router.get("/getCounselees", verifyToken, (req, res) => {
  const service_id = req.query.service_id;
  Counsellor.find({ service_id })
    .select("counselee_list")
    .then((data) => {
      if (data.length > 0)
        Counselee.find({ service_id: { $in: data[0].counselee_list } })
          .select("-_id -__v")
          .then((data) => {
            return res.send(data);
          });
    });
});

router.get("/getQuestions", verifyToken, (req, res) => {
  Questions.find()
    .sort({ updated_at: -1 })
    .then((data) => {
      res.send(data);
    });
});

router.put("/updateQuestions", verifyToken, (req, res) => {
  const { question, gradeRequired, grade } = req.body;
  Questions.findOneAndUpdate(
    { question: question },
    {
      $set: {
        question,
        gradeRequired,
        grade,
      },
    },
    {
      new: true,
      upsert: true,
    },
  ).then((data) => {
    if (!data)
      return res.status(404).json({ error: "Not Found " + service_id });
    if (data) {
      return res.status(200).json({ message: "Sumbitted Successfully" });
    }
  });
});

router.delete("/deleteQuestion", verifyToken, (req, res) => {
  const id = req.query.id;
  Questions.findByIdAndDelete(id).then((data) => {
    if (!data) return res.status(404).json({ error: "Not Found " + question });
    else {
      return res.status(200).json({ message: "Deleted Successfully" });
    }
  });
});


router.get("/getCounselee",verifyToken, (req,res)=>{
  const service_id = req.query.service_id;
  FeedbackReport.find({ service_id}).then(reports=>{
    res.status(200).json({ data:(reports)})
  })
})
module.exports = router;
