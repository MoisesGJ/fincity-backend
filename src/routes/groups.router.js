import express from 'express'
import groups from '../use-cases/groups.use-cases.js'

const router = express.Router()

// GET /groups
router.get('/', async (request, response) => {
  try {
    const allGroups = await groups.getAll()

    response.json({
      message: 'All students',
      ok: true,
      data: {
        students: allGroups
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// GET /groups/:id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const group = await groups.getById(id)

    response.json({
      message: 'Group found',
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

// POST /groups
router.post('/', async (request, response) => {
  try {
    const group = await groups.create(request.body)

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
