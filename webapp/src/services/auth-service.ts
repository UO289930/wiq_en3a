import axios from 'axios';
import { jwtDecode } from "jwt-decode"; 
import { useUserStore } from '../stores/user-store';

const API_URL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

export type JwtPayload = {
  username: string;
  userEmail: string;
  questions_answered: number;
  correctly_answered_questions: number;
};

export const loginWithToken = () => {
  const tokenInfo = getTokenInfo();
  if(tokenInfo) {
    useUserStore.getState().setUser(tokenInfo);
    // updateStatsState(0, 0);
  }
}

export const login = async (username: string, password: string)=> {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    //const response = await axios.post("http://localhost:8002/auth/login", { username, password });
    const token = response.data.token;
    localStorage.setItem('token', token); // store the token in local storage
    loginWithToken();
    return true;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

export const register = async (email:string, username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/adduser`, { username, password, email });
    const name = response.data;
    return {error:false,message:name};
  } catch (error: any) {
    console.log('Error during registration:', error);
    return {error:true,message:error.response.data.error};
  }
};
 


export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllUsers`, {});
    return response.data;
  } catch (error) {
    console.error('Error during retrieving all the users', error);
    throw error;
  }
};

export const getUser = async (username: string) => {
  try {
    const response = await axios.post(`${API_URL}/getUser`, {username});
    return response.data;
  } catch (error) {
    console.error('Error during retrieving the users', error);
    throw error;
  }
};
 

export const updateStats = async (questions_answered: number, correctly_answered_questions: number) => {
  const username = getUsername();
  try {
    await axios.post(`${API_URL}/sumNormalStats`, { username, questions_answered, correctly_answered_questions });
    //updateStatsState(questions_answered, correctly_answered_questions);
    return true;
  } catch (error) {
    console.error('Error during retrieving data:', error);
    return false;
  }
}

 export const updateTrivialStats = async (questions_answered: number,cheeseCount: number) => {
  const username = getUsername();
  try {
    await axios.post(`${API_URL}/sumTrivialStats`, { username, questions_answered, cheeseCount });
    return true;
  } catch (error) {
    console.error('Error during retrieving data:', error);
    return false;
  }
}

export const isLogged = () => {
  const token = localStorage.getItem('token');
  return !!token; 
};

export const logout = () => {
  localStorage.removeItem('token');
  useUserStore.getState().logout();
};

export const getTokenInfo = (): JwtPayload | null => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (typeof decodedToken === 'object' && decodedToken !== null) {
      return decodedToken as JwtPayload;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error during token decoding:', error);
    return null;
  }
};
  
  export const getUsername = () => {
    const tokenInfo = getTokenInfo();
    return tokenInfo ? tokenInfo.username : null;
  };
  
  export const getUserEmail = () => {
    const tokenInfo = getTokenInfo();
    return tokenInfo ? tokenInfo.userEmail : null;
  };
  
  export const getQuestionsAnswered = () => {
    const tokenInfo = getTokenInfo();
    return tokenInfo ? tokenInfo.questions_answered : 0;
  };
  
  export const getCorrectlyAnsweredQuestions = () => {
    const tokenInfo = getTokenInfo();
    return tokenInfo ? tokenInfo.correctly_answered_questions : 0;
  };

  /* export const updateStatsState = (questions_answered : number, correctly_answered_questions : number) => {
    useStats.getState().sumQuestionsAnswered(questions_answered);
    useStats.getState().sumCorrectlyAnsweredQuestions(correctly_answered_questions);
  }; */

