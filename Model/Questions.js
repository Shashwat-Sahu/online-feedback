const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    gradeRequired: {
      type: Boolean,
      default: false,
    },
    grade: [
      {
        type: String,
      },
    ],
  },

  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

mongoose.model("CounsellingQuestions", questionSchema);
