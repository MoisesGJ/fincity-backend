import express from 'express'
import createError from 'http-errors'

import students from '../use-cases/students.use-cases.js'
import validUser from '../middlewares/user.middleware.js'

const router = express.Router()

// # CREATE
// POST students/
router.post('/', express.text(), validUser, async (req, res) => {
  try {
    const id = req.user._id
    const arr = req.body
    const studentsGroup = JSON.parse(arr)

    if (!arr || !Array.isArray(studentsGroup))
      throw new createError(400, 'Datos indefinidos')

    const csvData = await students.createStudents(id, studentsGroup)

    //RETORNA Archivo

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="archivo.csv"')
    res.status(200).send(csvData)
  } catch (error) {
    console.log(error.message)
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

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
