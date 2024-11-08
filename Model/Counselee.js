const mongoose = require("mongoose");

const CounseleeSchema = new mongoose.Schema({
  service_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  rank: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  mo_name: {
    type: String,
  },
  m_occ: {
    type: String,
  },
  fo_name: {
    type: String,
  },
  f_occ: {
    type: String,
  },
  si_name: {
    type: String,
  },
  si_occ: {
    type: String,
  },
  qualification: {
    type: String,
  },
  academic_marks: {
    type: Number,
  },
  pro_extra_co_marks: {
    type: Number,
  },
  kpi: {
    type: Number,
  },
  course_name:{
    type:String,
  }
});

mongoose.model("Counselee", CounseleeSchema);
