const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./authservice/auth-model.js');
const { app } = require('./index.js');
 
 
let mongoServer;
 
 
// user that already exists in the database
const user = {
  username: 'trogui',
  password: '0000',
};
 
// Add a new user to the database
async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });
 
  await newUser.save();
}
 
 
beforeAll(async () => {
  jest.setTimeout(30000);
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
 
  //await mongoose.connect(mongoUri);
  await addUser(user);
},30000);
 
 
afterAll(async () => {
  jest.setTimeout(30000);
  await mongoose.connection.close();
  await mongoServer.stop();
});
 
 
describe('Auth Service', () => {
 
  // TEST TO LOGIN WITH A VALID USER
  it('Should perform a login operation /auth/login', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(user);
 
 
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
 
 
 
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