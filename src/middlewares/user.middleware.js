import jwt from 'jsonwebtoken'

export default async function validUser(req, res, next) {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).send({
        error: {
          message: 'No auth provider'
        }
      })
    }

    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SIGN, (err, payload) => {
      if (err) {
        return res.status(403).json({
          expireSess: true,
          error: {
            message: 'Invalid auth'
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
