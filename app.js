// Import d'express, mongoose & body parser
const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productsRoutes = require('./routes/product');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

// Connexion à Mongo DB
const login = process.env.DB_PWD;
mongoose.connect(login, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// CORS
app.use((req, res, next) => {
    // Autorise les accès à l'API depuis * n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajout des headers mentionnés aux requêtes evoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Permet d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // Exécution de la prochaine étape
    next();
});
app.use(bodyParser.json());

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('api/sauces', productsRoutes);

// Export de l'application express
module.exports = app;