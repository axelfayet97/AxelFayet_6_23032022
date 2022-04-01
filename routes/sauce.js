const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { route } = require('./user');

// Routes gestion de données ici
// Créer une sauce + image avec Multer
router.post('/', auth, multer, sauceCtrl.createSauce);
// Modifier une sauce + image avec Multer
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// Récupère l'array de sauce
router.get('/', auth, sauceCtrl.getAllSauces);
// Récupère une seule sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Supprime une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Gestion de like/dislike
router.post('/:id/like', auth, sauceCtrl.LikeOrDislikeSauce);

module.exports = router;