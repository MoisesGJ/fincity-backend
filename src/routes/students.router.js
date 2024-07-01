import express from 'express'
import students from '../use-cases/students.use-cases.js'

const router = express.Router()

// GET /students
router.get('/', async (request, response) => {
  try {
    const allStudents = await students.getAll()

    response.json({
      message: 'All students',
      ok: true,
      data: {
        students: allStudents
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const student = await students.getById(id)

    response.json({
      message: 'Student found',
      ok: true,
      data: {
        student: student
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
