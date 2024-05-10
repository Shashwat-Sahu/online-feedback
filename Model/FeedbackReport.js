const mongoose = require("mongoose")

const feedBackReport = new mongoose.Schema({
    service_id:{
        type:Number,
    },
    counsellor_service_id:{
        type:Number
    },
    "academics": {
        type:String
    },
    "projects": {
        type:String
    },
    "sick_report": {
        type:String
    },
    "olq": {
        type:String
    },
    "games": {
        type:String
    },
    "cultural": {
        type:String
    },
    "financial": {
        type:String
    },
    "personal": {
        type:String
    },
    "hof_comments":{
        type:String,
        default:""
    },
    "ci_comments":{
        type:String,
        default:""
    },
    "ds_comments":{
        type:String
    },
    "report_hof":{
        type:Number
    },
    "report_ci":{
        type:Number
    }
},{
    timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
})

mongoose.model("FeedbackReport",feedBackReport)