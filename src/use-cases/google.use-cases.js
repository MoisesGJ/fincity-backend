import User from '../models/users.model.js'
import createError from 'http-errors'
import mongoose from 'mongoose'

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const user = await User.findOne({ googleId: id })
  return user
}

export default {
  getById
}
