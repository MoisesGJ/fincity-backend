import User from '../models/users.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'

import generateAccessToken from '../lib/jsonwebtoken.js'
import templateHtml from '../lib/email/templates/email.template.html.js'
import Role from '../models/roles.model.js'
import Email from '../lib/email/sendEmail.js'

async function createToken(id, name) {
  return await User.createToken({
    _id: id,
    first_name: name
  })
}

async function getByEmail(emailUser) {
  const userExists = await User.findOne({ email: emailUser })
  return userExists
}

async function getByAccessToken(accessToken) {
  const userExists = await User.findOne({ googleId: accessToken })

  const token = await createToken(userExists._id, userExists.first_name)

  const userResponse = {
    id: userExists._id,
    user: userExists.user,
    emailVerified: userExists.emailVerified,
    first_name: userExists.first_name,
    last_name: userExists.last_name,
    role: userExists.role,
    token
  }

  return userResponse
}

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

  if (userToLogin.googleId) throw new createError(401, 'Invalid credentials')

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

  const token = await createToken(userToLogin._id, userToLogin.first_name)

  const userResponse = {
    id: userToLogin._id,
    user: userToLogin.user,
    emailVerified: userToLogin.emailVerified,
    first_name: userToLogin.first_name,
    last_name: userToLogin.last_name,
    role: userToLogin.role,
    token
  }

  return userResponse
}

async function validate(id) {
  const user = await getById(id)

  if (user) return await update(id, { emailVerified: true })
}

async function getRoleById(id) {
  const { role } = await User.findById(id)

  const { description } = await Role.findById(role)

  return description
}

async function sendEmail(idUser) {
  const userToEmail = await getById(idUser)

  if (userToEmail.emailVerified)
    throw new createError(400, 'El correo ya está validado')

  //Link
  const token = generateAccessToken({ idUser }, '5m')

  const link = `${process.env.URL_EMAIL}/${token}`

  const email = await Email(
    [userToEmail.email],
    'Empieza por aquí...',
    templateHtml(link)
  )

  return email
}

export default {
  getByEmail,
  getByAccessToken,
  getAll,
  create,
  getById,
  deleteById,
  update,
  createToken,
  login,
  validate,
  sendEmail,
  getRoleById
}
