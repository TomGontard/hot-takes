const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Apply the uniqueValidator plugin to userSchema to ensure that the email field is unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);