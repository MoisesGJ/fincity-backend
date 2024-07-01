import mongoose from 'mongoose'
const { Schema } = mongoose

const weeklyTaskSchema = new Schema(
  {
    group: {
      type: Schema.Types.ObjectId,
      ref: 'groups'
    },
    start_date: {
      type: Date,
      required: [true, 'Start Date is required']
    },
    final_date: {
      type: Date,
      required: [true, 'Final Date is required']
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    },
    times_per_week: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

const WeeklyTask = mongoose.model('weekly_tasks', weeklyTaskSchema)

export default WeeklyTask