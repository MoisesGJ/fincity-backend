import Student from '../models/students.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'

async function getAll() {
  const allStudents = await Student.find()
    .populate('student')
    .populate('avatar')
  return allStudents
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const student = await Student.findById(id).populate('student')

  return student
}

export default {
  getAll,
  getById
}
