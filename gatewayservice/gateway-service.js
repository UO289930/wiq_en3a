const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const apiServiceUrl = process.env.API_SERVICE_URL || 'http://localhost:8002';

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
    const authResponse = await axios.post(apiServiceUrl + '/auth/login', req.body);
    res.json(authResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(apiServiceUrl + '/user/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.post('/edituser', async (req, res) => {
  try {
    // Forward the edit user request to the user service
    const userResponse = await axios.post(apiServiceUrl + '/user/edituser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    console.error(error);
  }
});

app.get('/GetCapitalsQuestions', async (_req, res) => {
  try {
    // Forward the edit user request to the user service
    console.log(process.env.apiServiceUrl);
    const wikiResponse = await axios.get(apiServiceUrl + '/wikidata/GetCapitalsQuestions', { timeout: 5000 });
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
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
