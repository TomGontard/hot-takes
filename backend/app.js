const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Activation de CORS pour autoriser les requêtes cross-origin
app.use(cors());

// Configuration des headers pour les requêtes HTTP
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Middleware pour servir les images dans le dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Import des routes utilisateur et sauce
const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const sauceRoutes = require('./routes/sauce');
app.use('/api/sauces', sauceRoutes);

module.exports = app;