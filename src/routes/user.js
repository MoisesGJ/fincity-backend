const express = require('express')
const router = express.Router()
const User = require('../models/users')
var mongoose = require('mongoose')

/**
 * * Post
 */

router.post('/', async (req, res) => {
  try {
    let user = req.body

    user.password = await User.encryptPassword(user.password)
    user.role = new mongoose.Types.ObjectId(user.role)

    console.log('User to Create: ', user)

    const newUser = await User.create(user)

    await newUser.save()
    res.status(201).send({
      message: 'Success',
      data: user
    })
  } catch (error) {
    let errorInfo = error

    if (error.errorResponse.code === 11000) {
      errorInfo = {
        errorMessage:
          'Combination of Email and User must be unique. If you are trying to create a Teacher or Parent, Email is required, else if trying to create Student an user is required. See Documentation for more information.'
      }
    }

    res.status(400).send({
      message: 'Error: Please contact you system administrator',
      data: null,
      error: errorInfo
    })
  }
})

/**
 * * Get
 */

router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).send({
      message: 'Sucess!!',
      data: users,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      message: 'Error: Please contact you system administrator',
      data: null,
      error: error
    })
  }
})

module.exports = router
