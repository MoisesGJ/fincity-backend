const { Schema, Types, model } = require('mongoose')

const groupsSchema = new Schema({
  school: {
    type: Types.ObjectId,
    ref: 'schools',
    required: [true, 'La escuela es obligatoria']
  },
  school_grade: {
    type: Types.ObjectId,
    ref: 'school_grades',
    required: [true, 'El grado escolar es obligatorio']
  },
  description: {
    type: String,
    maxlength: [10, 'La cantidad de caracteres excede los requeridos (10)'],
    required: [true, 'La descripción es obligatoria']
  },
  teacher: {
    type: Types.ObjectId,
    ref: 'teachers',
    required: [true, 'El profesor es obligatorio']
  },
  status: {
    type: Boolean,
    default: false
  }
})

const Group = model('groups', groupsSchema)

module.exports = Group
