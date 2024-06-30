import User from '../models/users.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'

async function getAll() {
  const allUsers = await User.find()
  return allUsers
}

async function create(userData) {
  const newUser = await User.create(userData)
  return newUser
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const user = await User.findById(id)
  return user
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }
  const userdeleted = await User.findByIdAndDelete(id)

  if (!userdeleted) throw new createError(404, 'User not found')

  return userdeleted
}

async function update(id, newdata) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const userupdated = await User.findByIdAndUpdate(id, newdata, {
    new: true
  })

  return userupdated
}

export default {
  getAll,
  create,
  getById,
  deleteById,
  update
}
