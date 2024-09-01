var express = require('express');
var utenteController = require('../src/utente/utenteController.js');
var utentestatsController = require('../src/utente/utentestatsController.js');
const authenticateToken = require('../src/utente/authenticateToken'); // Importa il middleware

const router = express.Router();

router.route('/utente/login').post(utenteController.loginUtenteControllerFn);
router.route('/utente/create').post(utenteController.createUtenteControllerFn);
router.route('/utente/createstats').post(utentestatsController.createUtentestatsControllerFn);
router.route('/utente/me').get(authenticateToken, utenteController.meUtenteControllerFn);
router.route('/utente/logout').post(authenticateToken, utenteController.logoutUtenteControllerFn);
router.route('/utente/get-stats').get(authenticateToken, utentestatsController.statGetterControllerFn);
router.route('/utente/update-stats').post(authenticateToken, utentestatsController.updateUtentestatsControllerFn);

module.exports = router; 
