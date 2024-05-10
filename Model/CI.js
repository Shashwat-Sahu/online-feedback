const mongoose = require("mongoose")

const CISchema = new mongoose.Schema({
    service_id:{
        type:Number,
        unique:true
    },
    name: {
        type:String
    },
    password:{
        type:String,
        required:true
    },
})

mongoose.model("CI",CISchema);