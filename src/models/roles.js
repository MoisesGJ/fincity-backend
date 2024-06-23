const mongoose = require('mongoose')
const { Schema } = mongoose

const roleSchema = new Schema(
  {
    description: {
      type: String,
      maxLength: 20,
      required: true,
      unique: true
    },
    page: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Role = mongoose.model('roles', roleSchema)

module.exports = Role
