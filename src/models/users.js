const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      unique: [true, 'User must be unique'],
      maxLength: [10, 'First Name cannot have more than 10 characters']
    },
    first_name: {
      type: String,
      required: [true, 'First Name is required'],
      match: [/^[A-Za-z]+$/, 'Only letters allowed.'],
      maxLength: [50, 'First Name cannot have more than 50 characters']
    },
    last_name: {
      type: String,
      match: [/^[A-Za-z]+$/, 'Only letters allowed.'],
      maxLength: [50, 'First Name cannot have more than 50 characters']
    },
    email: {
      type: String,
      unique: [true, 'Email already exists']
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'roles'
    }
  },
  {
    timestamps: true,
    statics: {
      encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(15)
        return await bcrypt.hash(password, salt)
      },
      isValidPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash)
      },
      createToken: async (payload) => {
        const token = process.env.JWT_SIGN
        return jwt.sign(payload, token, { expiresIn: '1h' })
      }
    }
  }
)

const User = mongoose.model('users', userSchema)

model.exports = User
