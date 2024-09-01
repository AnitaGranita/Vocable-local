const utenteModel = require('./utenteModel');
const utentestatsModel = require('./utentestatsModel');
const jwt = require('jsonwebtoken');
const encryptor = require('simple-encryptor')('hqBzkw4H7Iog6561'); // chiave per criptare le password
require('dotenv').config();
const emailjs = require('emailjs-com');
const client = emailjs.init(process.env.EMAILJS_USER_ID);

// Funzione per la creazione di un nuovo utente
module.exports.createUtenteDBService = (utenteDetails) => {
    return new Promise(function myFN(resolve, reject) {
        utenteModel.findOne({ email: utenteDetails.email }, function (error, existingUser) {
            if (error) {
                reject({ status: false, msg: "Errore durante la verifica dell'email" + error });
            } else if (existingUser) {
                reject({ status: false, msg: "Email già in uso" });
            } else {
                const utenteModelData = new utenteModel();
                utenteModelData.email = utenteDetails.email;
                utenteModelData.nickname = utenteDetails.nickname;

                const encryptedPassword = encryptor.encrypt(utenteDetails.password);
                utenteModelData.password = encryptedPassword;

                utenteModelData.save(function resultHandle(error, result) {
                    if (error) {
                        reject({ status: false, msg: "Errore durante la creazione dell'utente" });
                    } else {
                        resolve({ status: true, msg: "Utente creato con successo" });
                    }
                });
            }
        });
    });
}

// Funzione per il login dell'utente
module.exports.loginUtenteDBService = (utenteDetails) => {
    return new Promise(function myFn(resolve, reject) {
        utenteModel.findOne({ email: utenteDetails.email }, function getresult(errorvalue, result) {
            if (errorvalue) {
                reject({ status: false, msg: "Errore durante il login", token: '0', id: '0' });
            } else {
                if (result) {
                    const decryptedPassword = encryptor.decrypt(result.password);
                    if (decryptedPassword === utenteDetails.password) {
                        const payload = { email: result.email, id: result._id };
                        const options = { expiresIn: '6h' };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
                        const body = {
                            status: true,
                            msg: "Utente validato con successo",
                            token: token,
                            id: result._id
                        };
                        resolve(body);
                    } else {
                        reject({ status: false, msg: "Password e/o email errati", token: '0', id: '0' });
                    }
                } else {
                    reject({ status: false, msg: "Dati non validi", token: '0', id: '0' });
                }
            }
        });
    });
}

// Nuova funzione per trovare un utente per email
module.exports.findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        utenteModel.findOne({ email: email }, (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
}

// Nuova funzione per trovare il nickname per email
module.exports.findNicknameByEmail = (email) => {
    return new Promise((resolve, reject) => {
        // Trova un utente per email e seleziona solo il campo "nickname"
        utenteModel.findOne({ email: email }, 'nickname', (err, user) => {
            if (err) {
                reject(err);
            } else {
                // Controlla se l'utente è stato trovato
                if (user) {
                    resolve(user.nickname);
                } else {
                    // Se non trovato, risolvi con null o un altro valore predefinito
                    resolve(null);
                }
            }
        });
    });
}


// Funzione di logout
module.exports.logoutUtente = (req, res) => {
    // Invia una risposta di successo
    res.status(200).send({
        status: true,
        msg: "Logout avvenuto con successo"
    });
};



module.exports.generateResetToken = (email) => {
    console.log("Inizio generazione token per email:", email);
    
    return new Promise((resolve, reject) => {
        // Trova l'utente con l'email fornita
        utenteModel.findOne({ email: email }, (err, user) => {
            if (err) {
                console.error("Errore durante la ricerca dell'utente:", err);
                return reject({ status: false, msg: "Errore durante la ricerca dell'utente" });
            }

            if (!user) {
                console.warn("Email non trovata:", email);
                return reject({ status: false, msg: "Email non associata ad alcun account" });
            }

            try {
                // Crea il payload per il token
                const payload = { email: user.email };
                const options = { expiresIn: '1h' }; // Imposta la scadenza del token
                const secret = process.env.JWT_SECRET || 'your_secret_key'; // Usa una variabile d'ambiente per il segreto

                // Genera il token JWT
                const resetToken = jwt.sign(payload, secret, options);

                console.log("Token generato:", resetToken);
                return resolve({ status: true, msg: "Token generato con successo", resetToken });
            } catch (tokenErr) {
                console.error("Errore durante la generazione del token JWT:", tokenErr);
                return reject({ status: false, msg: "Errore durante la generazione del token" });
            }
        });
    });
};



module.exports.resetPassword = async (token, newPassword) => {
    return new Promise((resolve, reject) => {
        if (!token || !newPassword) {
            return reject({ status: false, msg: 'Token e nuova password sono obbligatori' });
        }

        // Decodifica il token JWT
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return reject({ status: false, msg: 'Token non valido' });
            }

            try {
                // Trova l'utente con l'email decodificata
                const user = await utenteModel.findOne({ email: decoded.email });
                
                if (!user) {
                    return reject({ status: false, msg: 'Utente non trovato' });
                }

                // Cifra la nuova password
                const encryptedPassword = encryptor.encrypt(newPassword);

                // Aggiorna la password dell'utente
                user.password = encryptedPassword;
                await user.save();

                resolve({ status: true, msg: 'Password aggiornata con successo' });
            } catch (error) {
                console.error('Errore durante l\'aggiornamento della password:', error);
                reject({ status: false, msg: 'Errore durante l\'aggiornamento della password' });
            }
        });
    });
};
