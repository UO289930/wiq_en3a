const request = require('supertest');
const app = require('../index.js');


describe("Question Service - Health", () => {

    it("should return 200 if / is accessed", async () => {

        const response = await request(app).get('/health');
        expect(response.status).toBe(200)
    })

})

describe('Wikidata Service - Question Retrieval', () => {
  
    it('should retrieve 10 capitals questions with their corresponding answers', async () => {
      
      const response = await request(app).get('/getCapitalsQuestions');
      console.log(response); // Imprime la respuesta
      expect(response.status).toBe(200)
    }, 10000);
});
