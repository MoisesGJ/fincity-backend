const { Schema, Types, model } = require('mongoose')

const studentsTasksSchema = new Schema({
  student: {
    type: Types.ObjectId,
    ref: 'students',
    required: [true, 'El estudiante es obligatorio']
  },
  weekly_task: {
    type: Types.ObjectId,
    ref: 'weekly_tasks',
    required: [true, 'La tarea semanal es obligatoria']
  },
  status: {
    type: Boolean,
    default: false
  }
})

const StudentTasks = model('students_tasks', studentsTasksSchema)

module.exports = StudentTasks
