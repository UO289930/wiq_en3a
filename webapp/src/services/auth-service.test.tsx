import axios from 'axios';
import {
  login,
  register,
  getAllUsers,
  getUser,
  updateStats,
  updateTrivialStats,
  isLogged,
  logout,
  getTokenInfo,
  getUsername,
  getUserEmail,
  getQuestionsAnswered,
  getCorrectlyAnsweredQuestions
} from './auth-service';

jest.mock('axios');

describe('AuthService functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('register function', async () => {
    // Configura el comportamiento simulado de axios.post
    const responseData = { data: 'invented' };
    axios.post = jest.fn().mockResolvedValueOnce(responseData);

    // Llama a la función que quieres probar
    const result = await register('invented@email.com', 'invented', '0000');

    // Verifica que axios.post haya sido llamado con la URL y los datos correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/adduser', { email:"invented@email.com",username: 'invented', password: '0000' });

    // Verifica que la función devuelva los datos simulados
    expect(result.message).toBe(responseData.data);
   });

   it('register with invalid credentials', async () => {
    // Configurar el comportamiento simulado de axios.post para que devuelva un error
    const errorMessage = 'Request failed';
    axios.post = jest.fn().mockResolvedValueOnce((new Error(errorMessage)));

    // Llamar a la función que quieres probar
    expect(await register('a', 'invalid', 'credentials')).toStrictEqual({'error': false, 'message': undefined}); //undefined bc it doesn't register
  });

    it('login with correct credentials', async () => {
        // Configura el comportamiento simulado de axios.post
        const responseData = { data: 'Mocked data response' };
        axios.post = jest.fn().mockResolvedValueOnce(responseData);

        // Llama a la función que quieres probar
        const result = await login('tomas', '0000');

        // Verifica que axios.post haya sido llamado con la URL y los datos correctos
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/login', { username: 'tomas', password: '0000' });

        // Verifica que la función devuelva los datos simulados
        expect(result).toBe(true);
    });

  it('login with invalid credentials', async () => {
    // Configurar el comportamiento simulado de axios.post para que devuelva un error
    const errorMessage = 'Request failed';
    axios.post = jest.fn().mockResolvedValueOnce((new Error(errorMessage)));

    // Llamar a la función que quieres probar
    expect(await login('invalid', 'credentials')).toBe(false);
  });

});
