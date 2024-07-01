import express from 'express'
import tasks from '../use-cases/tasks.use-cases.js'

const router = express.Router()

// GET /tasks
router.get('/', async (request, response) => {
  try {
    const allTasks = await tasks.getAll()

    response.json({
      message: 'All tasks',
      ok: true,
      data: {
        tasks: allTasks
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
