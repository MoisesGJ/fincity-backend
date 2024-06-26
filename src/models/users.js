const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Schema } = mongoose

const userSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      maxLength: [10, 'User cannot have more than 10 characters']
    },
    first_name: {
      type: String,
      required: [true, 'First Name is required'],
      match: [/^[\p{L}\-]+$/u, 'Only letters and hyphens allowed.'],
      maxLength: [50, 'First Name cannot have more than 50 characters']
    },
    last_name: {
      type: String,
      match: [/^[\p{L}\-]+$/u, 'Only letters and hyphens allowed.'],
      maxLength: [50, 'Last Name cannot have more than 50 characters']
    },
    email: {
      type: String
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

userSchema.index({ user: 1, email: 1 }, { unique: true })

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

const User = mongoose.model('users', userSchema)

module.exports = User
