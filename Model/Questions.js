const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    question:{
        type:String
    }
})

mongoose.model("CounsellingQuestions",questionSchema);