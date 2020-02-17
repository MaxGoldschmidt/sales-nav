const request = require('supertest');
const app = require('../../../app');

describe('Opportunities Endpoints', () => {
  it('returns a 200 error code', async () => {
    const res = await request(app).get('/opportunities');
    expect(res.statusCode).toEqual(200);
  });

  it('returns JSON', async () => {
    const res = await request(app).get('/opportunities');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  });

  it('returns a JSON array of objects containing a sales rep and a company', async () => {
    const res = await request(app).get('/opportunities');
    const opportunities = res.body;
    const opportunity = opportunities[0];
    expect('representative' in opportunity).toBe(true);
    expect('company' in opportunity).toBe(true);
  });
});
