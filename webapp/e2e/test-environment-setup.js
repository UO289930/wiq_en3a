const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoserver;
let users;
let wikidataservice;
let gatewayservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();
    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    gatewayservice = await require("../../gatewayservice/gateway-service");
    wikidataservice = await require("../../wikidataservice/index");
    users = await require("../../users/index");
  }

  startServer();
