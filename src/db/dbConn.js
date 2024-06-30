import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const URI = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@gen31js.ng7osxl.mongodb.net/${process.env.DATABASE}`

export const connect = async () => {
  try {
    await mongoose.connect(URI) // No es necesario pasar opciones obsoletas
    console.log('Connection successfully.')
    return 'Connection successfully.'
  } catch (error) {
    console.error('Error connection failed', error)
    throw new Error('Error connection failed')
  }
}

export default connect
