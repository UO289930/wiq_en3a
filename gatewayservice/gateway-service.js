const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

//libraries required for OpenAPI-Swagger
const swaggerUi = require('swagger-ui-express'); 
const fs = require("fs");
const https = require('https');
const YAML = require('yaml');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const app = express();
const port = 8000;

const userServiceUrl = process.env.USERS_SERVICE_URL || 'http://localhost:8003';
const wikidataServiceUrl = process.env.WIKIDATA_SERVICE_URL || 'http://localhost:8001';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    // Forward the login request to the authentication service
    const authResponse = await axios.post(userServiceUrl + '/auth/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    console.error(error);
    res.status(401).json({error:error});
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl + '/user/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
    res.status(401).json({error:error.response.data.error});
  }
});

app.post('/sumNormalStats', async (req, res) => {
  try {
    // Forward the edit user with normal stats request to the user service
    const userResponse = await axios.post(userServiceUrl + '/user/sumNormalStats', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.post('/sumTrivialStats', async (req, res) => {
  try {
    // Forward the edit user with trivial stats request to the user service
    const userResponse = await axios.post(userServiceUrl + '/user/sumTrivialStats', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
  }
});


app.get('/getAllUsers', async (req, res) => {
  try {
    // Forward the get all users request to the user service
    const usersResponse = await axios.get(userServiceUrl + '/user/getAllUsers');
    res.json(usersResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.post('/getUser', async (req, res) => {
  try {
    const usersResponse = await axios.get(userServiceUrl + '/user/getUser', {params:req.body});
    
    res.json(usersResponse.data);
  } catch (error) {
    console.error(error);
  }
});


app.get('/GetQuestions', async (_req, res) => {
  try {
    const wikiResponse = await axios.get(wikidataServiceUrl + '/getQuestions', { timeout: 10000 });
    if (wikiResponse.status !== 200) {
      let statusCode = wikiResponse.status ? wikiResponse.status : 500;

      console.error('Error with the wikidata service:', statusCode);
      res.status(statusCode).json({ error: 'Error with the wikidata service' });

    } else {
      res.json(wikiResponse.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

app.get('/GetCapitalsQuestions', async (_req, res) => {
  getQuestions('/getCapitalsQuestions', res);
});

app.get('/GetElementSymbolsQuestions', async (_req, res) => {
  getQuestions('/getElementSymbolsQuestions', res);
});

app.get('/GetMovieDirectorsQuestions', async (_req, res) => {
  getQuestions('/getMovieDirectorsQuestions', res);
});

app.get('/GetHistoryQuestions', async (_req, res) => {
  getQuestions('/getHistoryQuestions', res);
});

app.get('/GetSportQuestions', async (_req, res) => {
  getQuestions('/getSportQuestions', res);
});

app.get('/GetGeographyQuestions', async (_req, res) => {
  getQuestions('/getGeographyQuestions', res);
});

app.get('/GetEntertainmentQuestions', async (_req, res) => {
  getQuestions('/getEntertainmentQuestions', res);
});

app.get('/GetChemistryQuestions', async (_req, res) => {
  getQuestions('/getChemistryQuestions', res);
});


async function getQuestions(specificPath, res){
  try {
    const wikiResponse = await axios.get(wikidataServiceUrl + specificPath, { timeout: 10000 });
    if (wikiResponse.status !== 200) {
      let statusCode = wikiResponse.status ? wikiResponse.status : 500;

      console.error('Error with the wikidata service:', statusCode);
      res.status(statusCode).json({ error: 'Error with the wikidata service' });

    } else {
      res.json(wikiResponse.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

// Read the OpenAPI YAML file synchronously
openapiPath='./openapi.yaml'
if (fs.existsSync(openapiPath)) {
  const file = fs.readFileSync(openapiPath, 'utf8');

  // Parse the YAML content into a JavaScript object representing the Swagger document
  const swaggerDocument = YAML.parse(file);

  // Serve the Swagger UI documentation at the '/api-doc' endpoint
  // This middleware serves the Swagger UI files and sets up the Swagger UI page
  // It takes the parsed Swagger document as input
  app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Not configuring OpenAPI. Configuration file not present.")
}

app.get('/*', (_req,res) =>{
  res.status(404).json({
    status:"not found",
    message:"Wrong URL: Please, check the correct enpoint URL"
  });
});

// Start the gateway service
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Gateway server running on port 443');
});

module.exports = server
