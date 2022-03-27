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
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // On retire l'ancienne image
            const filename = sauce.imageUrl.split('/images/')[1];
            console.log("sauce : " + sauce, "filename : " + filename);
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
            // console.log(req.body);
            const thumbController = req.body.like;
            // Si like
            if (thumbController == 1) {
                likeControl.usersLiked.push(req.body.userId);
                likeControl.likes = likeControl.usersLiked.length;
            } else if (thumbController == -1) {
                // Si dislike
                likeControl.usersDisliked.push(req.body.userId);
                likeControl.dislikes = likeControl.usersDisliked.length;
            } else {
                // Si défaut : on retire dans tous les cas userId des 2 array
                likeControl.usersLiked.splice(req.params.id);
                likeControl.usersDisliked.splice(req.params.id);
                likeControl.likes = likeControl.usersLiked.length;
                likeControl.dislikes = likeControl.usersDisliked.length;
            }
            likeControl.save()
                .then(res.status(200).json({ message: "Préférence enregistrée !" }))
                .catch(error => (res.status(500).json({ error })))
        })
        .catch(error => (res.status(500).json({ error })));
};