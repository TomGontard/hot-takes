const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true, min: 1, max: 10 },
    likes: { type: Number, require: false, default: 0 },
    dislikes: { type: Number, require: false, default: 0 },
    usersLiked: { type: [String], require: false, default: [] },
    usersDisliked: { type: [String], require: false, default: [] }
});

module.exports = mongoose.model('Sauce', sauceSchema);