import User from '../models/users.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'
import { Resend } from 'resend'

import JWT from '../lib/jsonwebtoken.js'
import templateHtml from '../lib/email/email-template.html.js'
import Group from '../models/groups.model.js'
import Student from '../models/students.model.js'
import Role from '../models/roles.model.js'

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

function createUser(fn, ln) {
  return `${fn.slice(0, 3)}${ln.slice(0, 3)}`.toLowerCase()
}
function generatePassword(firstName, lastName) {
  const firstPart = firstName.slice(0, 3)
  const lastPart = lastName.slice(0, 3)

  const randomNumber = Math.floor(100 + Math.random() * 900) // 100-999

  const password = `${firstPart}${lastPart}${randomNumber}`

  //return password

  return `${firstName.slice(0, 4)}${lastName.slice(0, 4)}`.toLowerCase()
}

async function createStudents(id, studentsGroup) {
  const group = await Group.findOne({ teacher: id })

  const users = await Promise.all(
    studentsGroup.map(async ({ first_name, last_name }) => {
      const newUser = {
        role: '6676ee2f23f3b664bbf5f50c',
        user: createUser(first_name, last_name),
        password: generatePassword(first_name, last_name),
        first_name,
        last_name,
        group: group._id
      }

      const user = await User.create(newUser)

      if (!user) throw new Error()

      return user
    })
  )

  const usersStudents = users.map(({ _id }) => {
    return { student: _id, group: group._id }
  })

  const students = await Student.insertMany(usersStudents)

  return students
}

async function getRoleById(id) {
  const { role } = await User.findById(id)

  const { description } = await Role.findById(role)

  return description
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
  createStudents,
  getRoleById
}
