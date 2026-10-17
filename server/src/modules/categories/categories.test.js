import request from 'supertest';
import app from '../../app.js';

describe('Categories API Module', () => {
  it('should list all available categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(4);
  });

  it('should get a single category by id', async () => {
    const res = await request(app).get('/api/categories/cat-sci');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('מדעים');
    expect(Array.isArray(res.body.data.subtopics)).toBe(true);
  });

  it('should create a new category', async () => {
    const newCat = {
      name: 'אנגלית',
      icon: '🔤',
      description: 'אוצר מילים, דקדוק וקריאה באנגלית',
      subtopics: ['ABC', 'אוצר מילים בסיסי']
    };

    const res = await request(app)
      .post('/api/categories')
      .send(newCat);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('אנגלית');
    expect(res.body.data.subtopics).toContain('ABC');
  });

  it('should add a subtopic to an existing category', async () => {
    const res = await request(app)
      .post('/api/categories/cat-sci/subtopics')
      .send({ subtopic: 'חלל ומערכת השמש' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.subtopics).toContain('חלל ומערכת השמש');
  });

  it('should remove a subtopic from a category', async () => {
    const res = await request(app)
      .delete(`/api/categories/cat-sci/subtopics/${encodeURIComponent('חלל ומערכת השמש')}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.subtopics).not.toContain('חלל ומערכת השמש');
  });
});
