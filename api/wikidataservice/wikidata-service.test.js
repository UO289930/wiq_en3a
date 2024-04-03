const request = require('supertest');

let app;

beforeAll(async () => {
  app = require('./wikidata-service'); 
});

afterAll(async () => {
    app.close();
});

describe('Wikidata Service', () => {

  function checkInvariant(response){
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(10);
    expect(response.body[0]).toHaveProperty('text');
    expect(response.body[0]).toHaveProperty('answers');
    expect(response.body[0]).toHaveProperty('correctAnswer');
  }
  
  it('should retrieve 10 capitals questions with their corresponding answers', async () => {

    const response = await request(app).get('/GetCapitalsQuestions');
    checkInvariant(response);
  });

});
