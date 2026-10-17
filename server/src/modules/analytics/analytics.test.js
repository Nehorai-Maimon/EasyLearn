import request from 'supertest';
import app from '../../app.js';

describe('Analytics Module API', () => {
  it('should return topic views heatmap data', async () => {
    const response = await request(app).get('/api/analytics/heatmap');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty('heatScore');
  });

  it('should return dashboard overview KPI statistics', async () => {
    const response = await request(app).get('/api/analytics/overview');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('totalEarnings');
    expect(response.body.data).toHaveProperty('totalDownloads');
    expect(response.body.data).toHaveProperty('activeSheets');
  });

  it('should return top performing worksheets', async () => {
    const response = await request(app).get('/api/analytics/top-worksheets?limit=3');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeLessThanOrEqual(3);
  });
});
