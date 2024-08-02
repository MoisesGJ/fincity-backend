import mongoose from 'mongoose'
import User from './users.model.js'
import Group from './groups.model.js'
import Avatar from './avatars.model.js'
import Tutor from './tutors.model.js'

const { Schema, Types } = mongoose

const StudentSchema = new Schema({
  group: {
    type: Types.ObjectId,
    ref: 'Group',
    required: [true, 'El grupo es obligatorio'],
    validate: {
      validator: async function (groupId) {
        const group = await Group.findById(groupId)
        return !!group
      },
      message: 'Group does not exist'
    }
  },
  student: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'El estudiante es obligatorio'],
    validate: {
      validator: async function (studentId) {
        const student = await User.findById(studentId)
        return !!student
      },
      message: 'Student does not exist'
    }
  },
  parent: {
    type: Types.ObjectId,
    ref: 'Tutor',
    required: [true, 'El padre es obligatorio'],
    validate: {
      validator: async function (parentId) {
        const parent = await Tutor.findById(parentId)
        return !!parent
      },
      message: 'Parent does not exist'
    }
  }
  /* avatar: {
    type: Types.ObjectId,
    ref: 'Avatar',
    validate: {
      validator: async function (avatarId) {
        const avatar = await Avatar.findById(avatarId)
        return !!avatar
      },
      message: 'Avatar does not exist'
    }
  }*/
})

const Student = mongoose.model('students', StudentSchema)

export default Student
