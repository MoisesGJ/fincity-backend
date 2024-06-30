import mongoose from 'mongoose'
const { Schema } = mongoose

const itemImageSchema = new Schema({
  description: {
    type: String,
    required: true,
    maxLength: 50
  },
  imageUrl: {
    type: String,
    required: true
  }
})

const ItemImage = mongoose.model('ItemsImages', itemImageSchema)

export default ItemImage
