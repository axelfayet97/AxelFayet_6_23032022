const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/products');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const { route } = require('./user');

// Routes gestion de données ici
// Créer une sauce
router.post('/', auth, sauceCtrl.createSauce);
// Modifier une sauce
router.put('/:id', auth, sauceCtrl.modifySauce); // Non renseigné ?
// Récupère l'array de sauce
router.get('/', auth, sauceCtrl.getAllSauces);
// Récupère une seule sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// Capture et enregistrement de l'image
router.post('/', auth, multer, sauceCtrl.createImageSauce); // à check
// Assigne l'image à la sauce
router.put('/:id', auth, multer, sauceCtrl.getImageSauce); // à faire
// Supprime une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Gestion de like/dislike
router.post('/:id/like', auth, sauceCtrl.sauceIdLiked);

module.exports = router