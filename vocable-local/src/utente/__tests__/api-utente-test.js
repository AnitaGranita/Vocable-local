const request = require('supertest');
const express = require('express');
const { createUtenteControllerFn, loginUtenteControllerFn, meUtenteControllerFn, logoutUtenteControllerFn, forgotPasswordControllerFn } = require('../utenteController');
const utenteService = require('../utenteServices');

const app = express();
app.use(express.json());

// Mocking endpoints
app.post('/create', createUtenteControllerFn);
app.post('/login', loginUtenteControllerFn);
app.get('/me', meUtenteControllerFn);
app.post('/logout', logoutUtenteControllerFn);
app.post('/forgot-password', forgotPasswordControllerFn);

// Mocking service methods
jest.mock('../utenteServices');

describe('Utente Controller Tests', () => {

    describe('POST /create', () => {
        it('should create a new user successfully', async () => {
            utenteService.createUtenteDBService.mockResolvedValue({ status: true });
            
            const response = await request(app)
                .post('/create')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: "Utente creato con successo"
            });
        });

        it('should return an error when user creation fails', async () => {
            utenteService.createUtenteDBService.mockResolvedValue({ status: false, msg: 'Errore: Impossibile creare l\'utente' });

            const response = await request(app)
                .post('/create')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: false,
                message: "Errore: Impossibile creare l'utente"
            });
        });
    });

    describe('POST /login', () => {
        it('should log in a user successfully', async () => {
            utenteService.loginUtenteDBService.mockResolvedValue({ status: true, msg: 'Login successful', token: 'fake-jwt-token', id: '12345' });

            const response = await request(app)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: 'Login successful',
                token: 'fake-jwt-token',
                id: '12345'
            });
        });

        it('should return an error when login fails', async () => {
            utenteService.loginUtenteDBService.mockResolvedValue({ status: false, msg: 'Invalid credentials' });

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
        it('should return user details', async () => {
            utenteService.findUserByEmail.mockResolvedValue({ email: 'test@example.com', nickname: 'testuser', _id: '12345' });

            const response = await request(app)
                .get('/me')
                .set('Authorization', 'Bearer fake-jwt-token');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                email: 'test@example.com',
                nickname: 'testuser',
                id: '12345'
            });
        });

        it('should return an error when user is not found', async () => {
            utenteService.findUserByEmail.mockResolvedValue(null);

            const response = await request(app)
                .get('/me')
                .set('Authorization', 'Bearer fake-jwt-token');

            expect(response.statusCode).toBe(404);
            expect(response.body).toEqual({ msg: 'Utente non trovato' });
        });
    });

    describe('POST /logout', () => {
        it('should log out successfully', async () => {
            const response = await request(app)
                .post('/logout');

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: "Logout avvenuto con successo"
            });
        });
    });

    describe('POST /forgot-password', () => {
        it('should generate a reset token successfully', async () => {
            utenteService.generateResetToken.mockResolvedValue({ status: true, resetToken: 'reset-token' });

            const response = await request(app)
                .post('/forgot-password')
                .send({ email: 'test@example.com' });

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({
                status: true,
                message: "Token di reset generato con successo. Controlla la tua email per il link di reset.",
                resetToken: 'reset-token'
            });
        });

        it('should return an error when reset token generation fails', async () => {
            utenteService.generateResetToken.mockResolvedValue({ status: false, msg: 'Errore: Impossibile generare il token di reset.' });

            const response = await request(app)
                .post('/forgot-password')
                .send({ email: 'test@example.com' });

            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                status: false,
                message: 'Errore: Impossibile generare il token di reset.'
            });
        });
    });
});
