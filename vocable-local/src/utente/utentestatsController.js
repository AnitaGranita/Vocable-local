var utentestatsServices = require("./utentestatsServices");
var utenteService = require("./utenteServices");

var createUtentestatsControllerFn = async (req, res) => {
    try {
        console.log("\nregistrationstats");
        console.log(req.body);
        var status = await utentestatsServices.createUtentestatsDBService(req.body);
        console.log(status);

        if (status) { //restituisce un messaggio se ha creato l'utente o se non è riuscito
            res.send({ "status": true, "message": "Utentestats creato con successo" });
        }
        else {
            res.send({ "status": false, "message": "Errore: Impossibile creare l'utentestats" })
        }
    }
    catch (err) {
        console.log(err);
    }
}

var statGetterControllerFn = async (req, res) => {
    try {
        const stats = await utentestatsServices.findStatsByEmail(req.user.email);

        if (!stats) {
            return res.status(404).json({ msg: 'Statistiche irreperibili' });
        }

        const nickname = await utenteService.findNicknameByEmail(req.user.email);

        if (nickname === null) {
            return res.status(404).json({ msg: 'Nickname non trovato' });
        }

        res.json({
            email: stats.email,
            nickname: nickname,
            totalgames: stats.totalgames,
            gameswon: stats.gameswon,
            gameslost: stats.gameslost,
            won1: stats.won1,
            won2: stats.won2,
            won3: stats.won3,
            won4: stats.won4,
            won5: stats.won5,
            won6: stats.won6
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Errore del server' });
    }
};

var updateUtentestatsControllerFn = async (req, res) => {
    const { won, attempts } = req.body;
    try {
        const result = await utentestatsServices.updateUtentestatsDBService(req.user.email, won, attempts);

        if (result.status) {
            res.json({ status: true, message: result.message });
        } else {
            res.status(404).json({ status: false, message: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Errore del server' });
    }
};
module.exports = { createUtentestatsControllerFn, statGetterControllerFn, updateUtentestatsControllerFn };