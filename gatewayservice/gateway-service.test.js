const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

jest.mock('axios');

afterAll(() => {
  app.close();
})

describe('Gateway Service', () => {

  axios.get.mockImplementation((url) => {
    if (url.endsWith('getQuestions') || url.endsWith('getCapitalsQuestions') 
    || url.endsWith('getMovieDirectorsQuestions') || url.endsWith('getElementSymbolsQuestions')) {
      return Promise.resolve({
        status: 200,
        data: {
          questions: [
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
              }],
        }
      });
    } else if(url.endsWith('Questions')){
      return Promise.resolve({
        status: 200,
        data: {
          questions: [
            {
            "text": "What is the capital of France?",
            "answers": ["London", "Berlin", "Paris", "Madrid"],
            "correctAnswer": 2
            }
          ],
        }
      });
    } else if(url.endsWith('getAllUsers')) {
      return Promise.resolve({
        status: 200, 
        data: {
          users:
            [{
              "_id":"65e604d6b9b58650687ee809",
              "username":"tomas",
              "password":"$2b$10$cD6x4mUOP9Q16SfMpbWXGugPczuYcV/HMaJbVTWJ.guZoy.LmEe6e",
              "email":"tomas@gmail.com",
              "questions_answered":500,
              "correctly_answered_questions":200,
              "createdAt":"2024-03-03T17:30:54.385Z",
              "cheeseCount":1
            }]
        }
      });
    } else if(url.endsWith('/getUser')){
      return Promise.resolve({
        status: 200, 
        data: {
          "_id":"65e604d6b9b58650687ee809",
          "username":"tomas",
          "password":"$2b$10$cD6x4mUOP9Q16SfMpbWXGugPczuYcV/HMaJbVTWJ.guZoy.LmEe6e",
          "email":"tomas@gmail.com",
          "questions_answered":500,
          "correctly_answered_questions":200,
          "createdAt":"2024-03-03T17:30:54.385Z",
          "cheeseCount":1
        }
      });
    }
    

    return Promise.resolve({
      data: {
        status:"not found",
        message:"Wrong URL: Please, check the correct enpoint URL"
      }
    });
  });

  // Mock responses from external services
  axios.post.mockImplementation((url) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    } else if(url.endsWith('/sumNormalStats')){
      return Promise.resolve({ data: { message: 'User updated' } });
    } else if(url.endsWith('/sumTrivialStats')){
      return Promise.resolve({ data: { message: 'User updated' } });
    } 
  });

  // Test health
  it('should retrieve health ok message', async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
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
    expect(response.body.status).toBe('not found');
    expect(response.body.message).toBe('Wrong URL: Please, check the correct enpoint URL');
  });

  
  // Test questions

  it('should retrieve 10 questions with their corresponding answers', async () => {
    await checkCorrectQuestionsResponse('/GetQuestions', 10);
  });

  it('should retrieve 10 capitals questions with their corresponding answers', async () => {
    await checkCorrectQuestionsResponse("/GetCapitalsQuestions", 10);
  });

  it('should retrieve 10 element type symbols questions with their corresponding answers', async () => {
    await checkCorrectQuestionsResponse('/GetElementSymbolsQuestions', 10);
  });

  it('should retrieve 10 movie directors questions with their corresponding answers', async () => {
    await checkCorrectQuestionsResponse('/GetMovieDirectorsQuestions', 10);
  });

  it('should retrieve 1 history question with its corresponding answer', async () => {
    
    await checkCorrectQuestionsResponse('/GetHistoryQuestions', 1);
  }, 60000);

  it('should retrieve 1 sports-related question with its corresponding answer', async () => {
  
    await checkCorrectQuestionsResponse('/GetSportQuestions', 1);
  }, 60000);

  it('should retrieve 1 geography question with its corresponding answer', async () => {
  
    await checkCorrectQuestionsResponse('/GetGeographyQuestions', 1);
  }, 60000);

  it('should retrieve 1 geography question with its corresponding answer', async () => {
  
    await checkCorrectQuestionsResponse('/GetEntertainmentQuestions', 1);
  }, 60000);

  it('should retrieve 1 geography question with its corresponding answer', async () => {
  
    await checkCorrectQuestionsResponse('/GetChemistryQuestions', 1);
  }, 60000);


  async function checkCorrectQuestionsResponse(endpoint, retrieved){
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body.questions.length).toBe(retrieved);
    expect(response.body.questions[0]).toHaveProperty("text");
    expect(response.body.questions[0]).toHaveProperty("correctAnswer");
    expect(response.body.questions[0]).toHaveProperty("answers");
  }

  // Test openapi
  it('should retrieve swagger page', async () => {
    const response = await request(app).get("/api-doc");
    expect(response.status).toBe(301);
  });

  // Test /sumStats
  it('should respond with a successful update operation of normal game mode stats', async () => {

    await sumStats('/sumNormalStats', { 
      username: 'newuser',
      questions_answered:500,
      correctly_answered_questions:200
    });
  }, 6000);

  it('should respond with a successful update operation of trivial game mode stats', async () => {
    await sumStats('/sumTrivialStats', { 
      username: 'newuser', 
      cheeseCount:10
    });
  }, 6000);


  async function sumStats(endpoint, user){
    const response = await request(app)
      .post(endpoint)
      .send(user);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User updated");
  }

  // Test getUser(s)

  it('should retrieve the specified user', async () => {
    const response = await request(app).post('/getUser').send({username: "tomas"});
    expect(response.status).toBe(200);
    checkCorrectUserFields(response.body);

  }, 6000);

  it('should retrieve all the users', async () => {
    const response = await request(app).get('/getAllUsers');
    expect(response.status).toBe(200);
    expect(response.body.users.length).toBe(1);
    console.log(response.body);
    await checkCorrectUserFields(response.body.users[0]);

  }, 6000);

  async function checkCorrectUserFields(user){
    expect(user).toHaveProperty("_id");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("questions_answered");
    expect(user).toHaveProperty("correctly_answered_questions");
    expect(user).toHaveProperty("cheeseCount");
  }
  
});