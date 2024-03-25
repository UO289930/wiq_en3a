const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoserver;
let userservice;
let authservice;
let wikidataservice;
let gatewayservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();
    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    gatewayservice = await require("../../gatewayservice/gateway-service");
    wikidataservice = await require("../../api/wikidataservice/wikidata-service");
    authservice = await require("../../api/authservice/auth-service");
    userservice = await require("../../api/userservice/user-service");
  }

  startServer();
