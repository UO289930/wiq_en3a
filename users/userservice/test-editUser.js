const axios = require('axios');

async function testEditUser() {
  try {
    const response = await axios.post('http://localhost:8003/user/sumTrivialStats', {
      username: 'rita',
      cheeseCount: 2
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.log('Full Error:', error); // Imprime todo el objeto de error
  }
}

testEditUser();