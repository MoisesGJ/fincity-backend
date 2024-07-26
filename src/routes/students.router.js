import express from 'express'
import students from '../use-cases/students.use-cases.js'
import validUser from '../middlewares/userauth.js'

const router = express.Router()

// GET /students
router.get('/', validUser, async (request, response) => {
  try {
    const id = request.user._id
    const newstudents = await students.getByProfesor(id)

    const studentsStr = JSON.stringify(newstudents)

    response.send(studentsStr)
  } catch (error) {
    console.log(error)
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
