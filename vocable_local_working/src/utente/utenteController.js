const { response } = require("express");
var utenteService = require("./utenteServices");


var createUtenteControllerFn = async (req, res) => {
    try {
        console.log("\nregistration");
        console.log(req.body);
        var status = await utenteService.createUtenteDBService(req.body);
        console.log("Status dal servizio:", status);

        if (status && status.status === true) {
            res.send({ "status": true, "message": "Utente creato con successo" });
        } else {
            res.send({ "status": false, "message": status.msg || "Errore: Impossibile creare l'utente" });
        }
    } catch(err) {
        console.log(err);
        res.send({"status":false,"message":err.msg});
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


const forgotPasswordControllerFn = async (req, res) => {
    try {
        // Log dei dati ricevuti nella richiesta
        console.log("Richiesta di reset password ricevuta:", req.body);

        // Verifica se l'email è presente nel corpo della richiesta
        if (!req.body.email) {
            return res.status(400).send({
                status: false,
                message: "Email è obbligatoria."
            });
        }

        // Genera il token di reset utilizzando il servizio
        const status = await utenteService.generateResetToken(req.body.email);

        // Log del risultato della generazione del token
        console.log("Risultato dalla funzione generateResetToken:", status);

        if (status && status.status === true) {
            // Token di reset generato con successo
            console.log("Token di reset generato con successo:", status.resetToken);
            return res.status(200).send({
                status: true,
                message: "Token di reset generato con successo. Controlla la tua email per il link di reset.",
                resetToken: status.resetToken
            });
        } else {
            // Errore nella generazione del token di reset
            console.error("Errore durante la generazione del token di reset:", status.msg);
            return res.status(400).send({
                status: false,
                message: status.msg || "Errore: Impossibile generare il token di reset."
            });
        }
    } catch (err) {
        // Gestione degli errori generali
        console.error("Errore nel forgotPasswordControllerFn:", err);
        return res.status(500).send({
            status: false,
            message: err.message || "Errore durante la generazione del token di reset."
        });
    }
};


var meUtenteControllerFn = async (req, res) => {
    try {
        // Trova l'utente nel database utilizzando l'email memorizzata nel token
        const user = await utenteService.findUserByEmail(req.user.email);

        if (!user) {
            return res.status(404).json({ msg: 'Utente non trovato' });
        }

        // Restituiscie i dettagli dell'utente
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
        // Restituisce messaggi di successo o di fallimento
    try {
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

const resetPasswordControllerFn = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        const result = await utenteService.resetPassword(token, newPassword);

        res.status(200).send(result);
    } catch (err) {
        console.error('Errore durante il reset della password:', err);
        res.status(500).send({
            status: false,
            message: 'Errore durante il reset della password'
        });
    }
};





module.exports = { createUtenteControllerFn, loginUtenteControllerFn, meUtenteControllerFn, logoutUtenteControllerFn, forgotPasswordControllerFn, resetPasswordControllerFn };
