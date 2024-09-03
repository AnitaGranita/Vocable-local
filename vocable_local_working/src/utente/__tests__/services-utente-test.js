// __tests__/utenteService.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const utenteModel = require('../utenteModel');
const utenteService = require('../utenteServices');
const encryptor = require('simple-encryptor')('hqBzkw4H7Iog6561');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('utenteService', () => {
  beforeEach(async () => {
    await utenteModel.deleteMany({});
  });

  test('should create a new user successfully', async () => {
    const utenteDetails = {
      email: 'test@example.com',
      nickname: 'testuser',
      password: 'password123'
    };

    const result = await utenteService.createUtenteDBService(utenteDetails);
    expect(result.status).toBe(true);
    expect(result.msg).toBe('Utente creato con successo');

    const user = await utenteModel.findOne({ email: utenteDetails.email });
    expect(user).toBeTruthy();
    expect(encryptor.decrypt(user.password)).toBe(utenteDetails.password);
  });

  test('should not create user with existing email', async () => {
    const utenteDetails = {
      email: 'test@example.com',
      nickname: 'testuser',
      password: 'password123'
    };
    await utenteService.createUtenteDBService(utenteDetails);

    await expect(utenteService.createUtenteDBService(utenteDetails)).rejects.toEqual({
      status: false,
      msg: 'Email già in uso'
    });
  });

  test('should log in successfully and return a token', async () => {
    const utenteDetails = {
      email: 'test@example.com',
      nickname: 'testuser',
      password: 'password123'
    };
    await utenteService.createUtenteDBService(utenteDetails);

    const loginDetails = {
      email: 'test@example.com',
      password: 'password123'
    };

    const result = await utenteService.loginUtenteDBService(loginDetails);
    expect(result.status).toBe(true);
    expect(result.msg).toBe('Utente validato con successo');
    expect(result.token).toBeTruthy();
    expect(result.id).toBeTruthy();

    // Verifica il payload del token
    const decoded = jwt.verify(result.token, process.env.JWT_SECRET);
    expect(decoded.email).toBe(loginDetails.email);
  });

  test('should reject invalid login credentials', async () => {
    const loginDetails = {
      email: 'test@example.com',
      password: 'wrongpassword'
    };

    await expect(utenteService.loginUtenteDBService(loginDetails)).rejects.toEqual({
      status: false,
      msg: 'Dati non validi',
      token: '0',
      id: '0'
    });
  });

  test('should generate a reset token successfully', async () => {
    const email = 'test@example.com';
    const utenteDetails = {
      email: email,
      nickname: 'testuser',
      password: 'password123'
    };
    await utenteService.createUtenteDBService(utenteDetails);

    const result = await utenteService.generateResetToken(email);
    expect(result.status).toBe(true);
    expect(result.resetToken).toBeTruthy();
  });

  test('should reset password successfully', async () => {
    const email = 'test@example.com';
    const oldPassword = 'password123';
    const newPassword = 'newpassword123';

    await utenteService.createUtenteDBService({ email, nickname: 'testuser', password: oldPassword });

    const { resetToken } = await utenteService.generateResetToken(email);

    const result = await utenteService.resetPassword(resetToken, newPassword);
    expect(result.status).toBe(true);
    expect(result.msg).toBe('Password aggiornata con successo');

    const user = await utenteModel.findOne({ email });
    expect(user).toBeTruthy();
    expect(encryptor.decrypt(user.password)).toBe(newPassword);
  });

  test('should find a user by email', async () => {
    const email = 'test@example.com';
    const utenteDetails = {
      email: email,
      nickname: 'testuser',
      password: 'password123'
    };
    await utenteService.createUtenteDBService(utenteDetails);

    const user = await utenteService.findUserByEmail(email);
    expect(user).toBeTruthy();
    expect(user.email).toBe(email);
  });

  test('should find nickname by email', async () => {
    const email = 'test@example.com';
    const utenteDetails = {
      email: email,
      nickname: 'testuser',
      password: 'password123'
    };
    await utenteService.createUtenteDBService(utenteDetails);

    const nickname = await utenteService.findNicknameByEmail(email);
    expect(nickname).toBe('testuser');
  });

  test('should not find a nickname for a non-existent email', async () => {
    const nickname = await utenteService.findNicknameByEmail('nonexistent@example.com');
    expect(nickname).toBe(null);
  });
});
