import request from 'supertest';
import fs from 'fs';
import app from '../src/app.js';

// EDI conversion and sample file retrieval tests

test('converts EDI text to JSON', async () => {
  const edi = fs.readFileSync('samples/purchase-order.edi', 'utf8');
  const resp = await request(app).post('/convert').send({ edi });
  expect(resp.statusCode).toBe(200);
  expect(Array.isArray(resp.body.json)).toBe(true);
  expect(resp.body.json[0].segment).toBe('ISA');
});

test('returns error when no EDI provided', async () => {
  const resp = await request(app).post('/convert').send({});
  expect(resp.statusCode).toBe(400);
  expect(resp.body.error).toBe('No EDI data provided');
});

test('serves sample files', async () => {
  const resp = await request(app).get('/sample/purchase-order.edi');
  expect(resp.statusCode).toBe(200);
  expect(resp.text).toContain('ISA');
});

test('returns 404 for missing sample', async () => {
  const resp = await request(app).get('/sample/missing.edi');
  expect(resp.statusCode).toBe(404);
  expect(resp.body.error).toBe('Sample not found');
});
