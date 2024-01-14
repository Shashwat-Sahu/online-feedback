const mongoose = require("mongoose")

const AdminAuthSchema = new mongoose.Schema({
    service_id:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("AdminAuth",AdminAuthSchema);