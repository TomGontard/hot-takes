const Sauce = require('../models/sauce');
const fs = require('fs');

// Créer une sauce
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save().then(
        () => res.status(201).json({
            message: 'Sauce enregistrée !'
        })).catch(
            (error) => res.status(400).json({
                error: error
        }));
};

// Récupérer toutes les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer une sauce par ID
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Sauce.updateOne({ _id: req.params.id, userId: req.auth.userId }, { ...sauceObject })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id, userId: req.auth.userId })
        .then(sauce => {
            if (!sauce) return res.status(404).json({ message: 'Sauce non trouvée' });
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Liker ou disliker une sauce
exports.likeSauce = (req, res) => {
    const { like, userId } = req.body;

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (!sauce) return res.status(404).json({ message: 'Sauce non trouvée' });

            // Gestion des likes et dislikes
            if (like === 1) { // Ajout d'un like
                if (!sauce.usersLiked.includes(userId)) {
                    sauce.usersLiked.push(userId);
                    sauce.likes++;
                }
            } else if (like === -1) { // Ajout d'un dislike
                if (!sauce.usersDisliked.includes(userId)) {
                    sauce.usersDisliked.push(userId);
                    sauce.dislikes++;
                }
            } else if (like === 0) { // Annulation d'un like/dislike
                if (sauce.usersLiked.includes(userId)) {
                    sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
                    sauce.likes--;
                }
                if (sauce.usersDisliked.includes(userId)) {
                    sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
                    sauce.dislikes--;
                }
            }

            // Sauvegarde des modifications
            sauce.save()
                .then(() => res.status(200).json({ message: 'Vote mis à jour !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};