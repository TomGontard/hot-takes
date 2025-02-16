const multer = require('multer');

// Dictionnaire des types MIME autorisés pour les fichiers image
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Configuration du stockage des fichiers avec Multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); // Dossier où seront enregistrées les images
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Remplace les espaces par des underscores
        const extension = MIME_TYPES[file.mimetype]; // Récupère l'extension du fichier
        callback(null, name + Date.now() + '.' + extension); // ajoute un timestamp pour éviter les doublons
    }
});

module.exports = multer({ storage }).single('image');
