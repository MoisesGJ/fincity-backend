import express from 'express'
import items from '../use-cases/purchases-items.use-cases.js'

const router = express.Router()

// GET /items
router.get('/', async (request, response) => {
  try {
    const allItems = await items.getAll()

    response.json({
      message: 'All items',
      ok: true,
      data: {
        Items: allItems
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
