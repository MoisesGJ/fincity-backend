import PurchaseItem from '../models/purchases-items.model.js'
import createError from 'http-errors'

async function getAll() {
  const allPurchasesItems = await PurchaseItem.find()
  return allPurchasesItems
}

export default {
  getAll
}
