import express from 'express'
import users from '../use-cases/users.use-cases.js'

const router = express.Router()

// GET /users
router.get('/', async (request, response) => {
  try {
    const allUsers = await users.getAll()

    response.json({
      message: 'Users list',
      ok: true,
      data: {
        users: allUsers
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// POST /users
router.post('/', async (request, response) => {
  try {
    const userData = request.body
    const newUser = await users.create(userData)

    response.status(201)
    response.json({
      message: 'User created',
      ok: true,
      data: {
        user: newUser
      }
    })
  } catch (error) {
    response.status(error.name === 'ValidationError' ? 400 : 500)

    response.json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

export default router
