import Student from '../models/students.model.js'
import mongoose from 'mongoose'
import createError from 'http-errors'

import Group from '../models/groups.model.js'
import User from '../models/users.model.js'
import Tutor from '../models/tutors.model.js'

import Email from '../lib/email/sendEmail.js'
import generateAccessToken from '../lib/jsonwebtoken.js'
import templateHtml from '../lib/email/templates/tutorwelcome.template.html.js'
import createCSV from '../lib/csv-writer/createcsv.js'

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

//Create STUDENTS

async function createStudents(id, studentsGroup) {
  function normalize(srt) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }
  function createUser(fn, ln) {
    const user = `${fn}${ln.slice(0, 3)}`.toLowerCase()
    return normalize(user)
  }
  function generatePassword(firstName, lastName) {
    const randomChar = Math.floor(1 + Math.random() * lastName.length)
    const firstPart = firstName.slice(0, 3)
    const lastPart = lastName.slice(0, randomChar)

    const randomNumber = Math.floor(100 + Math.random() * 900)

    const password = `${randomNumber}${firstPart}${randomNumber}${lastPart}${randomNumber}`

    return normalize(password)
  }

  const group = await Group.findOne({ teacher: id })

  if (!group) throw new createError(400, 'El grupo no existe')

  const users = await Promise.all(
    studentsGroup.map(
      async ({ first_name, last_name, tutor_full_name, tutor_email }) => {
        if (!first_name || !last_name || !tutor_full_name || !tutor_email)
          throw new createError('Alguno de los datos no son válidos')

        const password = generatePassword(first_name, last_name)
        const userAuth = createUser(first_name, last_name)

        const newUser = {
          role: '6676ee2f23f3b664bbf5f50c',
          user: userAuth,
          password,
          first_name,
          last_name,
          group: group._id
        }

        const user = await User.create(newUser)

        if (!user) throw new Error('Error al crear un nuevo usuario')

        const newTutor = await Tutor.create({
          full_name: tutor_full_name,
          email: tutor_email
        })

        if (!newTutor) throw new createError(400, 'Error al crear tutor')

        //Envía un correo al tutor
        const token = generateAccessToken(
          { id: newTutor._id, children: user._id },
          '3d'
        )

        const link = `${process.env.URL_TUTOR}/${token}`

        await Email(
          [newTutor.email],
          '¡Saludos desde FinCity!',
          templateHtml(link, newTutor.full_name.split(' ')[0])
        )

        const student = await Student.create({
          student: user._id,
          group: group._id,
          parent: newTutor._id
        })

        if (!student)
          throw new createError(400, 'Hubo un error al crear un estudiante')

        return {
          full_name: `${user.first_name} ${user.last_name}`,
          user: userAuth,
          password
        }
      }
    )
  )

  const csv = createCSV(users)

  return csv
}

export default {
  getById,
  getByProfesor,
  createStudents
}
