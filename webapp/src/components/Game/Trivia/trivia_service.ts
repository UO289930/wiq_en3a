import { Question } from "@/src/services/question-service";
import axios from 'axios';

let url = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';



const getString = (string : string) : string => {
    return "/Get" + string + "Questions";
}

export const getSportQuestions = async (): Promise<Question> => {
    const response = await axios.get(url + getString("Sport"));
    return response.data[0];
  };

export const getScienceQuestions = async (): Promise<Question> => {
    const response = await axios.get(url + getString("Chemistry"));
    return response.data[0];
  };

export const getHistoryQuestions = async (): Promise<Question> => {
    const response = await axios.get(url + getString("History"));
    return response.data[0];
  };

export const getGeographyQuestions = async (): Promise<Question> => {
    const response = await axios.get(url + getString("Geography"));
    return response.data[0];
  };

  export const getEntertainmentQuestions = async (): Promise<Question> => {
    const response = await axios.get(url + getString("Entertainment"));
    return response.data[0];
  }
    



