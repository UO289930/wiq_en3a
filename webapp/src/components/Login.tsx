// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      setLoginSuccess(true);

      setOpenSnackbar(true);
    } catch (error : any) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container mx-auto mt-16 p-4 bg-white rounded shadow-lg">
      {loginSuccess ? (
        <div>
          <h1 className="text-3xl font-bold text-center text-blue-500">
            Hello {username}!
          </h1>
          <p className="text-center text-lg mt-2 text-gray-700">
            Your account was created on {new Date(createdAt).toLocaleDateString()}.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-blue-500 mb-4">
            Login
          </h1>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 w-full transition-colors duration-200"
            onClick={loginUser}
          >
            Login
          </button>
          {openSnackbar && (
            <div className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
              Login successful
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white py-2 px-4 rounded-md mt-4">
              Error: {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;