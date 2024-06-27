const mongoose = require('mongoose')
const { Schema } = mongoose

const taskSchema = new mongoose.Schema({
  group: {
    type: Schema.Types.ObjectId,
    ref: 'groups'
  },
  task_name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  times_per_week: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: Boolean,
    required: true
  }
})

const Tasks = mongoose.model('tasks', taskSchema)
module.exports = Tasks
