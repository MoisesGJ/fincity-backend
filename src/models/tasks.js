const mongoose = require ('mongoose')
const {Schema} = mongoose

const tasks = new mongoose.Schema(
    {
        group:{
            type: Schema.Types.ObjectId,
            ref:'groups'
        },
        task_name:{
            type: String, 
            required: true
        },
        value:{
            type: Number, 
            required: true
        }, 
        times_per_week:{
            type: Number, 
            required: true
        },
        description:{
            type: String, 
        }, 
        status:{
            type: Boolean,
            required: true
        }
    }
)