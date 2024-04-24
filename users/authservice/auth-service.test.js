const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./auth-model');
const express = require('express');
const bodyParser = require('body-parser');
 
// APP
process.env.PORT = '8006';
const app = express();
const port = process.env.PORT || 8007;
let mongoServer;
 
 
// user that already exists in the database
const user = {
  username: 'authtests',
  password: '0000',
  email: 'authtests@gmail.com'
};
 
// Add a new user to the database
async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
    email: user.email
  });
 
  await newUser.save();
}
 
 
beforeAll(async () => {
  jest.setTimeout(30000);

  // -- CONNECTION TO MONGO MEMORY SERVER
  mongoServer = await MongoMemoryServer.create(); // database in memory
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;

  mongoose.connect(mongoUri).then(
    console.log('Succesfully connected to Mongo Memory Server')
  );
  
  
  // routes and middlewares
  const authRoutes = require('./auth-service.js');
  app.use(bodyParser.json());
  app.use('/auth', authRoutes);
  
  app.listen(port, () => {
    console.log(`Auth Service listening at http://localhost:${port}`);
  });
 
  await addUser(user);
}, 50000);
 
 
afterAll(async () => {
  jest.setTimeout(30000);
  await mongoose.connection.close();
  await mongoServer.stop();
});
 
 
describe('Auth Service', () => {
 
  // TEST TO LOGIN WITH A VALID USER
  // it('Should perform a login operation /auth/login', async () => {
  //   const response = await request(app)
  //     .post('/auth/login') 
  //     .send({ username: user.username, password: user.password }); 
  
  //   expect(response.status).toBe(200);
  //   expect(response.body).toHaveProperty('token');
  // });
 
 
  // TEST TO LOGIN WITH AN INVALID USER
  it('Should return 401 with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: user.username, password: 'invalidpassword' });
 
    expect(response.statusCode).toBe(401);
  });
 
  // TEST TO LOGIN WITHOUT USERNAME
  it('Should return 400 if username is missing', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ password: user.password });
 
    expect(response.statusCode).toBe(400);
  });
 
  // TEST TO LOGIN WITHOUT USERNAME
  it('Should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ username: user.username });
 
    expect(response.statusCode).toBe(400);
  });
 
 
 
});