const mongoose = require ('mongoose')
const {Schema} = mongoose

const studentPurchases = new Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref:'students'
    },
    weekly_task:{
        type: Schema.Types.ObjectId,
        ref: 'weekly-tasks'
    }, 
    status:{
        type:Boolean, 
        required: true
    }
}
)