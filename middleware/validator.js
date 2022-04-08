const mongoose = require('mongoose');
const validate = require('mongoose-validator');

exports.inputValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: 'Saisir un texte entre 3 et 30 caractères.'
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer votre sauce",
    }),
];

exports.pepperValidator = [
    validate({
        validator: 'isAlphanumeric',
        ignore: " ",
        passIfEmpty: true,
        message: 'La sauce ne doit contenir que des caractères alphanumériques.'
    })
];