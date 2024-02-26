// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { username, password });
      setOpenSnackbar(true);
    } catch (error : any) {
      setError(error.response.data.error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container mx-auto mt-16">
  <h1 className="text-3xl font-bold mb-4">Add User</h1>
  <input
    name="username"
    className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    name="password"
    className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    className="bg-blue-500 text-white rounded-md px-4 py-2 w-full"
    onClick={addUser}
  >
    Add User
  </button>
  <div className="mt-4">
    {openSnackbar && (
      <div className="bg-green-500 text-white py-2 px-4 rounded-md mb-4">
        User added successfully
      </div>
    )}
    {error && (
      <div className="bg-red-500 text-white py-2 px-4 rounded-md">
        Error: {error}
      </div>
    )}
  </div>
</div>

  );
};

export default AddUser;
