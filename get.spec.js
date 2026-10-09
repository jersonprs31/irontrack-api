const request = require('supertest');
const baseURL = 'https://irontrack-api-m4om.onrender.com';

describe('Test GET routes for all collections', () => {
  test('responds to GET /users', async () => {
    const res = await request(baseURL).get('/users');
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET /exercises', async () => {
    const res = await request(baseURL).get('/exercises');
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET /workouts', async () => {
    const res = await request(baseURL).get('/workouts');
    expect(res.statusCode).toBe(200);
  });

  test('responds to GET /workoutLogs', async () => {
    const res = await request(baseURL).get('/workoutLogs');
    expect(res.statusCode).toBe(200);
  });
});