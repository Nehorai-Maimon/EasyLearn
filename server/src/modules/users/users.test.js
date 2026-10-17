import request from 'supertest';
import app from '../../app.js';

describe('Users Module API', () => {
  it('should list all registered users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should get user profile by query email', async () => {
    const response = await request(app).get('/api/users/profile?email=nehoraimimon@gmail.com');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.role).toBe('ADMIN');
  });

  it('should register a new customer', async () => {
    const newUser = {
      name: 'מורה חדש',
      email: `teacher.${Date.now()}@school.edu.il`,
      role: 'CUSTOMER'
    };

    const response = await request(app).post('/api/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(newUser.email);
  });
});
