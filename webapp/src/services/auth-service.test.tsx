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
    const errorMessage = 'Error: Username already exists';
    axios.post = jest.fn().mockRejectedValueOnce({ response: { data: { error: errorMessage } } });
  
    // Llamar a la función que quieres probar
    const result = await register('test@email.com', 'testuser', 'password123');
  
    // Verificar que axios.post haya sido llamado con la URL y los datos correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/adduser', { email: 'test@email.com', username: 'testuser', password: 'password123' });
  
    // Verificar que la función devuelva un objeto con error: true y el mensaje de error correspondiente
    expect(result).toEqual({ error: true, message: errorMessage });
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

  it('get all users with error', async () => {
    // Mock axios.get para simular una respuesta de error
    const errorMessage = 'Request failed';
    axios.get = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
  
    // Llama a la función que quieres probar
    try {
      await getAllUsers();
      // Si la función no lanza una excepción, la prueba falla
      fail('Expected an error to be thrown');
    } catch (error: any) {
      // Verifica que axios.get haya sido llamado con la URL correcta
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/getAllUsers', {});
  
      // Verifica que la función maneje correctamente el error
      expect(error.message).toBe(errorMessage);
    }
  });

  it('getUser() -> get user by username', async () => {
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

  it('should throw an error on failed request', async () => {
    // Spy on the console.error function
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Configure the mocked behavior of axios.post to return an error
    const errorMessage = 'Request failed';
    axios.post = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
  
    
    try {
      await getUser('nonexistentuser');
    } catch (error:any) {
      // Verify that the error is caught and printed to the console
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error during retrieving the users', error);
  
      // Verify that the exception is thrown
      expect(error.message).toBe(errorMessage);
    }
  
    // Restore the original implementation of console.error
    consoleErrorSpy.mockRestore();
  });
  
  
  it('update stats with incorrect data', async () => {
    // Mock axios.post para simular una respuesta de error
    axios.post = jest.fn().mockRejectedValueOnce(new Error('Request failed'));
  
    
    const result = await updateStats(10, 8);
  
    // Verifica que axios.post haya sido llamado con la URL correcta y los datos de usuario correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/sumNormalStats', { username: null, questions_answered: 10, correctly_answered_questions: 8 });
  
    // Verifica que la función devuelva false en caso de error
    expect(result).toBe(false);
  });
  
  
  it('isLogged() -> should return true if there is a token in local storage', () => {
    // Simula que hay un token en el almacenamiento local
    localStorage.setItem('token', 'mockedToken');

    
    const result = isLogged();

    // Verifica que la función devuelva true
    expect(result).toBe(true);

    // Limpia el almacenamiento local después de la prueba
    localStorage.removeItem('token');
  });

  it('isLogged() -> should return false if there is no token in local storage', () => {
    localStorage.removeItem('token');

    const result = isLogged();

    // Verifica que la función devuelva false
    expect(result).toBe(false);
  });
  

});
