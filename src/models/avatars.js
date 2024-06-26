const mongoose = require('mongoose');
const { Schema } = mongoose;

const avatarSchema = new Schema({
    avatar: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const avatar = mongoose.model('avatars', avatarsSchema);

module.exports = avatar;