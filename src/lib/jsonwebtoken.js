import jwt from 'jsonwebtoken'

function generateAccessToken(id) {
  const token = jwt.sign({ id }, process.env.TOKEN_EMAIL_SECRET, {
    expiresIn: '1h'
  })

  const buf = Buffer.from(token, 'utf8')

  return buf.toString('base64')
}

export default {
  generateAccessToken
}
