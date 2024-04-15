const QueryGenerator = require('./src/Services/QueryGenerator.js');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { generateQuestions } = require('./src/Services/QuestionGenerator');

const app = express();
const port = process.env.PORT || 8001;
const NUMBER_QUESTIONS = 10;

// Middleware to parse JSON in request body
app.use(bodyParser.json());
app.use(cors());
// Middleware to handle errors
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
});

async function init(){
    console.log("Loading data from Wikidata, please wait...");

    let historyData = QueryGenerator.getQuestionsAndQuery("History");
    let sportData = QueryGenerator.getQuestionsAndQuery("Sport");
    let geographyData = QueryGenerator.getQuestionsAndQuery("Geography");
    let entertainmentData = QueryGenerator.getQuestionsAndQuery("Entertainment");
    let chemistryData = QueryGenerator.getQuestionsAndQuery("Chemistry");

    let [jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions,
            jsonHistoryQuestions, jsonSportsQuestions, jsonGeographyQuestion, jsonEntertainmentQuestion, jsonChemistryQuestion] = await Promise.all([
        getDataNormalGame(QueryGenerator.getCountryCapitalsQuery(200)),
        getDataNormalGame(QueryGenerator.getElementSymbolQuery(200)),
        getDataNormalGame(QueryGenerator.getMovieDirectorQuery(20)),
        getDataTrivial(historyData.questionText, historyData.query),
        getDataTrivial(sportData.questionText, sportData.query),
        getDataTrivial(geographyData.questionText, geographyData.query),
        getDataTrivial(entertainmentData.questionText, entertainmentData.query),
        getDataTrivial(chemistryData.questionText, chemistryData.query)
    ]);

    console.log("Data loaded");

    return [jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions,
        jsonHistoryQuestions, jsonSportsQuestions, jsonGeographyQuestion,jsonEntertainmentQuestion, jsonChemistryQuestion];
}

init().then(([jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions,
        jsonHistoryQuestions, jsonSportsQuestions, jsonGeographyQuestion, jsonEntertainmentQuestion, jsonChemistryQuestion]) => {
    
    // Route for getting questions about mixed topics
    app.get('/getQuestions', async (req, res, next) => {
        try {
    
            // Generate the questions
            const questions1 = generateQuestions("What is the capital of: ", jsonCountryQuestions.results.bindings);
            const questions2 = generateQuestions("What is the element of: ", jsonElementsQuestions.results.bindings);
            const questions3 = generateQuestions("What is the director of: ", jsonMovieQuestions.results.bindings);
    
            // Combine the questions
            const allQuestions = [...questions1, ...questions2, ...questions3];
    
            // Shuffle the questions
            let shuffled = allQuestions
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
            
             res.status(200).json(shuffled.slice(0,10));
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about history
    app.get('/getHistoryQuestions', async (req, res, next) => {
        try {
            // Generate the questions
            console.log(jsonHistoryQuestions.jsonResult.results.bindings);
            const questions = generateQuestions(jsonHistoryQuestions.questionText, jsonHistoryQuestions.jsonResult.results.bindings);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });
    
    // Route for getting questions about sports
    app.get('/getSportQuestions', async (req, res, next) => {
        try {
            // Generate the questions
            console.log(jsonHistoryQuestions.jsonResult.results.bindings);
            const questions = generateQuestions(jsonSportsQuestions.questionText, jsonSportsQuestions.jsonResult.results.bindings);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about geography
    app.get('/getGeographyQuestions', async (req, res, next) => {
        try {
            // Generate the questions
            const questions = generateQuestions(jsonGeographyQuestion.questionText, jsonGeographyQuestion.jsonResult.results.bindings);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about entertainment
    app.get('/getEntertainmentQuestions', async (req, res, next) => {
        try {
            // Generate the questions
            const questions = generateQuestions(jsonEntertainmentQuestion.questionText, jsonEntertainmentQuestion.jsonResult.results.bindings);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about chemistry
    app.get('/getChemistryQuestions', async (req, res, next) => {
        try {
            // Generate the questions
            const questions = generateQuestions(jsonChemistryQuestion.questionText, jsonChemistryQuestion.jsonResult.results.bindings);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });
    
    // Route for getting questions about capitals
    app.get('/getCapitalsQuestions', async (req, res, next) => {
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
    app.get('/getDirectorsQuestions', async (req, res, next) => {
        try {
            // Obtain questions in json format from wikidata
            const jsonQuestions = await getData(QueryGenerator.getMovieDirectorQuery());
    
            // Generate the questions
            const questions = generateQuestions("What is the director of the movie: ", jsonQuestions.results.bindings);
    
            // Envía las preguntas como respuesta HTTP
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });
    
    // Route for getting questions about the symbol of an element
    app.get('/getElementSymbolsQuestions', async (req, res, next) => {
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

    app.get('/*', (_req,res) =>{
        res.status(404).json({
            status:"not found",
            message:"Wrong URL: Please, check the correct enpoint URL"
    
        });
    } );
    
});

async function getDataNormalGame(sparqlQuery) {
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

async function getDataTrivial(questionText, sparqlQuery) {
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

        return {
             jsonResult : response.data,
             questionText : questionText
        };
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la solicitud HTTP
        console.error('Error:', error.message);
        throw new Error('Failed to fetch data from Wikidata');
    }
}

app.get('/health', (_req, res, next) => {
    res.json({ status: 'OK' });
});

// Start the server
const server = app.listen(port, () => {
    console.log(`Wikidata Service listening at http://localhost:${port}`);
});

module.exports = server


