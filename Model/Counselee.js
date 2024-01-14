const mongoose = require("mongoose")

const CounseleeSchema = new mongoose.Schema({
    service_id:{
        type:Number,
        unique:true
    },
    name: {
        type:String
    },
    rank:{
        type:String
    }
})

mongoose.model("Counselee",CounseleeSchema);