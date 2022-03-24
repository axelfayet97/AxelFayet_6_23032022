const multer = require('multer');

// Re-génération de l'extension du fichier
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Enresitrement dans constante storage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Dossier de destination
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        // Réécriture du nom du fichier pour éviter d'éventuels problèmes
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES(file.mimetype);
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Export du fichier
module.exports = multer({ storage }).single('image');