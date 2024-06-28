const express = require('express')
const router = express.Router()
const Items = require('../models/purchases-items')

router.get('/', async (req, res) => {
  try {
    const items = await Items.find()
    res.send({ message: 'All Items', data: items })
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router
