const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user-model');
const { app } = require('../index.js'); 


let mongoServer;

// Mock user data for testing
const user = {
  username: 'testuser',
  password: 'password123',
  email: 'test@example.com',
};

beforeAll(async () => {
  jest.setTimeout(30000);
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
});

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
  it('should return 404 if required fields are missing', async () => {
    const response = await request(app)
      .post('/user/adduser')
      .send({}); // sending an empty request body

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // TEST TO ADD A USER WITHOUT THE USERNAME
  it('should return 400 if username is missing', async () => {
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
  it('should return 400 if password is missing', async () => {
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
  it('should return 400 if email is missing', async () => {
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


  // --- TESTS FOR /editUser  ---

  // TEST TO EDIT A USER THAT EXISTS
  it('should update user information', async () => {
    const updateUser = {
      username: 'rita',
      questions_answered: 1,
      correctly_answered_questions: 1,
    };

    const response = await request(app)
      .post('/user/editUser')
      .send(updateUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User updated');
  });

  // TEST TO EDIT A USER THAT DOESN'T EXIST
  it('should return 404 if user is not found', async () => {
    const nonExistentUser = {
      username: 'nonexistentuser',
      questions_answered: 1,
      correctly_answered_questions: 1,
    };

    const response = await request(app)
      .post('/user/editUser')
      .send(nonExistentUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
 

});

