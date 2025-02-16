const jwt = require('jsonwebtoken');

// Middleware d'authentification 
module.exports = (req, res, next) => {
    try {
        // Récupère le token dans le header Authorization de la requête
        const token = req.headers.authorization.split(' ')[1]; 
        // Vérifie le token avec la clé secrète
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // Extrait l'ID utilisateur du token
        const userId = decodedToken.userId;
        // Ajoute l'ID utilisateur à la requête
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};