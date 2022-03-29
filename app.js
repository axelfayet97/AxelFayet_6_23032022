// Import d'express, cors, mongoose, body parser, routes, dotenv, helmet
const { json } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const saucesRoute = require('./routes/sauce');
const path = require('path');
require('dotenv').config();

// Connexion à Mongo DB
const login = process.env.DB_PWD;
mongoose.connect(login, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Analyse Corps de la requête
const app = express();
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());

// CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

// Routes
app.use('/images', cors(corsOptions), express.static(path.join(__dirname, 'images')));
app.use('/api/auth', cors(corsOptions), userRoutes);
app.use('/api/sauces', cors(corsOptions), saucesRoute);

// Export de l'application express
module.exports = app;