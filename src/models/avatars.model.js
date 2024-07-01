import mongoose from 'mongoose'
const { Schema } = mongoose

const avatarSchema = new Schema({
  avatar: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
})

const Avatar = mongoose.model('avatars', avatarSchema)

export default Avatar
