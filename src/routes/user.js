const express = require('express')
const router = express.Router()
const User = require('../models/users')
var mongoose = require('mongoose')
const { validUser } = require('../middlewares/userauth')

/**
 * * Post
 * TODO: Cambiar el Role por un atributo con el que resolveré el  Rol que viene del Front
 */

router.post('/', async (req, res) => {
  try {
    let user = req.body

    user.password = await User.encryptPassword(user.password)
    user.role = new mongoose.Types.ObjectId(user.role)

    const newUser = await User.create(user)

    await newUser.save()
    res.status(201).send({
      message: 'Success',
      data: newUser
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
 * * Login
 */

router.post('/login', async (req, res) => {
  try {
    const { user, email, password } = req.body
    let userToLogin = null

    if ((!email && !user) || !password) {
      const loginError = new Error(
        'Please provide either email or user, and a password'
      )

      res.status(400).send({
        message: 'Email or User, and Password are Required',
        data: null,
        error: loginError
      })

      return
    }

    !user
      ? (userToLogin = await User.findOne({ email: email }))
      : (userToLogin = await User.findOne({ user: user }))

    if (
      !userToLogin ||
      !(await User.isValidPassword(password, userToLogin.password))
    ) {
      res.status(401).send({
        message: 'Invalid password',
        data: null
      })
    } else {
      const token = await User.createToken({
        _id: userToLogin._id,
        first_name: userToLogin.first_name
      })

      res.status(201).send({
        message: 'Login Successful',
        data: {
          token: token,
          userId: userToLogin._id
        }
      })
    }
  } catch (error) {
    console.log(error)

    res.status(400).send({
      message: 'Error: Please contact your System Administrator',
      data: null,
      error: error
    })
  }
})

/**
 * * Gets
 */

router.get('/', async (req, res) => {
  try {
    // const users = await User.find().populate('role').exec()
    const users = await User.find()

    res.status(200).send({
      message: 'Sucess!!',
      data: users,
      error: null
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message: 'Error: Please contact you system administrator',
      data: null,
      error: error
    })
  }
})

module.exports = router
