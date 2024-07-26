import Student from '../models/students.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'

import Group from '../models/groups.model.js'

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

async function getByProfesor(id) {
  const group = await Group.findOne({ teacher: id })

  if (!group) throw new Error('No existe grupo')

  const students = await Student.find({ group: group._id }).populate('student')

  const studentsArr = students.map(({ _id, student }) => {
    const { user, first_name, last_name } = student

    return { _id, user, first_name, last_name }
  })

  console.log(studentsArr)

  return studentsArr
}

export default {
  getAll,
  getById,
  getByProfesor
}
