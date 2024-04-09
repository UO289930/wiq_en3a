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
  
  axios.get.mockImplementation((url) => {
    if (url.endsWith('/getCapitalsQuestions') 
        || url.endsWith('/getQuestions') 
        || url.endsWith('/getElementSymbolsQuestions') 
        || url.endsWith('/getMovieDirectorsQuestions')) {
      return Promise.resolve({data: {questions: [
        {
        "text": "What is the capital of France?",
        "answers": ["London", "Berlin", "Paris", "Madrid"],
        "correctAnswer": 2
        },
        {
        "text": "What is the tallest mountain in the world?",
        "answers": ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        "correctAnswer": 0
        },
        {
        "text": "What is the chemical symbol for water?",
        "answers": ["H2O", "NaCl", "CO2", "He"],
        "correctAnswer": 0
        },
        {
        "text": "In which year was the first iPhone released?",
        "answers": ["2004", "2007", "2010", "2013"],
        "correctAnswer": 1
        },
        {
        "text": "What is the name of the largest ocean on Earth?",
        "answers": ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        "correctAnswer": 0
        },
        {
        "text": "How many sides does a hexagon have?",
        "answers": ["3", "4", "5", "6"],
        "correctAnswer": 3
        },
        {
        "text": "What is the currency of Japan?",
        "answers": ["Euro", "Dollar", "Yen", "Yuan"],
        "correctAnswer": 2
        },
        {
        "text": "What is the process of turning liquid water into vapor called?",
        "answers": ["Evaporation", "Condensation", "Precipitation", "Sublimation"],
        "correctAnswer": 0
        },
        {
        "text": "What is the name of the world's most famous playwright?",
        "answers": ["William Shakespeare", "Arthur Miller", "Tennessee Williams", "George Bernard Shaw"],
        "correctAnswer": 0
        },
        {
        "text": "What is the scientific name for a human?",
        "answers": ["Homo sapiens", "Pan troglodytes", "Canis lupus familiaris", "Felis catus"],
        "correctAnswer": 0
        }
        ]} });
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

  // Test wrong endpoint
  it('should give an error message', async () => {
    const response = await request(app).get('/text');
    expect(response.statusCode).toBe(404);
    expect(response._body.status).toBe('not found');
    expect(response._body.message).toBe('Wrong URL: Please, check the correct enpoint URL');
  });

  /*
  
  it('should retrieve 10 capitals questions with their corresponding answers', async () => {
    //checkCorrectQuestionsResponse('/GetCapitalsQuestions', 10);
    const response = await request(app).get('/GetCapitalsQuestions');
    expect(response.statusCode).toBe(200);
    expect(response.body.questions.length).toBe(10);
    expect(response.body.questions[0]).toHaveProperty("text");
    expect(response.body.questions[0]).toHaveProperty("correctAnswer");
    expect(response.body.questions[0]).toHaveProperty("answers");
  }, 10000);

  
  it('should retrieve 10 questions with their corresponding answers', async () => {
    //checkCorrectQuestionsResponse('/GetQuestions', 10);
    const response = await request(app).get('/GetQuestions');
    expect(response.statusCode).toBe(200);
    expect(response.body.questions.length).toBe(10);
    expect(response.body.questions[0]).toHaveProperty("text");
    expect(response.body.questions[0]).toHaveProperty("correctAnswer");
    expect(response.body.questions[0]).toHaveProperty("answers");
  }, 30000);

  it('should retrieve 10 element type symbols questions with their corresponding answers', async () => {
    //checkCorrectQuestionsResponse('/GetElementSymbolsQuestions', 10);
    const response = await request(app).get('/GetElementSymbolsQuestions');
    console.log(response.data);
    expect(response.statusCode).toBe(200);
    expect(response.body.questions.length).toBe(10);
    expect(response.body.questions[0]).toHaveProperty("text");
    expect(response.body.questions[0]).toHaveProperty("correctAnswer");
    expect(response.body.questions[0]).toHaveProperty("answers");
  }, 10000);

  it('should retrieve 10 movie directors questions with their corresponding answers', async () => {
    //checkCorrectQuestionsResponse('/getMovieDirectorsQuestions', 10);
    const response = await request(app).get('/GetMovieDirectorsQuestions');
    console.log(response.data);
    expect(response.statusCode).toBe(200);
    expect(response.body.questions.length).toBe(10);
    expect(response.body.questions[0]).toHaveProperty("text");
    expect(response.body.questions[0]).toHaveProperty("correctAnswer");
    expect(response.body.questions[0]).toHaveProperty("answers");
  }, 10000);


  async function checkCorrectQuestionsResponse(endpoint, retrieved){
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(200);
    expect(response._body.length).toBe(retrieved);
    expect(response._body[0]).toHaveProperty("text");
    expect(response._body[0]).toHaveProperty("correctAnswer");
    expect(response._body[0]).toHaveProperty("answers");
  }*/
  
});