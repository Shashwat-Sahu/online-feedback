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
    }
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

router.post("/getCounselee", verifyToken, (req, res) => {
  const service_id = req.body.service_id;
  const course_name = req.body.course_name;
  const filters_applied = req.body.filters_applied;
  console.log(service_id, course_name, filters_applied);
  if (filters_applied) {
    Counselee.find({ course_name: { $in: course_name } }).then((counselees) => {
      const serviceIds = counselees.map((item) => item.service_id);
      serviceIds.push(service_id);
      FeedbackReport.find({ service_id: { $in: serviceIds } }).then(
        async (reports) => {
          const finalReports = reports.map(async (report) => {
            const counselee_details = counselees.find(
              (item) => item.service_id == report.service_id
            );
            const counsellor_details = await Counsellor.find({
              service_id: report.counsellor_service_id,
            }).select("name rank service_id");
            return {
              report,
              course_name: counselee_details.course_name,
              counselee_details,
              counsellor_details,
            };
          });
          const data = await Promise.all(finalReports);
          return res.status(200).json({ data: data });
        }
      );
    });
  } else
    FeedbackReport.find({ service_id }).then(async (reports) => {
      const serviceIds = reports.map((item) => item.service_id);
      Counselee.find({ service_id: { $in: serviceIds } }).then(
        async (counselees) => {
          const finalReports = await Promise.all(
            reports.map(async (report) => {
              const counselee_details = counselees.find(
                (item) => item.service_id == report.service_id
              );
              const counsellor_details = await Counsellor.find({
                service_id: report.counsellor_service_id,
              })
                .select("name rank service_id")
                .then((data) => data[0]);

              return {
                report,
                course_name: counselee_details.course_name,
                counselee_details,
                counsellor_details,
              };
            })
          );

          return res.status(200).json({ data: data });
        }
      );
    });
});

router.put("/updateCounseleeToCounsellor", async (req, res) => {
  const {
    new_counsellor_service_id,
    old_counsellor_service_id,
    counselee_service_id,
  } = req.body;
  Counsellor.find({
    service_id: old_counsellor_service_id,
    counselee_list: counselee_service_id,
  }).then((data) => {
    console.log(data);
    if (data?.length == 0)
      return res
        .status(404)
        .json({
          error:
            "Not Found " +
            counselee_service_id +
            " in " +
            old_counsellor_service_id,
        });

    Counsellor.findOneAndUpdate(
      { service_id: new_counsellor_service_id ,counselee_list:{$ne:counselee_service_id}},
      {
        $push: {
          counselee_list: counselee_service_id,
        },
      },
      {
        new: true,
      }
    ).then((data) => {
      if (data?.length == 0)
        return res
          .status(404)
          .json({ error: "Not Found " + new_counsellor_service_id });
      else {
        Counsellor.findOneAndUpdate(
          { service_id: old_counsellor_service_id },
          {
            $pull: {
              counselee_list: counselee_service_id,
            },
          },
          {
            new: true,
          }
        ).then((_) => {
          if (_)
            return res.status(200).json({ message: "Updated Successfully" });
        });
      }
    });
  });
});

module.exports = router;
