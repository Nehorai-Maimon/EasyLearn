import request from 'supertest';
import app from '../../app.js';

describe('Health Check API Endpoint', () => {
  it('should return 200 OK and valid service status', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('service', 'EasyLearn Backend API');
  });
});
