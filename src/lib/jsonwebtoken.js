import jwt from 'jsonwebtoken'

export default function generateAccessToken(payload, exp) {
  const token = jwt.sign(payload, process.env.TOKEN_EMAIL_SECRET, {
    expiresIn: exp
  })

  const buf = Buffer.from(token, 'utf8')

  return buf.toString('base64')
}
