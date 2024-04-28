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


  it('get all users', async () => {
    // Configura el comportamiento simulado de axios.get
    const responseData = { data: ['user1', 'user2', 'user3'] };
    axios.get = jest.fn().mockResolvedValueOnce(responseData);
  
    // Llama a la función que quieres probar
    const result = await getAllUsers();
  
    // Verifica que axios.get haya sido llamado con la URL correcta
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/getAllUsers', {});
  
    // Verifica que la función devuelva los datos simulados
    expect(result).toEqual(responseData.data);
  });

  it('get user by username', async () => {
    // Definir un nombre de usuario para buscar
    const username = 'testuser';
  
    // Configura el comportamiento simulado de axios.post
    const responseData = { data: { username: 'testuser', email: 'test@example.com' } };
    axios.post = jest.fn().mockResolvedValueOnce(responseData);
  
    // Llama a la función que quieres probar
    const result = await getUser(username);
  
    // Verifica que axios.post haya sido llamado con la URL correcta y los datos de usuario correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/getUser', { username });
  
    // Verifica que la función devuelva los datos simulados
    expect(result).toEqual(responseData.data);
  });
  
  
  it('update stats with incorrect data', async () => {
    // Mock axios.post para simular una respuesta de error
    axios.post = jest.fn().mockRejectedValueOnce(new Error('Request failed'));
  
    // Llama a la función que quieres probar
    const result = await updateStats(10, 8);
  
    // Verifica que axios.post haya sido llamado con la URL correcta y los datos de usuario correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/sumNormalStats', { username: null, questions_answered: 10, correctly_answered_questions: 8 });
  
    // Verifica que la función devuelva false en caso de error
    expect(result).toBe(false);
  });
  
  
  it('isLogged() -> should return true if there is a token in local storage', () => {
    // Simula que hay un token en el almacenamiento local
    localStorage.setItem('token', 'mockedToken');

    // Llama a la función que quieres probar
    const result = isLogged();

    // Verifica que la función devuelva true
    expect(result).toBe(true);

    // Limpia el almacenamiento local después de la prueba
    localStorage.removeItem('token');
  });

  it('isLogged() -> should return false if there is no token in local storage', () => {
    // Asegúrate de que no haya ningún token en el almacenamiento local
    localStorage.removeItem('token');

    // Llama a la función que quieres probar
    const result = isLogged();

    // Verifica que la función devuelva false
    expect(result).toBe(false);
  });
  
  

});
