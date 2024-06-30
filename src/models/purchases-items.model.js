import mongoose from 'mongoose'

const { Schema } = mongoose

const PurchaseItemSchema = new Schema({
  Group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  Item_Name: {
    type: String,
    maxlength: 50,
    required: true
  },
  Value: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
    maxlength: 250,
    required: true
  },
  Image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemsImage',
    required: true
  },
  Status: {
    type: Boolean,
    required: true
  }
})

const PurchaseItem = mongoose.model('PurchaseItem', PurchaseItemSchema)

export default PurchaseItem
