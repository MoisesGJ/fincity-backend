const express = require('express')
const router = express.Router()
const Tasks = require('../models/tasks')
const Weekly_Task = require('../models/weekly-tasks')

router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find()
    res.status(200).send({ message: 'All tasks', data: tasks })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.get('/weekly', async (req, res) => {
  try {
    const weekly_tasks = await Weekly_Task.find()
    res.status(200).send({ message: 'Tasks of the week', data: weekly_tasks })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router
