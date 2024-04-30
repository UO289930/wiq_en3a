import axios from 'axios';
import { getQuestionsFromApi, getEasyString, getHardString } from './question-service';

// Mockear axios
jest.mock('axios');

describe('getQuestionsFromApi function', () => {
  it('fetches questions from API and returns data', async () => {
    // Datos de ejemplo que quieres que devuelva el mock de axios
    const mockedData = [
      {
        text: 'Example question',
        answers: ['Answer 1', 'Answer 2', 'Answer 3'],
        correctAnswer: 0,
        wikiLink: 'https://example.com'
      }
      // Puedes agregar más datos de ejemplo si lo deseas
    ];

    // Mockear la función axios.get para que devuelva los datos de ejemplo
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockedData });

    // Llamar a la función que quieres probar
    const questions = await getQuestionsFromApi();

    // Verificar que axios.get haya sido llamado con la URL correcta
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/GetQuestions');

    // Verificar que la función retorna los datos esperados
    expect(questions).toEqual(mockedData);
  });


});

describe('getEasyString function', () => {
    it('returns the string "easy"', () => {
      const result = getEasyString();
      expect(result).toBe('easy');
    });
  });
  
  describe('getHardString function', () => {
    it('returns the string "hard"', () => {
      const result = getHardString();
      expect(result).toBe('hard');
    });

});
