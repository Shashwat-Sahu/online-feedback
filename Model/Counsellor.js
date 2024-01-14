const mongoose = require("mongoose")

const CounsellerSchema = new mongoose.Schema({
    service_id:{
        type:Number,
        unique:true
    },
    name: {
        type:String
    },
    rank:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    counselee_list:[
        {
            type:Number
        }
    ]
})

mongoose.model("Counsellor",CounsellerSchema);