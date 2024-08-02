import Tutor from '../models/tutors.model.js'
import createError from 'http-errors'
import mongoose from 'mongoose'

import { encodePIN } from '../lib/bcrypt.js'

async function update(id, newdata) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid id')
  }

  const tutorUpdated = await Tutor.findByIdAndUpdate(id, newdata, {
    new: true
  })

  return tutorUpdated
}

async function createPIN(id, pin) {
  const PINExists = await Tutor.findById(id)

  if (PINExists.password)
    throw new createError(400, 'Ya tiene un PIN registrado')

  const pinHash = await encodePIN(pin)

  await update(id, { password: pinHash })
}

export default {
  update,
  createPIN
}
