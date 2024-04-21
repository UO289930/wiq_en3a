// src/components/AddUser.js
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {register} from '../../services/auth-service';

type props = {
  onRegistrationCompleted: (username:String) => void;
}


const AddUser = (props: props)  => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');


  const registerUser = async () => {

    // validate username
    if(username.trim().length < 4){
      setError('The username must be at least 4 characters long');
      return;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    // validate password
    if (password.trim().length < 8) {
      setError('The password must be at least 8 characters long');
    }
    if (!/\d/.test(password)) {
      setError('The password must contain at least one numeric character');
    }
    if (!/[A-Z]/.test(password)) {
      setError('The password must contain at least one uppercase letter');
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const response = await register(email,username, password);
    if (!response) {
      setError("Error while registering");
    }
    else {
      props.onRegistrationCompleted(response);
    }

    
  }






  return (
    <Card className="">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="Username">Username</Label>
              <Input value={username}
          onChange={(e) => setUsername(e.target.value)} id="Username"  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Email">Email</Label>
              <Input value={email}
          onChange={(e) => setEmail(e.target.value)} id="Email"  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input value={password}
          onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="confirmPassword" />
            </div>
            {error && (
            <Label className="text-danger">
              Error: {error}
            </Label>
          )}
          </CardContent>
          <CardFooter>
            <Button id="RegisterButton" onClick={() => registerUser()}>Create account</Button>
          </CardFooter>
        </Card>
  )


};

export default AddUser;
