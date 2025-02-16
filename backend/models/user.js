const mongoose = require('mongoose');

// Schéma Mongoose pour les utilisateurs :
// Adresse mail unique de l'utilisateur + mot de passe chiffré
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);