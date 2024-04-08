const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const userServiceUrl = process.env.USERS_SERVICE_URL || 'http://localhost:8002';
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
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl + '/user/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.post('/edituser', async (req, res) => {
  try {
    // Forward the edit user request to the user service
    const userResponse = await axios.post(userServiceUrl + '/user/edituser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.get('/GetQuestions', async (_req, res) => {
  getQuestions('/getQuestions');
});

app.get('/GetCapitalsQuestions', async (_req, res) => {
  getQuestions('/getCapitalsQuestions');
});

app.get('/GetElementSymbolsQuestions', async (_req, res) => {
  getQuestions('/getElementSymbolsQuestions');
});

app.get('/GetMovieDirectorsQuestions', async (_req, res) => {
  getQuestions('/getMovieDirectorsQuestions');
});

async function getQuestions(specificPath){
  try {
    const wikiResponse = await axios.get(wikidataServiceUrl + specificPath, { timeout: 10000 });
    if (wikiResponse.status !== 200) {
      console.error('Error with the wikidata service:', wikiResponse.status);
      res.status(wikiResponse.status).json({ error: 'Error with the wikidata service' });
    } else {
      res.json(wikiResponse.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error with the gateway service' });
  }
}

app.get('/*', (_req,res) =>{
  res.status(404).json({
    status:"not found",
    message:"Wrong URL: Please, check the correct enpoint URL"
  });
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
