const express = require('express');
const router = express.Router();
const axios = require('axios');
 
// Route for getting questions about capitals
router.get('/getCapitalsQuestions', async (req, res) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getQuestions(getCountryCapitalsQuery());

        // Generate the questions
        const questions = generateQuestions("What is the capital of:", jsonQuestions.results.bindings);

        res.status(200).json(questions);
    } catch (error) {
        // Maneja cualquier error y envía una respuesta de error HTTP
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for getting questions about the director of a movie
router.get('/getDirectorsQuestions', async (req, res) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getQuestions(getMovieDirectorQuery());

        // Generate the questions
        const questions = generateQuestions("What is the director of the movie:", jsonQuestions.results.bindings);

        // // Envía las preguntas como respuesta HTTP
        res.status(200).json(questions);
    } catch (error) {
        // Maneja cualquier error y envía una respuesta de error HTTP
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route for getting questions about the symbol of an element
router.get('/getElementSymbolsQuestions', async (req, res) => {
    try {
        // Obtain questions in json format from wikidata
        const jsonQuestions = await getQuestions(getElementSymbolQuery());

        // Generate the questions
        const questions = generateQuestions("What is the symbol of the element:", jsonQuestions.results.bindings);

        res.status(200).json(questions);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

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

// function getCapitalsQuery() {
//     return `
//         SELECT ?capitalLabel ?countryLabel WHERE {
//             ?capital wdt:P1376 ?country.
//             ?capital wdt:P31 wd:Q5119.
//             ?country wdt:P31 wd:Q3624078.
//             SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
//         }
//         LIMIT 400
//     `;
// }

// Define la función para obtener la consulta del director de la película
function getCountryCapitalsQuery() {
    return generateSparqlQuery("Q6256", "P36");
}

// Define la función para obtener la consulta del director de la película
function getMovieDirectorQuery() {
    return generateSparqlQuery("Q11424", "P57");
}

// Define la función para obtener la consulta del símbolo del elemento
function getElementSymbolQuery() {
    return generateSparqlQuery("Q11344", "P246");
}

// Define la función para generar la consulta SPARQL
function generateSparqlQuery(themeId, attributeId, limit = 10) {
    return `
        SELECT ?themeLabel ?attributeLabel WHERE {
            ?theme wdt:P31 wd:${themeId};
                wdt:${attributeId} ?attribute.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT ${limit}
    `;
}

module.exports = router
