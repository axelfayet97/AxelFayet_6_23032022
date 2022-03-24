const mongoose = require('mongoose');

// Création d'un schéma de données
const sauceSchema = mongoose.Schema({
    // Identifiant de l'utilisateur ayant créé la sauce
    userId: { type: String, required: true },
    // Nom de la sauce
    name: { type: String, required: true },
    // Nom du fabricant de la sauce
    manufacturer: { type: String, required: true },
    // Description de la sauce
    description: { type: String, required: true },
    // Principal ingrédient de la sauce
    mainPepper: { type: String, required: true },
    // Image de la sauce
    imageUrl: { type: String, required: true },
    // Nombre sur 10 décrivant la sauce
    heat: { type: Number, required: true },
    // Gestion like/dislike
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    // Utilisateurs ayant liké/disliké la sauc
    usersLiked: { type: String, required: true },
    usersDisliked: { type: String, required: true }
});

// Export du modèle
module.exports = mongoose.model('Sauces', sauceSchema);