const request = require('supertest');
const app = require('../index.js');


describe("Question Service - Health", () => {

    it("should return 200 if / is accessed", async () => {

        const response = await request(app).get('/health');
        expect(response.status).toBe(200)
    })

});



describe('Wikidata Service - Question Retrieval', () => {

    async function sleep(ms) {
      await new Promise(resolve => setTimeout(resolve, ms));
    }

    async function checkCorrectQuestionsResponse(endpoint, retrieved){
      await sleep(10000);
      const response = await request(app).get(endpoint);
      expect(response.status).toBe(200);
      expect(response._body.length).toBe(retrieved);
      expect(response._body[0]).toHaveProperty("text");
      expect(response._body[0]).toHaveProperty("correctAnswer");
      expect(response._body[0]).toHaveProperty("answers");
    }

    it('should retrieve 10 capitals questions with their corresponding answers', async () => {
      await checkCorrectQuestionsResponse('/getCapitalsQuestions', 10);
    }, 15000);

    it('should retrieve 30 questions with their corresponding answers', async () => {
      
      checkCorrectQuestionsResponse('/getQuestions', 30);
    }, 30000);

    it('should retrieve 10 element type symbols questions with their corresponding answers', async () => {
    
      checkCorrectQuestionsResponse('/getElementSymbolsQuestions', 10);
    }, 15000);

    it('should retrieve 10 movie directors questions with their corresponding answers', async () => {
    
      checkCorrectQuestionsResponse('/getDirectorsQuestions', 10);
    }, 15000);

    it('should respond with an error message', async () => {
    
      const response = await request(app).get('/text');
      expect(response.status).toBe(404);
      expect(response._body.status).toBe('not found');
      expect(response._body.message).toBe('Wrong URL: Please, check the correct enpoint URL');
    }, 15000);
    
    
});

 

