import request from 'supertest';
import app from '../../app.js';

describe('Orders & Customer Library API', () => {
  it('should return the customer library of purchased materials', async () => {
    const response = await request(app).get('/api/orders/my-library');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should successfully create a demo order without requiring real payment gateway', async () => {
    const orderPayload = {
      customerName: "מורה לבדיקה",
      customerEmail: "tester@school.edu.il",
      totalAmount: 25,
      items: [
        { id: "ws-1", title: "מוכנות לקריאה", price: 12 },
        { id: "ws-2", title: "שברים פשוטים", price: 13 }
      ]
    };

    const response = await request(app)
      .post('/api/orders')
      .send(orderPayload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.customerEmail).toBe(orderPayload.customerEmail);
    expect(response.body.data.items.length).toBe(2);
  });
});
