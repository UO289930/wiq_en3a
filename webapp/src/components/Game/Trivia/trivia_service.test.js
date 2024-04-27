const axios = require('axios');
import {expect, jest, test} from '@jest/globals';

import {
    getSportQuestions,
    getScienceQuestions,
    getHistoryQuestions,
    getGeographyQuestions,
    getEntertainmentQuestions
} from './trivia_service'; 

jest.mock('axios', () => {
    return {
        get: () => {return {data: [{
                "text": "What is the capital of France?",
                "answers": ["London", "Berlin", "Paris", "Madrid"],
                "correctAnswer": 2
          }] }}}}) 

describe('Test Question Functions', () => {
    
    test('getSportQuestions should return a question', async () => {
        const question = await getSportQuestions();
        expect(question.text).toBe("What is the capital of France?");
    });
    test('getSportQuestions should return a question', async () => {
        const question = await getScienceQuestions();
        expect(question.text).toBe("What is the capital of France?");
    });
    test('getSportQuestions should return a question', async () => {
        const question = await getHistoryQuestions();
        expect(question.text).toBe("What is the capital of France?");
    });
    test('getSportQuestions should return a question', async () => {
        const question = await getGeographyQuestions();
        expect(question.text).toBe("What is the capital of France?");
    });
    test('getSportQuestions should return a question', async () => {
        const question = await getEntertainmentQuestions();
        expect(question.text).toBe("What is the capital of France?");
    });
});