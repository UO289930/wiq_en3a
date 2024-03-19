const axios = require('axios');

async function testLogin() {
  try {
    const response = await axios.post('http://localhost:8002/auth/login', {
      username: 'trogui',
      password: '0000'
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.log('Full Error:', error); // Imprime todo el objeto de error

  }
}

testLogin();
