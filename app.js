// Import d'express, mongoose & body parser
const { json } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productsRoutes = require('./routes/sauce');
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

app.use(express.json());

// CORS
// var whitelist = ['http://localhost:4200'];
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// };
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', productsRoutes);

// Export de l'application express
module.exports = app;