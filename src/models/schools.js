const { Schema, model } = require('mongoose')

const schoolSchema = new Schema({
  school_name: {
    type: String,
    required: [true, 'El nombre de la escuela es obligatorio'],
    maxlength: [
      100,
      'El nombre de la escuela no puede exceder los 100 caracteres'
    ]
  }
})

const School = model('schools', schoolSchema)

module.exports = School
