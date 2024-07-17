import jwt from 'jsonwebtoken'

export default async function validTokenEmail(req, res, next) {
  try {
    const { authentication } = req.headers

    if (!authentication) {
      console.log('No header')
      return res.status(401).send({
        error: {
          message: 'Token is not provided'
        }
      })
    }

    const token = authentication.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_EMAIL_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).json({
          error: {
            message: 'Invalid token email'
          }
        })
      } else {
        req.user = payload
        next()
      }
    })
  } catch (error) {
    const tokenError = new Error(error)

    res.status(400).send({
      error: {
        message: `${tokenError}`
      }
    })
  }
}
