// Middleware bloquant l'IP de l'utilisateur après un nombre de connexions échouées
const rateLimit = require('express-rate-limit');

const loginlimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5, // Limit each IP to 5 requests per `windowMS`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Nombre de tentatives dépassé, veuillez essayer à nouveau dans 5 minutes"
})

module.exports = loginlimiter;