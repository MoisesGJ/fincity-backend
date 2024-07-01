import mongoose from 'mongoose'
const { Schema, Types, model } = mongoose

import School from './schools.model.js'
import SchoolGrade from './school-grades.model.js'

const groupsSchema = new Schema({
  school: {
    type: Types.ObjectId,
    ref: 'schools',
    required: [true, 'La escuela es obligatoria'],
    validate: {
      validator: async function (schoolId) {
        const school = await School.findById(schoolId)
        return !!school
      },
      message: 'La escuela no existe'
    }
  },
  school_grade: {
    type: Types.ObjectId,
    ref: 'school_grades',
    required: [true, 'El grado escolar es obligatorio'],
    validate: {
      validator: async function (schoolGradesId) {
        const schoolGrades = await SchoolGrade.findById(schoolGradesId)
        return !!schoolGrades
      },
      message: 'El grado escolar no existe'
    }
  },
  description: {
    type: String,
    maxlength: [10, 'La cantidad de caracteres excede los requeridos (10)'],
    required: [true, 'La descripción es obligatoria']
  },
  /*teacher: {
    type: Types.ObjectId,
    ref: 'teachers',
    required: [true, 'El profesor es obligatorio']
  },*/
  status: {
    type: Boolean,
    default: false
  }
})

const Group = model('groups', groupsSchema)

export default Group
