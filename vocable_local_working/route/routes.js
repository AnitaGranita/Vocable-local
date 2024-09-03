var express = require('express');
var utenteController = require('../src/utente/utenteController.js');
var utentestatsController = require('../src/utente/utentestatsController.js');
const authenticateToken = require('../src/utente/authenticateToken'); // Importa il middleware

const router = express.Router();

/**
 * @swagger
 * /utente/create:
 *   post:
 *     summary: Crea un nuovo utente
 *     description: Crea un nuovo utente nel sistema con le informazioni fornite.
 *     tags:
 *       - Utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "MarioRossi"
 *               email:
 *                 type: string
 *                 example: "mario.rossi@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Utente creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Utente creato con successo"
 *       400:
 *         description: Dati dell'utente non validi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email già in uso"
 */
router.route('/utente/create').post(utenteController.createUtenteControllerFn);

/**
 * @swagger
 * /utente/login:
 *   post:
 *     summary: Login dell'utente
 *     description: Effettua il login dell'utente e restituisce un token JWT se le credenziali sono corrette.
 *     tags:
 *       - Utente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "mario.rossi@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Utente validato con successo"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 id:
 *                   type: string
 *                   example: "60d5f2f6b8f8f4f8b8e6f8c0"
 *       400:
 *         description: Credenziali non valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Password e/o email errati"
 */
router.route('/utente/login').post(utenteController.loginUtenteControllerFn);

/**
 * @swagger
 * /utente/createstats:
 *   post:
 *     summary: Crea statistiche per un utente
 *     description: Aggiunge nuove statistiche per un utente esistente. L'utente deve essere autenticato.
 *     tags:
 *       - Statistiche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "mario.rossi@example.com"
 *               gameswon:
 *                 type: integer
 *                 example: 0
 *               gameslost:
 *                 type: integer
 *                 example: 0
 *               totalgames:
 *                 type: integer
 *                 example: 0
 *               won1:
 *                 type: integer
 *                 example: 0
 *               won2:
 *                 type: integer
 *                 example: 0
 *               won3:
 *                 type: integer
 *                 example: 0
 *               won4:
 *                 type: integer
 *                 example: 0
 *               won5:
 *                 type: integer
 *                 example: 0
 *               won6:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Statistiche create con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Statistiche create con successo"
 *       400:
 *         description: Dati delle statistiche non validi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Dati delle statistiche non validi"
 *       401:
 *         description: Token non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Token non valido"
 *       409:
 *         description: Email già utilizzata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email già utilizzata"
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Errore del server"
 */

router.route('/utente/createstats').post(utentestatsController.createUtentestatsControllerFn);

/**
 * @swagger
 * /utente/me:
 *   get:
 *     summary: Recupera le informazioni dell'utente autenticato
 *     description: Restituisce i dettagli dell'utente autenticato utilizzando il token JWT.
 *     tags:
 *       - Utente
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Informazioni dell'utente recuperate con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "mario.rossi@example.com"
 *                 nickname:
 *                   type: string
 *                   example: "MarioRossi"
 *                 id:
 *                   type: string
 *                   example: "60d5f2f6b8f8f4f8b8e6f8c0"
 *       401:
 *         description: Token non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Token non valido"
 *       403:
 *         description: Accesso non autorizzato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Accesso non autorizzato"
 *       500:
 *         description: Errore del server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Errore del server"
 */
router.route('/utente/me').get(authenticateToken, utenteController.meUtenteControllerFn);

/**
 * @swagger
 * /utente/logout:
 *   post:
 *     summary: Logout dell'utente
 *     description: Disconnette l'utente e invalida il token JWT. Il token deve essere valido.
 *     tags:
 *       - Utente
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Logout effettuato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logout avvenuto con successo"
 *       401:
 *         description: Token non valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Token non valido"
 */
router.route('/utente/logout').post(authenticateToken, utenteController.logoutUtenteControllerFn);

/**
 * @swagger
 * /utente/get-stats:
 *   get:
 *     summary: Recupera le statistiche dell'utente
 *     description: Restituisce le statistiche per l'utente autenticato.
 *     tags:
 *       - Statistiche
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiche recuperate con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "mario.rossi@example.com"
 *                 nickname:
 *                   type: string
 *                   example: "MarioRossi"
 *                 totalgames:
 *                   type: integer
 *                   example: 0
 *                 gameswon:
 *                   type: integer
 *                   example: 0
 *                 gameslost:
 *                   type: integer
 *                   example: 0
 *                 won1:
 *                   type: integer
 *                   example: 0
 *                 won2:
 *                   type: integer
 *                   example: 0
 *                 won3:
 *                   type: integer
 *                   example: 0
 *                 won4:
 *                   type: integer
 *                   example: 0
 *                 won5:
 *                   type: integer
 *                   example: 0
 *                 won6:
 *                   type: integer
 *                   example: 0
 *       401:
 *         description: Token non valido
 *       403:
 *         description: Accesso non autorizzato
 *       500:
 *         description: Errore del server
 */
router.route('/utente/get-stats').get(authenticateToken, utentestatsController.statGetterControllerFn);


/**
 * @swagger
 * /utente/update-stats:
 *   post:
 *     summary: Aggiorna le statistiche dell'utente
 *     description: Modifica le statistiche esistenti per l'utente autenticato.
 *     tags:
 *       - Statistiche
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "mario.rossi@example.com"
 *               won:
 *                 type: boolean
 *                 example: true
 *               attempts:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Statistiche aggiornate con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Statistiche aggiornate con successo"
 *       400:
 *         description: Dati delle statistiche non validi
 *       401:
 *         description: Token non valido
 *       500:
 *         description: Errore del server
 */

router.route('/utente/update-stats').post(authenticateToken, utentestatsController.updateUtentestatsControllerFn);

module.exports = router;
