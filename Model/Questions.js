const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    question:{
        type:String
    },
    gradeRequired:{
        type:Boolean,
        default:false
    },
     grade:[
        {
            type:String
        }
     ]
})

mongoose.model("CounsellingQuestions",questionSchema);