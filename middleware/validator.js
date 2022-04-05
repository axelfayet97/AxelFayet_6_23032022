const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const infosValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Saisir un texte entre 3 et 30 caractères.'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Le nom ne doit contenir que des caractères alphanumériques.'
    })
];

module.exports =  infosValidator;