const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const utentestatsModel = require('../utentestatsModel');
const utentestatsServices = require('../utentestatsServices');
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

describe('utentestatsServices', () => {
  beforeEach(async () => {
    await utentestatsModel.deleteMany({});
  });

  test('should create user stats successfully', async () => {
    const utentestatsDetails = {
      email: 'test@example.com',
      totalgames: 5,
      gameswon: 3,
      gameslost: 2,
      won1: 1,
      won2: 0,
      won3: 1,
      won4: 1,
      won5: 0,
      won6: 0
    };

    const result = await utentestatsServices.createUtentestatsDBService(utentestatsDetails);
    expect(result).toBe(true);

    const stats = await utentestatsModel.findOne({ email: utentestatsDetails.email });
    expect(stats).toBeTruthy();
    expect(stats.totalgames).toBe(utentestatsDetails.totalgames);
  });

  test('should not create user stats with existing email', async () => {
    const utentestatsDetails = {
      email: 'test@example.com',
      totalgames: 5,
      gameswon: 3,
      gameslost: 2,
      won1: 1,
      won2: 0,
      won3: 1,
      won4: 1,
      won5: 0,
      won6: 0
    };
    await utentestatsServices.createUtentestatsDBService(utentestatsDetails);

    await expect(utentestatsServices.createUtentestatsDBService(utentestatsDetails)).rejects.toEqual({
      status: false,
      msg: "Email già in uso"
    });
  });

  test('should find stats by email', async () => {
    const email = 'test@example.com';
    const utentestatsDetails = {
      email: email,
      totalgames: 5,
      gameswon: 3,
      gameslost: 2,
      won1: 1,
      won2: 0,
      won3: 1,
      won4: 1,
      won5: 0,
      won6: 0
    };
    await utentestatsServices.createUtentestatsDBService(utentestatsDetails);

    const stats = await utentestatsServices.findStatsByEmail(email);
    expect(stats).toBeTruthy();
    expect(stats.email).toBe(email);
  });

  test('should update user stats successfully', async () => {
    const email = 'test@example.com';
    const utentestatsDetails = {
      email: email,
      totalgames: 5,
      gameswon: 3,
      gameslost: 2,
      won1: 1,
      won2: 0,
      won3: 1,
      won4: 1,
      won5: 0,
      won6: 0
    };
    await utentestatsServices.createUtentestatsDBService(utentestatsDetails);

    const result = await utentestatsServices.updateUtentestatsDBService(email, true, 1);

    expect(result.status).toBe(true);
    expect(result.message).toBe('Statistiche aggiornate con successo');

    const updatedStats = await utentestatsModel.findOne({ email });
    expect(updatedStats.totalgames).toBe(utentestatsDetails.totalgames + 1);
    expect(updatedStats.gameswon).toBe(utentestatsDetails.gameswon + 1);
    expect(updatedStats.gameslost).toBe(utentestatsDetails.gameslost);
    expect(updatedStats.won1).toBe(utentestatsDetails.won1 + 1);
  });

  test('should return error if user stats are not found for update', async () => {
    const email = 'nonexistent@example.com';

    const result = await utentestatsServices.updateUtentestatsDBService(email, true, 1);

    expect(result.status).toBe(false);
    expect(result.message).toBe('Utente non trovato');
  });

  test('should return server error if an exception is thrown', async () => {
    jest.spyOn(utentestatsServices, 'findStatsByEmail').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const result = await utentestatsServices.updateUtentestatsDBService('test@example.com', true, 1);

    expect(result.status).toBe(false);
    expect(result.message).toBe('Errore del server');
  });
});
