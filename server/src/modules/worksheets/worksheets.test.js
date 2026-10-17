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

  it('should reorder worksheets according to orderedIds', async () => {
    const listRes = await request(app).get('/api/worksheets');
    const ids = listRes.body.data.map(item => item.id);
    const reversedIds = [...ids].reverse();

    const response = await request(app)
      .put('/api/worksheets/reorder')
      .send({ orderedIds: reversedIds });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data[0].id).toBe(reversedIds[0]);
  });

  it('should delete a worksheet', async () => {
    // Create a temporary worksheet to delete
    const createRes = await request(app)
      .post('/api/worksheets')
      .send({
        title: "דף זמני למחיקה",
        grade: "כיתה א",
        subject: "מדעים",
        price: 10
      });

    const tempId = createRes.body.data.id;
    const deleteRes = await request(app).delete(`/api/worksheets/${tempId}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body.success).toBe(true);

    const checkRes = await request(app).get(`/api/worksheets/${tempId}`);
    expect(checkRes.status).toBe(404);
  });
});
