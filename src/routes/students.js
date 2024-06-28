const express = require('express')
const router = express.Router()
const Student = require('../models/students')

router.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.send({ message: 'All Students', data: students })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const student = await Student.find({ id: id })
    res.send({ message: 'student', data: student })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router
