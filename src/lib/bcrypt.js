import bcrypt from 'bcrypt'

export async function encodePIN(plainPassword) {
  const salt = await bcrypt.genSalt(15)
  return await bcrypt.hash(plainPassword, salt)
}

export async function decodePIN(plainPassword, hash) {
  const isValid = await bcrypt.compare(plainPassword, hash)
  return isValid
}
