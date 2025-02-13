const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));

// Import des routes
const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const sauceRoutes = require('./routes/sauce');
app.use('/api/sauces', sauceRoutes);

// Route test
app.get('/', (req, res) => {
    res.send('API Hot Takes fonctionne 🚀');
});

module.exports = app;