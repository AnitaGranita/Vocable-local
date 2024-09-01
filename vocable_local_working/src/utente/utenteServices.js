const utenteModel = require('./utenteModel');
const utentestatsModel = require('./utentestatsModel');
const jwt = require('jsonwebtoken');
const encryptor = require('simple-encryptor')('hqBzkw4H7Iog6561'); // chiave per criptare le password

// Funzione per la creazione di un nuovo utente
module.exports.createUtenteDBService = (utenteDetails) => {
    return new Promise(function myFN(resolve, reject) {
        utenteModel.findOne({ email: utenteDetails.email }, function (error, existingUser) {
            if (error) {
                reject({ status: false, msg: "Errore durante la verifica dell'email" });
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
                reject({ status: false, msg: "Errore durante il login" ,token : '0',id: '0'});
            } else {
                if (result) {
                    const decryptedPassword = encryptor.decrypt(result.password);
                    if (decryptedPassword === utenteDetails.password) {
                        const payload = { email: result.email, id: result._id };
                        const options = { expiresIn: '6h' };
                        const token = jwt.sign(payload, 'balls' /*process.env.JWT_SECRET*/, options);
                        const body = { 
                            status: true, 
                            msg: "Utente validato con successo", 
                            token: token, 
                            id: result._id 
                        };
                        resolve(body);
                    } else {
                        reject({ status: false, msg: "Password e/o email errati" ,token : '0',id: '0'});
                    }
                } else {
                    reject({ status: false, msg: "Dati non validi" ,token : '0',id: '0'});
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


// Funzione di logout (semplice, lato client)
module.exports.logoutUtente = (req, res) => {
    // Invia una risposta di successo
    res.status(200).send({
        status: true,
        msg: "Logout avvenuto con successo"
    });
};

