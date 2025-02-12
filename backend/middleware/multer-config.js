const multer = require('multer');

// Dictionnaire des types MIME
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); // Dossier où seront enregistrées les images
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Évite les espaces
        const extension = MIME_TYPES[file.mimetype]; // Récupère l'extension
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');
