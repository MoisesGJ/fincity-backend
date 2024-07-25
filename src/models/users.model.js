import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Role from './roles.model.js'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    user: {
      type: String,
      maxLength: [10, 'User cannot have more than 10 characters'],
      trim: true
    },
    first_name: {
      type: String,
      required: [true, 'First Name is required'],

      maxLength: [50, 'First Name cannot have more than 50 characters'],
      trim: true
    },
    last_name: {
      type: String,
      required: [true, 'Last Name is required'],
      maxLength: [50, 'Last Name cannot have more than 50 characters'],
      trim: true
    },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Email is invalid'],
      lowercase: true,
      trim: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters long'],
      trim: true
    },
    role: [
      {
        type: Schema.Types.ObjectId,
        ref: 'roles',
        required: [true, 'Role is required'],
        validate: {
          validator: async function (roleId) {
            const role = await Role.findById(roleId)
            return !!role
          },
          message: 'Role does not exist'
        }
      }
    ],
    googleId: {
      type: String,
      unique: true,
      trim: true
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

userSchema.index(
  { user: 1 },
  { unique: true, partialFilterExpression: { user: { $type: 'string' } } }
)
userSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $type: 'string' } } }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    this.password = await User.encryptPassword(this.password)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.pre('save', async function (next) {
  if (!this.user && !this.email) {
    next(new Error('Either User or Email must be provided'))
  }
  next()
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

const User = mongoose.model('User', userSchema)

export default User
