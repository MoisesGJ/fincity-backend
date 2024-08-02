import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const tutorSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, 'Full name is required'],
      maxLength: [100, 'Full Name cannot have more than 100 characters']
    },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

tutorSchema.index({ email: 1 }, { unique: true })

tutorSchema.pre('save', async function (next) {
  if (!this.email) {
    next(new Error('Either Email must be provided'))
  }
  next()
})

const Tutor = mongoose.model('Tutor', tutorSchema)

export default Tutor
