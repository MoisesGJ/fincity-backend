const express = require('express')
const router = express.Router()
const User = require('../models/users')

/**
 * * Get
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).send({ message: users })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router
