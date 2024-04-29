// src/components/Login.js
import React, { ReactEventHandler, useState } from 'react';
import {login} from '../../services/auth-service';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface props {
  postRegisterText: string;
}


const Login = (props:props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async () => {

    // Check if required fields are present in the request body
    if(username === "" || password === "") {
      setError("'Username and password are required'");
      return;
    }

    const response = await login(username, password);
    if (!response) {
      setError("Invalid Credentials");
    }
  }

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      loginUser();
    }
  };


  return (
    <Card className="">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="Username">Username</Label>
              <Input value={username}
          onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyPress} id="Username"  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input value={password}
          onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyPress} type="password" id="password" />
            </div>
            {error && (
            <Label className="text-danger">
              Error: {error}
            </Label>
          )}
          {props.postRegisterText && (
          <Label className="text-primary">{props.postRegisterText}</Label>
        )}
          </CardContent>
          <CardFooter>
            <Button id="LoginButton" onClick={() => loginUser()}>Log in</Button>
          </CardFooter>
        </Card>
  )
    


  
};

export default Login;
