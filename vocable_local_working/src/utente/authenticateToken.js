// Middleware per verificare il token JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verifica se il JWT_SECRET è stato impostato
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET non è impostato.');
}
console.log("JWT: ", process.env.JWT_SECRET);
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Estrae il token dall'intestazione Authorization
    
    if (token == null) return res.sendStatus(401); // Nessun token, ritorna "Unauthorized"

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token non valido, ritorna "Forbidden"
        
        req.user = user; // Salva i dati dell'utente dal token nella richiesta
        next(); // Continua alla route successiva
    });
}

module.exports = authenticateToken;
