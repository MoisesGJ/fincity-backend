import mongoose from 'mongoose'
const { Schema } = mongoose

const studentPurchasesSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'students'
  },
  weekly_task: {
    type: Schema.Types.ObjectId,
    ref: 'weekly-tasks'
  },
  status: {
    type: Boolean,
    required: true
  }
})

const StudentPurchase = mongoose.model(
  'studentPurchases',
  studentPurchasesSchema
)

export default StudentPurchase
