const mongoose = require("mongoose");

const feedBackReport = new mongoose.Schema(
  {
    service_id: {
      type: Number,
    },
    counsellor_service_id: {
      type: Number,
    },
    counselling_session: [
      [
        {
          question: {
            type: String,
          },
          other: {
            type: Boolean,
          },
          answer: {
            type: String,
          },
          grade: {
            type: String,
            default: null,
          },
          gradeRequired: {
            type: Boolean,
            default: false,
          },
        },
      ],
    ],
    counselling_session_timestamp: [
      {
        type: Date,
        default: new Date(),
      },
    ],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

mongoose.model("FeedbackReport", feedBackReport);
