import User from '../models/users.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'
import { Resend } from 'resend'

import JWT from '../lib/jsonwebtoken.js'
import templateHtml from '../lib/email/email-template.html.js'

async function getByEmail(emailUser) {
  const userExists = await User.findOne({ email: emailUser })
  return userExists
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

async function createToken(id, name) {
  return await User.createToken({
    _id: id,
    first_name: name
  })
}

async function login({ user, email, password }) {
  if ((!email && !user) || !password) {
    throw new createError(400, 'Email or User, and Password are Required')
  }

  const userToLogin = await User.findOne({
    $or: [{ email: email || '' }, { user: user || '' }]
  })

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

async function magicLink(baseUrl, idUser) {
  const token = JWT.generateAccessToken(idUser)

  return `${baseUrl}/auth/verification/${token}`
}

async function sendEmail(baseUrl, idUser) {
  const userToEmail = await getById(idUser)

  if (userToEmail.emailVerified) throw new Error('El correo ya está validado')

  const resend = new Resend(process.env.EMAIL_RESEND_API)

  const link = await magicLink(baseUrl, idUser)

  const { data, error } = await resend.emails.send({
    from: `FinCity <${process.env.EMAIL_RESEND_FROM}>`,
    to: [userToEmail.email],
    subject: 'Empieza por aquí...',
    html: templateHtml(link)
  })

  if (error) {
    throw new Error({ error: error.message })
  }

  return data
}

export default {
  getByEmail,
  getAll,
  create,
  getById,
  deleteById,
  update,
  createToken,
  login,
  validate,
  sendEmail
}
