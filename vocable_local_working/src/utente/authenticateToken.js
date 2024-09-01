// Middleware per verificare il token JWT
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Estrae il token dall'intestazione Authorization
    
    if (token == null) return res.sendStatus(401); // Nessun token, ritorna "Unauthorized"

    jwt.verify(token, 'balls' /*process.env.JWT_SECRET*/, (err, user) => {
        if (err) return res.sendStatus(403); // Token non valido, ritorna "Forbidden"
        
        req.user = user; // Salva i dati dell'utente dal token nella richiesta
        next(); // Continua alla route successiva
    });
}

module.exports = authenticateToken;
