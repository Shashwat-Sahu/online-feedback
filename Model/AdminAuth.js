const mongoose = require("mongoose");

const AdminAuthSchema = new mongoose.Schema({
  service_id: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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

mongoose.model("AdminAuth", AdminAuthSchema);