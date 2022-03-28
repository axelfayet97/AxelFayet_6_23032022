const Sauce = require('../models/Sauces')
const fs = require('fs');

// Création de sauce
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    // Nouvel objet Sauce
    const sauce = new Sauce({
        // Opérateur spread donnant tous les champs du body
        ...sauceObject,
        // Génération du nom du fichier de manière dynamique
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Methode save dans la bdd
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification de la sauce
exports.modifySauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // On retire l'ancienne image
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                // Modification des données de la sauce
                const sauceObject = req.file ?
                    // Si une nouvelle image
                    {
                        ...JSON.parse(req.body.sauce),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    // Sinon
                    : { ...req.body };
                // Sauvegarde de la nouvelle sauce
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Affichage de toutes les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).send(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Affichage d'une sauce single
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Suppression d'une sauce
exports.deleteSauce = (req, res) => {
    // Trouve l'id de la sauce à delete
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // On retire /images/ du nom du chemin
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Gestion like / dislike d'une sauce
exports.likeSauce = (req, res) => {
    const userId = req.body.userId;
    const sauceId = req.params.id;
    const likeControl = req.body.like;
    switch (likeControl) {
        //SI LIKE = 1
        case 1:
            Sauce.updateOne({ _id: sauceId }, { $inc: { likes: 1 }, $push: { usersLiked: userId } })
                .then(() => res.status(200).json({ message: 'Sauce likée !' }))
                .catch(error => (res.status(500).json({ error })));
            break;
        // SI DISLIKE = -1
        case -1:
            Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: -1 }, $push: { usersDisliked: userId } })
                .then(() => res.status(200).json({ message: 'Sauce dislikée !' }))
                .catch(error => (res.status(500).json({ error })));
            break;
        // RETOUR DEFAUT
        case 0:
            Sauce.findOne({ _id: sauceId })
                .then(sauce => {
                    // Si l'utilisateur retire un like
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
                            .then(() => res.status(200).json({ message: 'Like retiré' }))
                            .catch(error => (res.status(500).json({ error })));
                        // Si l'utilisateur retire un dislike
                    } else {
                        Sauce.updateOne({ _id: sauceId }, { $inc: { dislikes: 1 }, $pull: { usersDisliked: userId } })
                            .then(() => res.status(200).json({ message: 'Dislike retiré' }))
                            .catch(error => (res.status(500).json({ error })));
                    }
                });
            break;
    };
};