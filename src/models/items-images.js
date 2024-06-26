const mongoose = require('mongoose');
const { Schema } = mongoose;

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
});

const itemImage = mongoose.model('ItemsImages', itemImageSchema);

module.exports = itemImage;
