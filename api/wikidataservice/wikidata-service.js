const express = require('express');
const router = express.Router();
const axios = require('axios');
 
// Route for user login
router.get('/getCapitalsQuestions', async (req, res) => {
    try {
        // Obtiene las preguntas de la fuente de datos
        const jsonQuestions = await getQuestions(getCapitalsQuery());

        // Genera las preguntas sobre las capitales
        const questions = generateQuestionsCapitalsOf(jsonQuestions.results.bindings);

        // Envía las preguntas como respuesta HTTP
        res.status(200).json(questions);
    } catch (error) {
        // Maneja cualquier error y envía una respuesta de error HTTP
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

function generateQuestionsCapitalsOf(capitalCountries, numberQuestions = 10) {
    const questions = [];

    const ids = new Set();

    // Genera un conjunto de índices únicos aleatorios
    while (ids.size < numberQuestions) {
        ids.add(Math.floor(Math.random()*capitalCountries.length+1));
    }

    const idsList = Array.from(ids);

    // Genera las preguntas
    for (let j = 0; j < idsList.length; j++) {
        const countryName = capitalCountries[idsList[j]].countryLabel.value;
        const questionText = `What is the capital of ${countryName}?`;
        const answers = [];

        // Índice de la respuesta correcta
        let correctAnswer = 0;

        // Agrega la capital correcta en el primer lugar
        answers[correctAnswer] = capitalCountries[idsList[j]].capitalLabel.value;

        // Obtiene 3 respuestas incorrectas aleatorias de todas las capitales
        const wrongIds = new Set();
        for (let w = 1; w < 4; w++) {
            let wrongId = Math.floor(Math.random()*capitalCountries.length+1);
            while (idsList[j] === wrongId || wrongIds.has(wrongId)) {
                wrongId = Math.floor(Math.random()*capitalCountries.length+1);
            }
            // Agrega el id de la respuesta incorrecta al conjunto
            wrongIds.add(wrongId);
            answers[w] = capitalCountries[wrongId].capitalLabel.value;
        }

        questions[j] = {
            text:questionText, 
            answers, 
            correctAnswer  
        };
    }

    return questions;
}

function getCapitalsQuery() {
    return `
        SELECT ?capitalLabel ?countryLabel WHERE {
            ?capital wdt:P1376 ?country.
            ?capital wdt:P31 wd:Q5119.
            ?country wdt:P31 wd:Q3624078.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        }
        LIMIT 400
    `;
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
