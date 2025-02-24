const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
process.env.PORT = '8004';


// APP
process.env.PORT = '8004';
const app = express();
const port = process.env.PORT || 8005;
let mongoServer;



beforeAll(async () => {
  jest.setTimeout(50000);

  // -- CONNECTION TO MONGO MEMORY SERVER
  mongoServer = await MongoMemoryServer.create(); // database in memory
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;

  mongoose.connect(mongoUri).then(
    console.log('Succesfully connected to Mongo Memory Server')
  );


  // routes and middlewares
  const userRoutes = require('./user-service.js');
  app.use(bodyParser.json());
  app.use('/user', userRoutes);

  app.listen(port, () => {
    console.log(`User Service listening at http://localhost:${port}`);
  });

},50000);

afterAll(async () => {
  jest.setTimeout(30000);
  await mongoose.connection.close();
  await mongoServer.stop();
});



describe('User Service', () => {


  // --- TESTS FOR /adduser  ---


  // TEST TO ADD A USER
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@gmail.com'
    };

    const response = await request(app).post('/user/adduser').send(newUser);
    
    expect(response.status).toBe(200);
  });


  // TEST TO ADD A USER WITHOUT REQUIRED FIELDS
  it('should return 404 if required fields are missing on POST /adduser', async () => {
    const response = await request(app)
      .post('/user/adduser')
      .send({}); // sending an empty request body

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // TEST TO ADD A USER WITHOUT THE USERNAME
  it('should return 400 if username is missing on POST /adduser', async () => {
    const newUser = {
      password: 'testpassword',
      email: 'test@gmail.com'
    };

    const response = await request(app)
      .post('/user/adduser')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // TEST TO ADD A USER WITHOUT THE PASSWORD
  it('should return 400 if password is missing on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@gmail.com'
    };

    const response = await request(app)
      .post('/user/adduser')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // TEST TO ADD A USER WITHOUT THE EMAIL
  it('should return 400 if email is missing on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    };

    const response = await request(app)
      .post('/user/adduser')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // TEST TO ADD A USER WITH AN EXISTING USERNAME
  it('should return 400 if username already exists on POST /adduser', async () => {
    const existingUser = {
      username: 'testuser', // Username already exists (inserted in the first test)
      password: 'testpassword',
      email: 'test@gmail.com'
    };

    const response = await request(app)
      .post('/user/adduser')
      .send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });


  // --- TESTS FOR /sumNormalStats  ---

  // TEST TO EDIT A USER THAT EXISTS
  it('should update user information on POST /sumNormalStats', async () => {
    const updateUser = {
      username: 'testuser',
      questions_answered: 1,
      correctly_answered_questions: 1,
    };

    const response = await request(app)
      .post('/user/sumNormalStats')
      .send(updateUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  // TEST TO EDIT A USER THAT DOESN'T EXIST
  it('should return 404 if user is not found on POST /sumNormalStats', async () => {
    const nonExistentUser = {
      username: 'nonexistentuser',
      questions_answered: 1,
      correctly_answered_questions: 1,
    };

    const response = await request(app)
      .post('/user/sumNormalStats')
      .send(nonExistentUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });


  // --- TESTS FOR /sumTrivialStats  ---

  // TEST TO ADD 3 CHEESES TO A USER THAT EXISTS
  it('should update user information on POST /sumTrivialStats', async () => {
    const updateUser = {
      username: 'testuser',
      cheeseCount: 5,
    };

    const response = await request(app)
      .post('/user/sumTrivialStats')
      .send(updateUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  // TEST TO EDIT A USER ADDING CHEESES TO A USER THAT DOESN'T EXIST
  it('should return 404 if user is not found on POST /sumTrivialStats', async () => {
    const nonExistentUser = {
      username: 'nonexistentuser',
      cheeseCount: 5,
    };

    const response = await request(app)
      .post('/user/sumTrivialStats')
      .send(nonExistentUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });


  // --- TESTS FOR /getAllUsers  ---


  // TESTS TO GET ALL THE USERS
  it('should get all users on GET /getAllUsers', async () => {
    const response = await request(app).get('/user/getAllUsers');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 500 if there is an internal server error on GET /getAllUsers', async () => {
    // We simulate an error in the database by closing the connection before the request
    await mongoose.connection.close();

    const response = await request(app).get('/user/getAllUsers');
    
    
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
 

});