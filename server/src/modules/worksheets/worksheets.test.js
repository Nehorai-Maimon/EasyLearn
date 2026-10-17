import request from 'supertest';
import app from '../../app.js';

describe('Worksheets API Endpoints', () => {
  it('should list all available worksheets', async () => {
    const response = await request(app).get('/api/worksheets');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should fetch a single worksheet by valid ID', async () => {
    const response = await request(app).get('/api/worksheets/ws-1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe('ws-1');
  });

  it('should return 404 for non-existent worksheet ID', async () => {
    const response = await request(app).get('/api/worksheets/non-existent-id');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should create a new worksheet with subSubject', async () => {
    const newSheet = {
      title: "מערכת העיכול בגוף האדם",
      description: "מבנה מערכת העיכול ותפקידי האיברים",
      grade: "כיתה ה",
      subject: "מדעים",
      subSubject: "גוף האדם ובריאות",
      price: 14
    };

    const response = await request(app)
      .post('/api/worksheets')
      .send(newSheet);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(newSheet.title);
    expect(response.body.data.subSubject).toBe(newSheet.subSubject);
  });
});
