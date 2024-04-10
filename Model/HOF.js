const mongoose = require("mongoose")

const HOFSchema = new mongoose.Schema({
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

mongoose.model("HOF",HOFSchema);