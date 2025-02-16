const mongoose = require('mongoose');

// Schéma Mongoose pour les sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true }, // ID de l'utilisateur ajoutant la sauce
    name: { type: String, required: true }, // Nom de la sauce
    manufacturer: { type: String, required: true }, // Fabricant de la sauce
    description: { type: String, required: true }, // Description de la sauce
    mainPepper: { type: String, required: true }, // Principal ingrédient dans la sauce
    imageUrl: { type: String, required: true }, // URL de l'image de la sauce
    heat: { type: Number, required: true, min: 1, max: 10 }, // Niveau de piquant
    likes: { type: Number, required: false, default: 0 }, // Nombre de likes
    dislikes: { type: Number, required: false, default: 0 }, // Nombre de dislikes
    usersLiked: { type: [String], required: false, default: [] }, // Liste des utilisateurs ayant liké
    usersDisliked: { type: [String], required: false, default: [] } // Liste des utilisateurs ayant disliké
});

module.exports = mongoose.model('Sauce', sauceSchema);