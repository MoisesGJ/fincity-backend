const express = require('express')
const router = express.Router()
const Tasks = require('../models/tasks')

router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find()
    res.send({ message: 'All tasks', data: tasks })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router
