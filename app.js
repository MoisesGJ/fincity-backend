import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connect } from './src/db/dbConn.js'
import userRoutes from './src/routes/users.router.js'

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
