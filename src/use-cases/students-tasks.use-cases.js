import StudentTasks from '../models/students-tasks.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'

async function getAll() {
  const allStudentTask = await StudentTasks.find()
  return allStudentTask
}

async function create(studentTaskData) {
  const newStudentTask = await StudentTasks.create(studentTaskData)
  return newStudentTask
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const studentTask = await StudentTasks.findById(id).populate('weekly_task')
  return studentTask
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }
  const studentTaskDeleted = await StudentTasks.findByIdAndDelete(id)

  if (!studentTaskDeleted) throw new createError(404, 'Student Task not found')

  return studentTaskDeleted
}

async function update(id, newdata) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const studentTaskUpdated = await StudentTasks.findByIdAndUpdate(id, newdata, {
    new: true
  })

  if (!studentTaskUpdated) throw new createError(404, 'Student Task not found')

  return studentTaskUpdated
}

export default {
  getAll,
  create,
  getById,
  deleteById,
  update
}
