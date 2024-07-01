import School from '../models/schools.model.js'
import createError from 'http-errors'
import mongoose from 'mongoose'

async function getAll() {
  const allSchools = await School.find()

  return allSchools
}

async function create(schoolData) {
  const newSchool = await School.create(schoolData)
  return newSchool
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const school = await School.findById(id)
  return school
}

async function deleteById(id) {
  if (!moongose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }
  const schoolDeleted = await School.findByIdAndDelete(id)

  if (!schoolDeleted) throw new createError(404, 'School not found')

  return schoolDeleted
}

async function update(id, newdata) {
  if (!moongose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const schoolDeleted = await School.findByIdAndUpdate(id, newdata, {
    new: true
  })

  return schoolDeleted
}

export default {
  getAll,
  create,
  getById,
  deleteById,
  update
}
