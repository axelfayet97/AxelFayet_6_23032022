const Sauce = require('../models/Sauces')
const fs = require('fs');

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

exports.modifySauce = (req, res) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    // Supprimer current image
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "OK" }))
        .catch(error => res.status(400).json({ error }));

};

exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).send(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res) => {
    // Trouve l'id de la sauce à delete
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // On retire /images/ du nom du chemin
            const filename = sauce.imageUrl.split('/images/')[1];
            console.log("sauce : " + sauce, "filename : " + filename);
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.likeSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(likeControl => {
            const thumbController = req.body.like;
            // Si like
            if (thumbController == 1) {
                if (likeControl.usersLiked == req.body.userId) {
                    // Si user id déjà sauvé

                } else {
                    likeControl.usersLiked.push(req.body.userId);
                }
                likeControl.likes++;
                // likeControl.usersLiked = [];
            } else if (thumbController == -1) {
                // Si dislike
                // likeControl.usersDisliked ?  : likeControl.usersDisliked.push(req.body.userId);
                likeControl.likes--;
                // likeControl.usersDisliked = [];
            } else {
                // Si défaut : on retire dans tous les cas userId des 2 array
                console.log(likeControl.usersLiked);
                likeControl.usersLiked.splice(indexOf(req.body.userId), 1);
                likeControl.usersDisliked.splice(indexOf(req.body.userId), 1);
            }
            likeControl.save();
            res.status(200).json({ message: 'Sauce likée !', userLiked: req.body.userId })
        })
        .catch(error => (res.status(500).json({ error })));
};