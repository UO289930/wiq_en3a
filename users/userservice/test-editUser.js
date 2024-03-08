const axios = require('axios');

async function testEditUser() {
  try {
    const response = await axios.post('http://localhost:8002/user/editUser', {
      username: 'rita',
      questions_answered: 5, 
      correctly_answered_questions: 3
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.log('Full Error:', error); // Imprime todo el objeto de error
  }
}

testEditUser();