const mongoose = require('mongoose')
const { Schema } = mongoose

const studentPurchaseSchema = new mongoose.Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'students'
  },
  purchase: {
    type: Schema.Types.ObjectId,
    ref: 'purchases-items'
  }
})

const studentPurchases = mongoose.model(
  'studentPurchases',
  studentPurchaseSchema
)
module.exports = studentPurchases
