import express from 'express'
import studentsTasks from '../use-cases/students-tasks.use-cases.js'

const router = express.Router()

// GET /students/tasks
router.get('/', async (request, response) => {
  try {
    const allStudentsTasks = await studentsTasks.getAll()

    response.json({
      message: 'Students Tasks list',
      ok: true,
      data: {
        students_tasks: allStudentsTasks
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// GET /students/:id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params

    const studentTask = await studentsTasks.getById(id)

    response.json({
      message: 'Students Tasks found',
      ok: true,
      data: {
        students_tasks: studentTask
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// POST /students/tasks
router.post('/', async (request, response) => {
  try {
    const studentTaskData = request.body
    const newStudentTask = await studentsTasks.create(studentTaskData)

    response.status(201)
    response.json({
      message: 'Student Task created',
      ok: true,
      data: {
        student_task: newStudentTask
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

// DELETE /students/tasks/:id
router.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    await studentsTasks.deleteById(id)

    response.json({
      message: 'Student Task deleted',
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

// PATCH /students/tasks/:id
router.patch('/:id', async (request, response) => {
  try {
    const newdata = request.body
    const { id } = request.params
    const studentTask = await studentsTasks.update(id, newdata, { new: true })

    response.json({
      message: 'Student Task updated',
      data: {
        student_task: studentTask
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
