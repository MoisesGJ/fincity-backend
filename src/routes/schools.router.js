import express from 'express'
import schools from '../use-cases/schools.use-cases.js'

const router = express.Router()

// GET /schools
router.get('/', async (request, response) => {
  try {
    const allSchools = await schools.getAll()

    response.json({
      message: 'All schools',
      ok: true,
      data: {
        schools: allSchools
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// GET /schools/:id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const school = await schools.getById(id)

    response.json({
      message: 'School found',
      ok: true,
      data: {
        school: school
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// POST /schools
router.post('/', async (request, response) => {
  try {
    const school = await schools.create(request.body)

    response.json({
      message: 'School Created',
      ok: true,
      data: {
        school: school
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// DELETE /schools/:id
router.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const school = await schools.deleteById(id)

    response.json({
      message: 'School deleted',
      ok: true
    })
  } catch (error) {
    console.log(error.status)
    response.status(error.status || 500).json({
      message: 'something went wrong',
      error: error.message
    })
  }
})

// PATCH /schools/:id
router.patch('/:id', async (request, response) => {
  try {
    const newdata = request.body
    const { id } = request.params
    const school = await schools.update(id, newdata, { new: true })

    response.json({
      message: 'School updated',
      data: {
        school: school
      }
    })
  } catch (error) {
    console.log(error.status)
    response.status(error.status || 500).json({
      message: 'something went wrong',
      error: error.message
    })
  }
})

export default router
