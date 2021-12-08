import request from 'supertest';
import app from '../../app';
import User from '../../models/user';
import { connectToTestDB, disconnectToTestDB } from '../../database/test-db';


beforeAll(async () => {
  await connectToTestDB();

  await new User({
    name: 'user',
    pwd: 'pwd',
    locked: false,
    roles: ['admin']
  }).save();
});

afterAll(async () => {
  await disconnectToTestDB();
});

describe('auth route', () => {
  it('should return status 400 given incomplete request body',async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'user',
      });
    expect(res.statusCode).toBe(400);
  });

  it('should return jwt given correct username and password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'user',
        pwd: 'pwd'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('jwtToken');
  });

  it('should return 401 given wrong username and password and lock user after 3 attempts within 5 minute', async () => {
    const firstRes = await request(app)
      .post('/api/login')
      .send({
        username: 'user',
        pwd: 'pw'
      });
    expect(firstRes.statusCode).toBe(401);

    await request(app)
    .post('/api/login')
    .send({
      username: 'user',
      pwd: 'pw'
    });
    await request(app)
    .post('/api/login')
    .send({
      username: 'user',
      pwd: 'pw'
    });

    const lastRes = await request(app)
    .post('/api/login')
    .send({
      username: 'user',
      pwd: 'pwd'
    });
    expect(lastRes.statusCode).toBe(401);
  });
});