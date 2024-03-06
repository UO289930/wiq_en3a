// src/components/Login.js
import React, { useState } from 'react';
import {login} from '../../services/auth-service';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const loginUser = async () => {
    const response = await login(username, password);
    if (!response) {
      setError("No funca el login");
    }
    
  }


  return (
    <div className="container mx-auto mt-16 p-4 bg-white rounded shadow-lg">

      <div>
        <h1 className="text-3xl font-bold text-blue-500 mb-4">
          Login
        </h1>
        <label htmlFor="username" className="block mb-2">Username</label>
        <input
          id="username" // Added id attribute
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="block mb-2">Password</label>
        <input
          id="password" // Added id attribute
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="password"
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
        {error && (
          <div className="bg-red-500 text-white py-2 px-4 rounded-md mt-4">
            Error: {error}
          </div>
        )}
      </div>
    
  </div>
  
  );
};

export default Login;