const { response } = require("express");
var utenteService = require("./utenteServices");
const authenticateToken = require('./authenticateToken'); // Importa il middleware

var createUtenteControllerFn = async (req, res) => {
    try {
        console.log("\nregistration");
        console.log(req.body);
        var status = await utenteService.createUtenteDBService(req.body);
        console.log(status);

        if (status && status.status === true) {
            res.send({ "status": true, "message": "Utente creato con successo" });
        } else {
            res.send({ "status": false, "message": status.msg || "Errore: Impossibile creare l'utente" });
        }
    } catch(err) {
        console.log(err);
        res.send({"status":false,"message":err.msg});
        //res.send({ "status": false, "message": "Errore: Impossibile completare la richiesta" });
    }
}


var loginUtenteControllerFn = async (req, res) => {
    var result = null;
    console.log("\nlogin");
    console.log(req.body);
    try {
        result = await utenteService.loginUtenteDBService(req.body);
        if(result.status){
            console.log("true");
            res.send({ "status":true, "message":result.msg, "token":result.token, "id":result.id });
        } else {
            console.log("false");
            res.send({ "status":false, "message":result.msg });
        }
    } catch(errore) {
        console.log(errore);
        res.send({"status":false,"message":errore.msg});
    }
}

var meUtenteControllerFn = async (req, res) => {
    try {
        // Trova l'utente nel database utilizzando l'email memorizzata nel token
        const user = await utenteService.findUserByEmail(req.user.email);

        if (!user) {
            return res.status(404).json({ msg: 'Utente non trovato' });
        }

        // Restituisci i dettagli dell'utente
        res.json({
            email: user.email,
            nickname: user.nickname,
            id: user._id
        });
    } catch (error) {
        res.status(500).json({ msg: 'Errore del server' });
    }
}

var logoutUtenteControllerFn = async (req, res) => {
    try {
        // Se hai bisogno di eseguire logiche specifiche per il logout, falle qui
        // Ad esempio, invalidare il token nel database (se usi un sistema di blacklist)

        // Per il logout lato client, il token di sessione può essere eliminato semplicemente
        // Non è necessario fare nulla sul server se utilizzi solo JWT
        res.status(200).send({
            status: true,
            message: "Logout avvenuto con successo"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            message: "Errore durante il logout"
        });
    }
}


module.exports = { createUtenteControllerFn, loginUtenteControllerFn, meUtenteControllerFn, logoutUtenteControllerFn  };
