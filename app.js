import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connect } from './src/db/dbConn.js'

import userRoutes from './src/routes/users.router.js'
import studentsRoutes from './src/routes/students.router.js'
import tasksRoutes from './src/routes/tasks.router.js'
import purchaseItemRoutes from './src/routes/purchases-items.router.js'
import groupsRoutes from './src/routes/groups.router.js'
import schoolsRoutes from './src/routes/schools.router.js'
import studentsTasksRoutes from './src/routes/students-tasks.router.js'
import googleAuthRoutes from './src/routes/google.router.js'
import tutorRoutes from './src/routes/tutor.router.js'

dotenv.config()

const app = express()
const port = process.env.PORT

/**
 * Middlewares
 */
app.use(express.json())
app.use(cors())

/**
 * URIs
 */
app.use('/users', userRoutes)
app.use('/students', studentsRoutes)
app.use('/tasks', tasksRoutes)
app.use('/items/purchases', purchaseItemRoutes)
app.use('/groups', groupsRoutes)
app.use('/schools', schoolsRoutes)
app.use('/students-tasks', studentsTasksRoutes)
app.use('/google/auth', googleAuthRoutes)
app.use('/tutor', tutorRoutes)

/**
 * Start application
 */
app.get('/', (req, res) => {
  res.status(200).send('Hey there! Welcome to Fincity!!!!')
})

connect()
  .then((message) => {
    console.log(message)
    app.listen(port, () => {
      console.log(`Server listening on ${port} port.`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
