const QueryGenerator = require('./src/Services/QueryGenerator.js');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')
const { generateQuestions } = require('./src/Services/QuestionGenerator');

const app = express();
const port = 8001;

const NUMBER_QUESTIONS = 10;

// Middleware to parse JSON in request body
app.use(bodyParser.json());
app.use(cors())
app.use(router);
// Middleware to handle errors
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
});

// Default endpoint
router.get('/health', (_req, res, next) => {
    res.json({ status: 'OK' });
});

// Route for getting questions about mixed topics
router.get('/getQuestions', async (req, res, next) => {
    try {
        let start = Date.now();
        // Obtain data in asyncronous json format from wikidata
        const dataCalls = async () => {
            const jsonCountryQuestions = getData(QueryGenerator.getCountryCapitalsQuery(NUMBER_QUESTIONS));
            const jsonElementsQuestions = getData(QueryGenerator.getElementSymbolQuery(NUMBER_QUESTIONS));
            const jsonMovieQuestions = getData(QueryGenerator.getMovieDirectorQuery(NUMBER_QUESTIONS));

            const results = await Promise.all([jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions]);
            return results;
        };

        const [jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions] = await dataCalls();
        let end = Date.now();
        console.log("Getting data from wikidata", end - start, "ms");

        // Generate the questions
        const questions1 = generateQuestions("What is the capital of: ", jsonCountryQuestions.results.bindings, NUMBER_QUESTIONS);
        const questions2 = generateQuestions("What is the element of: ", jsonElementsQuestions.results.bindings, NUMBER_QUESTIONS);
        const questions3 = generateQuestions("What is the director of: ", jsonMovieQuestions.results.bindings, NUMBER_QUESTIONS);

        // Combine the questions
        const allQuestions = [...questions1, ...questions2, ...questions3];

        // Shuffle the questions
        let shuffled = allQuestions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        
         res.status(200).json(shuffled);
    } catch (error) {
        next(error);
    }
});

// Route for getting questions about capitals
router.get('/getCapitalsQuestions', async (req, res, next) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getData(QueryGenerator.getCountryCapitalsQuery(NUMBER_QUESTIONS));

        // Generate the questions
        const questions = generateQuestions("What is the capital of: ", jsonQuestions.results.bindings, NUMBER_QUESTIONS);

        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

// Route for getting questions about the director of a movie
router.get('/getDirectorsQuestions', async (req, res, next) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getData(QueryGenerator.getMovieDirectorQuery());

        // Generate the questions
        const questions = generateQuestions("What is the director of the movie: ", jsonQuestions.results.bindings);

        // // Envía las preguntas como respuesta HTTP
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

// Route for getting questions about the symbol of an element
router.get('/getElementSymbolsQuestions', async (req, res, next) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getData(QueryGenerator.getElementSymbolQuery());

        // Generate the questions
        const questions = generateQuestions("What is the symbol of the element: ", jsonQuestions.results.bindings);

        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

async function getData(sparqlQuery) {
    try {
        const endpointUrl = "https://query.wikidata.org/sparql?query=";
        const fullUrl = endpointUrl + encodeURIComponent(sparqlQuery);

        // Realiza la solicitud HTTP utilizando axios
        const response = await axios.get(fullUrl, {
            headers: {
                'User-Agent': 'Sergiollende/1.0',
                'Accept': 'application/sparql-results+json'
            }
        });

        // Extrae los datos JSON de la respuesta
        const jsonResult = response.data;

        return jsonResult;
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la solicitud HTTP
        console.error('Error:', error.message);
        throw new Error('Failed to fetch data from Wikidata');
    }
}

// Start the server
const server = app.listen(port, () => {
    console.log(`Wikidata Service listening at http://localhost:${port}`);
});

module.exports = server