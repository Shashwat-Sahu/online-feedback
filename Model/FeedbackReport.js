const mongoose = require("mongoose")

const feedBackReport = new mongoose.Schema({
    service_id:{
        type:Number,
    },
    counsellor_service_id:{
        type:Number
    },
    counselling_session: [
        {
            qna: [
                {
                    question: {
                        type: String
                    },
                    answer: {
                        type: String
                    }
                }

            ]
        }
    ]
},{
    timestamps:{ createdAt: 'created_at', updatedAt: 'updated_at' }
})

mongoose.model("FeedbackReport",feedBackReport)