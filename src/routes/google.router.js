import express from 'express'
import google from '../use-cases/google.use-cases.js'

const router = express.Router()

// GET /google/:id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const google = await google.getById(id)

    response.json({
      message: 'Google user found',
      ok: true,
      data: {
        google: google
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
