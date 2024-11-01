const mongoose = require("mongoose");

const CounsellerSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  counselee_list: [
    {
      type: Number,
    },
  ],
  otp:{
    type:Number,
    require: false
  },
  otpExpiration:{
    type:Date,
    require:false
  },
  otpVerified:{
    type:Boolean,
    default:false
  }
});

mongoose.model("Counsellor", CounsellerSchema);
