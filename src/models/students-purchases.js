const mongoose = require('mongoose')
const { Schema } = mongoose

const studentPurchaseSchema = new mongoose.Schema({
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

const studentPurchases = mongoose.model(
  'studentPurchases',
  studentPurchaseSchema
)
module.exports = studentPurchases
