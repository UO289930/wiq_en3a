const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    }
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  
  /**

  // Test wrong endpoint
  it('should give an error message', async () => {
    const response = await request(app).get('/text');
    expect(response.statusCode).toBe(404);
    expect(response._body.status).toBe('not found');
    expect(response._body.message).toBe('Wrong URL: Please, check the correct enpoint URL');
  });

  
  it('should retrieve 10 capitals questions with their corresponding answers', async () => {
    //checkCorrectQuestionsResponse('/GetCapitalsQuestions', 10);
    const response = await request(app).get('/GetCapitalsQuestions');
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response._body.length).toBe(10);
    expect(response._body[0]).toHaveProperty("text");
    expect(response._body[0]).toHaveProperty("correctAnswer");
    expect(response._body[0]).toHaveProperty("answers");
  }, 10000);
  
  it('should retrieve 30 questions with their corresponding answers', async () => {
    const response = await request(app).get('/GetQuestions');
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response._body.length).toBe(30);
    expect(response._body[0]).toHaveProperty("text");
    expect(response._body[0]).toHaveProperty("correctAnswer");
    expect(response._body[0]).toHaveProperty("answers");
  }, 30000);

  it('should retrieve 10 element type symbols questions with their corresponding answers', async () => {
    checkCorrectQuestionsResponse('/GetElementSymbolsQuestions', 10);
  }, 10000);

  it('should retrieve 10 movie directors questions with their corresponding answers', async () => {
    checkCorrectQuestionsResponse('/GetDirectorsQuestions', 10);
  }, 10000);


  async function checkCorrectQuestionsResponse(endpoint, retrieved){
    const response = await request(app).get(endpoint);
    console.log(response);
    expect(response.statusCode).toBe(retrieved);
    expect(response._body.length).toBe(30);
    expect(response._body[0]).toHaveProperty("text");
    expect(response._body[0]).toHaveProperty("correctAnswer");
    expect(response._body[0]).toHaveProperty("answers");
  }

   */

  
});