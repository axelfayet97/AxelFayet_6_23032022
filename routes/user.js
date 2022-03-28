const express = require('express');
const userCtrl = require('../controllers/user');
const router = express.Router();

// Routes gestion de l'utilisateur
// Inscription
router.post('/signup', userCtrl.signup);
// Connexion
router.post('/login', userCtrl.login);

module.exports = router;