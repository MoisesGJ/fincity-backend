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

async function login({ user, email, password }) {
  if ((!email && !user) || !password) {
    throw new createError(400, 'Email or User, and Password are Required')
  }

  const userToLogin = await User.findOne({
    $or: [{ email: email || '' }, { user: user || '' }]
  })

  console.log(userToLogin)
  if (!userToLogin) {
    throw new createError(401, 'Invalid credentials')
  }

  const isPasswordValid = await User.isValidPassword(
    password,
    userToLogin.password
  )
  if (!isPasswordValid) {
    throw new createError(401, 'Invalid credentials')
  }

  const token = await User.createToken({
    _id: userToLogin._id,
    first_name: userToLogin.first_name
  })

  return {
    token,
    userId: userToLogin._id
  }
}

export default {
  getAll,
  create,
  getById,
  deleteById,
  update,
  login
}
