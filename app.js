// Import d'express, cors, mongoose, body parser, routes, dotenv, helmet
const { json } = require('express');
const express = require('express');
const app = express();
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
app.use(
    helmet({
        // Évite l'erreur : BLOCKED_BY_RESPONSE.NotSameOrigin 200
        // crossOriginResourcePolicy: false
    })
);
app.use(express.json());
app.use(bodyParser.json());

// CORS
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoute);

// Export de l'application express
module.exports = app;