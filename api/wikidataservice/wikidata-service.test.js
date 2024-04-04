const request = require('supertest');
//const axios = require('axios');

let app;

beforeAll(async () => {
  app = require('./wikidata-service');
});

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
  };
});

afterAll(async () => {
    app.close();
});

describe('Wikidata Service', () => {
  
  it('should retrieve 10 capitals questions with their corresponding answers', async () => {

    //const res = await axios.get('http://51.103.210.249:8000/GetCapitalsQuestions');
  
    const res = await request(app).get('/getCapitalsQuestions');

    expect(res.status).toBe(200);
    expect(res.data.length).toBe(10);
    expect(res.data[0]).toHaveProperty('text');
    expect(res.data[0]).toHaveProperty('answers');
    expect(res.data[0]).toHaveProperty('correctAnswer');
  });

  it('should retrieve 10 capitals questions with their corresponding answers', async () => {
  
    const res = await request(app).get('/getDirectorsQuestions');

    expect(res.status).toBe(200);
    expect(res.data.length).toBe(10);
    expect(res.data[0]).toHaveProperty('text');
    expect(res.data[0]).toHaveProperty('answers');
    expect(res.data[0]).toHaveProperty('correctAnswer');
  });

  it('should retrieve 10 capitals questions with their corresponding answers', async () => {
  
    const res = await request(app).get('/getElementSymbolsQuestions');

    expect(res.status).toBe(200);
    expect(res.data.length).toBe(10);
    expect(res.data[0]).toHaveProperty('text');
    expect(res.data[0]).toHaveProperty('answers');
    expect(res.data[0]).toHaveProperty('correctAnswer');
  });

});
