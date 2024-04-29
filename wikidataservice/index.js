const QueryGenerator = require('./src/Services/QueryGenerator.js');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { generateQuestions } = require('./src/Services/QuestionGenerator');

const app = express();
const port = 8001;
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
    let start = Date.now();
    console.log("Loading data from Wikidata, please wait...");

    // Data groups to be fetched from Wikidata
    let dataGroups = [
        { name: 'history', data: QueryGenerator.getQuestionsAndQuery("History") },
        { name: 'sports', data: QueryGenerator.getQuestionsAndQuery("Sport") },
        { name: 'geography', data: QueryGenerator.getQuestionsAndQuery("Geography") },
        { name: 'entertainment', data: QueryGenerator.getQuestionsAndQuery("Entertainment") },
        { name: 'chemistry', data: QueryGenerator.getQuestionsAndQuery("Chemistry")  },
        { name: 'country', data: QueryGenerator.getCountryCapitalsQuery(200), isNormalGame: true },
        { name: 'elements', data: QueryGenerator.getElementSymbolQuery(200), isNormalGame: true },
        { name: 'movies', data: QueryGenerator.getMovieDirectorQuery(200), isNormalGame: true }
    ];
    
    // If the group is a normal game, the data is fetched in a normal mode,
    // otherwise, the data is fetched in trivial mode
    let allPromises = dataGroups.map(group => 
        group.isNormalGame ? 
        getDataNormalGame(group.data) : 
        group.data.map(data => getDataTrivial(data.questionText, data.query))
    );
    
    // If the result is an array of promises, it is resolved with Promise.all
    // Otherwise, the promise is resolved directly
    let results = await Promise.all(allPromises.map(groupPromises => Array.isArray(groupPromises) ? 
            Promise.all(groupPromises) : 
            groupPromises));
    
    // Assign the results to the corresponding variables
    let [jsonHistoryQuestions, jsonSportsQuestions, jsonGeographyQuestion, jsonEntertainmentQuestion, jsonChemistryQuestion,
         jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions] = results;

    let end = Date.now();
    console.log("Data loaded: " + (end - start) + " ms");

    // Returning all the data
    return [jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions,
        jsonHistoryQuestions, jsonSportsQuestions, jsonGeographyQuestion,jsonEntertainmentQuestion, jsonChemistryQuestion];
}

init().then(([jsonCountryQuestions, jsonElementsQuestions, jsonMovieQuestions,
        jsonHistoryQuestions, jsonSportsQuestions, jsonGeographyQuestion, jsonEntertainmentQuestion, jsonChemistryQuestion]) => {
    
    // Route for getting questions about mixed topics
    app.get('/getQuestions', async (req, res, next) => {
        try {   
            // Generate the questions       
            let questions = []
            for(let i = 0; i < 2; i++){     
                questions.push(generateQuestions(jsonHistoryQuestions[i].questionText, jsonHistoryQuestions[i].jsonResult.results.bindings, 1)[0]);
                questions.push(generateQuestions(jsonSportsQuestions[i].questionText, jsonSportsQuestions[i].jsonResult.results.bindings, 1)[0]);
                questions.push(generateQuestions(jsonGeographyQuestion[i].questionText, jsonGeographyQuestion[i].jsonResult.results.bindings, 1)[0]);
                questions.push(generateQuestions(jsonEntertainmentQuestion[i].questionText, jsonEntertainmentQuestion[i].jsonResult.results.bindings, 1)[0]);
                questions.push(generateQuestions(jsonChemistryQuestion[i].questionText, jsonChemistryQuestion[i].jsonResult.results.bindings, 1)[0]);
            }
            
            console.log(questions)
            // Shuffle the questions
            let shuffled = questions
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
            const randomIndex = Math.floor(Math.random() * jsonHistoryQuestions.length);
            let itemData = jsonHistoryQuestions[randomIndex];
            const questions = generateQuestions(itemData.questionText, itemData.jsonResult.results.bindings, 1);
            console.log(questions)
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });
    
    // Route for getting questions about sports
    app.get('/getSportQuestions', async (req, res, next) => {
        try {
            // Generate the questions of a random topic from the list in the json
            const randomIndex = Math.floor(Math.random() * jsonSportsQuestions.length);
            let itemData = jsonSportsQuestions[randomIndex];
            const questions = generateQuestions(itemData.questionText, itemData.jsonResult.results.bindings, 1);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about geography
    app.get('/getGeographyQuestions', async (req, res, next) => {
        try {
            // Generate the questions of a random topic from the list in the json
            const randomIndex = Math.floor(Math.random() * jsonGeographyQuestion.length);
            let itemData = jsonGeographyQuestion[randomIndex];
            const questions = generateQuestions(itemData.questionText, itemData.jsonResult.results.bindings, 1);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about entertainment
    app.get('/getEntertainmentQuestions', async (req, res, next) => {
        try {
            // Generate the questions of a random topic from the list in the json
            const randomIndex = Math.floor(Math.random() * jsonEntertainmentQuestion.length);
            let itemData = jsonEntertainmentQuestion[randomIndex];
            const questions = generateQuestions(itemData.questionText, itemData.jsonResult.results.bindings, 1);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });

    // Route for getting questions about chemistry
    app.get('/getChemistryQuestions', async (req, res, next) => {
        try {
            // Generate the questions of a random topic from the list in the json
            const randomIndex = Math.floor(Math.random() * jsonChemistryQuestion.length);
            let itemData = jsonChemistryQuestion[randomIndex];
            const questions = generateQuestions(itemData.questionText, itemData.jsonResult.results.bindings, 1);
    
            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    });
    
    // Route for getting questions about capitals
    app.get('/getCapitalsQuestions', async (req, res, next) => {
        try {
            // Obtain questions in json format from wikidata
            const jsonQuestions = await getDataNormalGame(QueryGenerator.getCountryCapitalsQuery(NUMBER_QUESTIONS));
    
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
            const jsonQuestions = await getDataNormalGame(QueryGenerator.getMovieDirectorQuery());
    
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
            const jsonQuestions = await getDataNormalGame(QueryGenerator.getElementSymbolQuery());
    
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


