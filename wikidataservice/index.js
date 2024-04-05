const QueryGenerator = require('./src/Services/QueryGenerator.js');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 8001;

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
        // Obtain questions in json format from wikidata
        const jsonCountryQuestions = await getQuestions(QueryGenerator.getCountryCapitalsQuery());
        const jsonElemntsQuestions = await getQuestions(QueryGenerator.getElementSymbolQuery());
        const jsonMovieQuestions = await getQuestions(QueryGenerator.getMovieDirectorQuery());

        // Generate the questions
        const questions1 = generateQuestions("What is the capital of: ", jsonCountryQuestions.results.bindings);
        const questions2 = generateQuestions("What is the element of: ", jsonElemntsQuestions.results.bindings);
        const questions3 = generateQuestions("What is the director of: ", jsonMovieQuestions.results.bindings);

         // Combine the questions
         const allQuestions = [...questions1, ...questions2, ...questions3];

         // Shuffle the questions
         // const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
 
         res.status(200).json(allQuestions);
    } catch (error) {
        next(error);
    }
});

// Route for getting questions about capitals
router.get('/getCapitalsQuestions', async (req, res, next) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getQuestions(QueryGenerator.getCountryCapitalsQuery());

        // Generate the questions
        const questions = generateQuestions("What is the capital of: ", jsonQuestions.results.bindings);

        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});

// Route for getting questions about the director of a movie
router.get('/getDirectorsQuestions', async (req, res, next) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getQuestions(QueryGenerator.getMovieDirectorQuery());

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
        const jsonQuestions = await getQuestions(QueryGenerator.getElementSymbolQuery());

        // Generate the questions
        const questions = generateQuestions("What is the symbol of the element: ", jsonQuestions.results.bindings);

        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
});


function generateQuestions(questionMessage, dataSet, numberQuestions = 10){
    const questions = [];

    const ids = new Set();

    // Generate a set of unique random indices
    while (ids.size < numberQuestions) {
        ids.add(Math.floor(Math.random()*dataSet.length));
    }

    const idsList = Array.from(ids);

    // Generate the questions
    for (let j = 0; j < idsList.length; j++) {
        const name = dataSet[idsList[j]].themeLabel.value;
        const questionText = questionMessage + name;
        const answers = [];

        // Index of the correct answer
        let correctAnswer = 0;

        // Add the correct answer in the first place
        answers[correctAnswer] = dataSet[idsList[j]].attributeLabel.value;

        // Get 3 random incorrect answers from all 
        const wrongIds = new Set();
        for (let w = 1; w < 4; w++) {
            let wrongId = Math.floor(Math.random()*dataSet.length);
            while (idsList[j] === wrongId || wrongIds.has(wrongId)) {
                wrongId = Math.floor(Math.random()*dataSet.length);
            }
            // Add the id of the incorrect answer to the set
            wrongIds.add(wrongId);
            answers[w] = dataSet[wrongId].attributeLabel.value;
        }

        // Shuffle the answers
        const shuffled = shuffleAnswers(answers, correctAnswer);

        questions[j] = {
            text:questionText, 
            answers: shuffled.answers, 
            correctAnswer: shuffled.correctAnswer
        };
    }
    return questions;
}

function shuffleAnswers(answers, correctAnswer)
{
    let newIndex = Math.floor(Math.random()*answers.length);

    // Swap correct answer with the answer at the new index
    let temp = answers[newIndex];
    answers[newIndex] = answers[correctAnswer];
    answers[correctAnswer] = temp;

    // Update correctAnswer to point to the new index
    correctAnswer = newIndex;

    return {answers, correctAnswer};
}

async function getQuestions(sparqlQuery) {
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