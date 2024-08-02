import createError from 'http-errors'
import express from 'express'

import validToken from '../middlewares/tutor.middleware.js'

import tutor from '../use-cases/tutor.use-cases.js'

const router = express.Router()

//CREATE PIN

router.post('/create-pin', validToken, async (req, res) => {
  try {
    const { id, children } = req.parent

    const { pin } = req.body

    if (!pin) {
      return res.status(400).json({
        message: 'Hay un problema con el PIN'
      })
    }

    await tutor.createPIN(id, pin, { new: true })

    res.json({
      message: `Create Tutor PIN`,
      ok: true
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

export default router
