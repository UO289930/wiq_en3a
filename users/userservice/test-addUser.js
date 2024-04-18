const axios = require('axios');

async function testAddUser() {
  try {
    const response = await axios.post('http://localhost:8003/user/adduser', {
      username: 'riiiita',
      password: '0000', 
      email: '@gmail.com'
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.log('Full Error:', error); // Imprime todo el objeto de error

  }
}

testAddUser();
