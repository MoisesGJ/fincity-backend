import express from 'express'
import { fileURLToPath } from 'url'

import users from '../use-cases/users.use-cases.js'

import validTokenEmailMiddleware from '../middlewares/emailValidate.js'
import validUser from '../middlewares/userauth.js'

import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const router = express.Router()

// GET /users/id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const user = await users.getById(id)

    response.json({
      message: 'User found',
      ok: true,
      data: {
        user: user
      }
    })
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// GET /users/email
router.get('/email/:email', async (request, response) => {
  try {
    const userData = request.params
    const user = await users.getByEmail(userData.email)

    if (user) {
      response.json({
        message: 'Users exists',
        ok: true,
        data: {
          user
        }
      })
    } else {
      response.json({
        message: 'User doesnt exists',
        ok: false
      })
    }
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// GET /users/access-token/
router.get('/access-token/:accessToken', async (request, response) => {
  try {
    const { accessToken } = request.params

    const user = await users.getByAccessToken(accessToken)

    if (user) {
      response.json({
        message: 'Users exists',
        ok: true,
        data: {
          user
        }
      })
    } else {
      response.json({
        message: 'User doesnt exists',
        ok: false
      })
    }
  } catch (error) {
    response.status(500).json({
      message: 'Something went wrong',
      error: error.message
    })
  }
})

// POST /users
router.post('/', async (request, response) => {
  try {
    const userData = request.body

    const newUser = await users.create(userData)
    const token = await users.createToken(newUser._id, newUser.first_name)

    console.log({ ...newUser, token: token })

    response.status(201)
    response.json({
      message: 'User created',
      ok: true,
      data: {
        user: { ...newUser, token: token }
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

//PATCH /user/id

router.patch('/google/:id', async (request, response) => {
  try {
    const newdata = request.body
    const { id } = request.params

    if (!newdata || Object.keys(newdata).length === 0) {
      return response.status(400).json({
        message: 'No data to update'
      })
    }

    const user = await users.update(id, newdata, { new: true })

    response.json({
      message: `User updated`,
      ok: true,
      data: { user }
    })
  } catch (error) {
    response.status(error.status || 500).json({
      message: 'something went wrong',
      error: error.message
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { user, email, password } = req.body

    const userResponse = await users.login({ user, email, password })

    res.status(200).send({
      message: 'Login Successful',
      data: {
        userResponse
      }
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

// get user/validate

router.get('/validate/verify/:id', async (req, res) => {
  try {
    const { id } = req.params

    const user = await users.getById(id)

    if (!user.emailVerified) {
      return res.status(200).send({
        message: 'Email not validate',
        ok: false
      })
    }

    res.status(200).send({
      message: 'Email validate',
      ok: true
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

// POST users/send-email

router.post('/send-email', validUser, async (req, res) => {
  try {
    const { baseUrl } = req.body
    const { user } = req

    const email = await users.sendEmail(baseUrl, user._id)

    res.status(200).send({
      message: 'Email sended',
      ok: true,
      data: {
        emailId: email
      }
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

router.post('/validate-email', validTokenEmailMiddleware, async (req, res) => {
  try {
    const { user } = req

    await users.validate(user.id)

    res.status(200).send({
      message: 'Validate Successful',
      ok: true
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

// # CREATE
// POST users/students/
router.post('/students', express.text(), validUser, async (req, res) => {
  try {
    const id = req.user._id
    const arr = req.body
    const studentsGroup = JSON.parse(arr)

    console.log(studentsGroup)

    if (!arr || !Array.isArray(studentsGroup))
      throw new Error('Datos indefinidos')

    const groupClass = await users.createStudents(id, studentsGroup)

    res.json({
      message: 'Class created',
      ok: true,
      data: {
        class: groupClass
      }
    })
  } catch (error) {
    console.log(error.message)
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

// POST users/students/login
router.post('/students/login', async (req, res) => {
  try {
    const { user, password } = req.body

    const userResponse = await users.login({ user, email, password })

    res.status(200).send({
      message: 'Login Successful',
      data: {
        userResponse
      }
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

// GET users/role
router.get('/role/users', validUser, async (req, res) => {
  try {
    const id = req.user._id

    const role = await users.getRoleById(id)

    res.status(200).send({
      message: 'Login Successful',
      ok: true,
      role
    })
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

router.get('/file/students', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../public/files', 'example_fincity.csv'))
  } catch (error) {
    res.status(error.status || 400).send({
      message: 'Something went wrong',
      error: error.message || 'Error: Please contact your System Administrator'
    })
  }
})

export default router
