require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const mongoDB = require('./src/db/dbConn')
const user = require('./src/routes/user')
const tasks = require('./src/routes/tasks')
const items = require('./src/routes/items')
const students = require('./src/routes/students')

/**
 * * Middlewares
 */

app.use(express.json())

app.use(cors())

/**
 * * URIs
 */

app.use('/users', user)

app.use('/tasks', tasks)

app.use('/items', items)

app.use('/students', students)
/**
 * * Start application
 */

app.get('/', (req, res) => {
  res.status(200).send('Hey there! Welcome to Fincity!!!!')
})

mongoDB.connect
  .then((message) => {
    console.log(message)
    app.listen(port, () => {
      console.log(`Server listening on ${port} port.`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
