const axios = require('axios');

async function testAddUser() {
  try {
    const response = await axios.post('http://localhost:8001/addUser', {
      username: 'trogui',
      password: '0000', 
      email: 'trogui@gmail.com'
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.log('Full Error:', error); // Imprime todo el objeto de error

  }
}

testAddUser();
