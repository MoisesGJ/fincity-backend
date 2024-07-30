import mongoose from 'mongoose'
const { Schema, model } = mongoose

const schoolSchema = new Schema({
  school_name: {
    type: String,
    required: [true, 'El nombre de la escuela es obligatorio'],
    match: [/^[a-zA-Z0-9\s\-'""]+$/, 'El nombre de la escuela no es válido'],
    minlength: [3, 'El nombre de la escuela debe tener al menos 3 caracteres'],
    maxlength: [
      50,
      'El nombre de la escuela no puede exceder los 50 caracteres'
    ]
  }
})

const School = model('schools', schoolSchema)

export default School
