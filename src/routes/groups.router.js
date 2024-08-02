import express from 'express'
import groups from '../use-cases/groups.use-cases.js'
import validUser from '../middlewares/user.middleware.js'

const router = express.Router()

// GET /groups/:id
router.get('/', validUser, async (request, response) => {
  try {
    const id = request.user._id
    const group = await groups.getByProfesor(id)

    response.json({
      message: 'Group found',
      ok: true,
      data: {
        group
      }
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// POST /groups
router.post('/', validUser, async (request, response) => {
  try {
    const id = request.user._id

    const group = await groups.create(id, request.body)
    console.log(group)

    response.json({
      message: 'Group Created',
      ok: true,
      data: {
        group: group
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

export default router
