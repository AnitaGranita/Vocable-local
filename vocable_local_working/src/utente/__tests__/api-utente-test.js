const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { 
    createUtenteControllerFn, 
    loginUtenteControllerFn, 
    meUtenteControllerFn, 
    logoutUtenteControllerFn, 
    forgotPasswordControllerFn, 
    resetPasswordControllerFn 
} = require('../utenteController'); // aggiorna con il path corretto
const utenteService = require('../utenteServices'); // aggiorna con il path corretto
const authenticateToken = require('../authenticateToken'); // aggiorna con il path corretto

// Configura l'app Express
const app = express();
app.use(express.json());

// Applica il middleware e le route
app.post('/create-utente', createUtenteControllerFn);
app.post('/login', loginUtenteControllerFn);
app.get('/me', authenticateToken, meUtenteControllerFn);
app.post('/logout', logoutUtenteControllerFn);
app.post('/forgot-password', forgotPasswordControllerFn);
app.post('/reset-password', resetPasswordControllerFn);

// Mock dei servizi
jest.mock('../utenteServices'); // aggiorna con il path corretto
jest.mock('jsonwebtoken');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('API Tests', () => {
    const validToken = 'valid-token';
    const invalidToken = 'invalid-token';
    const decodedUser = { email: 'test@example.com' };

    beforeEach(() => {
        // Mock di jwt.verify
        jwt.verify.mockImplementation((token, secret, callback) => {
            if (token === validToken) {
                callback(null, decodedUser);
            } else {
                callback(new Error('Invalid token'), null);
            }
        });
    });

    describe('POST /create-utente', () => {
        it('should create a user successfully', async () => {
            utenteService.createUtenteDBService.mockResolvedValue({ status: true });

            const response = await request(app)
                .post('/create-utente')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: 'Utente creato con successo'
            });
        });

        it('should return an error when creation fails', async () => {
            utenteService.createUtenteDBService.mockResolvedValue({ status: false, msg: "Errore nella creazione dell'utente" });

            const response = await request(app)
                .post('/create-utente')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: false,
                message: "Errore nella creazione dell'utente"
            });
        });
    });

    describe('POST /login', () => {
        it('should login a user successfully', async () => {
            utenteService.loginUtenteDBService.mockResolvedValue({
                status: true,
                msg: "Login successful",
                token: validToken,
                id: 'someUserId'
            });

            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: 'Login successful',
                token: validToken,
                id: 'someUserId'
            });
        });

        it('should return an error when login fails', async () => {
            utenteService.loginUtenteDBService.mockResolvedValue({ status: false, msg: "Invalid credentials" });

            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: false,
                message: 'Invalid credentials'
            });
        });
    });

    describe('GET /me', () => {
        it('should return user details if authenticated', async () => {
            utenteService.findUserByEmail.mockResolvedValue({
                email: 'test@example.com',
                nickname: 'testuser',
                _id: 'someUserId'
            });

            const response = await request(app)
                .get('/me')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                email: 'test@example.com',
                nickname: 'testuser',
                id: 'someUserId'
            });
        });

        it('should return 401 if no token is provided', async () => {
            const response = await request(app).get('/me');

            expect(response.statusCode).toBe(401);
        });

        it('should return 403 if token is invalid', async () => {
            const response = await request(app)
                .get('/me')
                .set('Authorization', `Bearer ${invalidToken}`);

            expect(response.statusCode).toBe(403);
        });

        it('should return 404 if user not found', async () => {
            utenteService.findUserByEmail.mockResolvedValue(null);

            const response = await request(app)
                .get('/me')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ msg: 'Utente non trovato' });
        });
    });

    describe('POST /logout', () => {
        it('should logout successfully', async () => {
            const response = await request(app)
                .post('/logout')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: 'Logout avvenuto con successo'
            });
        });
    });

    describe('POST /forgot-password', () => {
        it('should generate reset token successfully', async () => {
            utenteService.generateResetToken.mockResolvedValue({
                status: true,
                resetToken: 'someResetToken'
            });

            const response = await request(app)
                .post('/forgot-password')
                .send({ email: 'test@example.com' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: 'Token di reset generato con successo. Controlla la tua email per il link di reset.',
                resetToken: 'someResetToken'
            });
        });

        it('should return an error if email is not provided', async () => {
            const response = await request(app)
                .post('/forgot-password')
                .send({});

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                status: false,
                message: 'Email è obbligatoria.'
            });
        });
    });

    describe('POST /reset-password', () => {
        it('should reset password successfully', async () => {
            utenteService.resetPassword.mockResolvedValue({
                status: true,
                message: 'Password reset con successo'
            });

            const response = await request(app)
                .post('/reset-password')
                .send({ token: 'someResetToken', newPassword: 'newPassword123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: 'Password reset con successo'
            });
        });

        it('should return an error if reset fails', async () => {
            utenteService.resetPassword.mockRejectedValue(new Error('Errore durante il reset della password'));

            const response = await request(app)
                .post('/reset-password')
                .send({ token: 'someResetToken', newPassword: 'newPassword123' });

            expect(response.statusCode).toBe(500);
            expect(response.body).toEqual({
                status: false,
                message: 'Errore durante il reset della password'
            });
        });
    });
});
