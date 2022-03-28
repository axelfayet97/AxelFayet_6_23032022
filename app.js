// Import d'express, cors, mongoose, body parser, routes, dotenv
const { json } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const saucesRoute = require('./routes/sauce');
const app = express();
require('dotenv').config();
const path = require('path');

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

// CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

// Extrait les données du body de la requête et les transforme en objet JS "req.body"
app.use(bodyParser.json());

// Routes
app.use('/images', cors(corsOptions), express.static(path.join(__dirname, 'images')));
app.use('/api/auth', cors(corsOptions), userRoutes);
app.use('/api/sauces', cors(corsOptions), saucesRoute);

// Export de l'application express
module.exports = app;