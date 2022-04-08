// Import d'express, cors, mongoose, body parser, routes, dotenv, helmet, no cache
const { json } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const saucesRoute = require('./routes/sauce');
const path = require('path');
const loginLimiter = require('./middleware/authentification-validator')
require('dotenv').config();

// CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Paramètre mongoose permettant de run les test de validation à la modification de la sauce
mongoose.set('runValidators', true);
// Connexion à Mongo DB
const login = process.env.DB_PWD;
mongoose.connect(login, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Analyse Corps de la requête
app.use(express.json());
app.use(bodyParser.json());

// Sécurité helmet et désactivation du cache
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(nocache());

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', loginLimiter, userRoutes);
app.use('/api/sauces', saucesRoute);

// Export de l'application express
module.exports = app;