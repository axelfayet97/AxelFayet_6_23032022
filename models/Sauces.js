const mongoose = require('mongoose');
const validator = require('../middleware/validator');

// Création d'un schéma de données
const sauceSchema = mongoose.Schema({
    // Identifiant de l'utilisateur ayant créé la sauce
    userId: { type: String, required: true },
    // Nom de la sauce
    name: { type: String, required: true, validate: validator.inputValidator },
    // Nom du fabricant de la sauce
    manufacturer: { type: String, required: true, validate: validator.inputValidator },
    // Description de la sauce
    description: { type: String, required: true, validate: validator.inputValidator },
    // Principal ingrédient de la sauce
    mainPepper: { type: String, required: true, validate: validator.pepperValidator },
    // Image de la sauce
    imageUrl: { type: String, required: true },
    // Nombre sur 10 décrivant la sauce
    heat: { type: Number, required: true, default: 1, min: 1, max: 10 },
    // Gestion like/dislike
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    // Utilisateurs ayant liké/disliké la sauce
    usersLiked: { type: [String], required: true, default: [] },
    usersDisliked: { type: [String], required: true, default: [] }
});

// Export du modèle
module.exports = mongoose.model('Sauces', sauceSchema);