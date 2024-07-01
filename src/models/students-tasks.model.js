import mongoose from 'mongoose'
const { Schema, Types, model } = mongoose

import WeeklyTask from './weekly-tasks.model.js'
import Student from './students.model.js'

const studentsTasksSchema = new Schema({
  student: {
    type: Types.ObjectId,
    ref: 'students',
    required: [true, 'El estudiante es obligatorio'],
    validate: {
      validator: async function (studentId) {
        const student = await Student.findById(studentId)
        return !!student
      },
      message: 'Student does not exist'
    }
  },
  weekly_task: {
    type: Types.ObjectId,
    ref: 'weekly_tasks',
    required: [true, 'La tarea semanal es obligatoria'],
    validate: {
      validator: async function (weeklyTaskId) {
        const weeklyTask = await WeeklyTask.findById(weeklyTaskId)
        return !!weeklyTask
      },
      message: 'Weekly Task does not exist'
    }
  },
  status: {
    type: Boolean,
    default: false
  }
})

const StudentTasks = model('students_tasks', studentsTasksSchema)

export default StudentTasks
