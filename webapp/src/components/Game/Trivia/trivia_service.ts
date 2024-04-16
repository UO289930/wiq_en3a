import { Question } from "@/src/services/question-service";



let url = 'http://localhost:8000/';

const getString = (string : string) : string => {
    return "Get" + string + "Questions";
}

export const getSportQuestions = async (): Promise<Question> => {
    const response = await fetch(url + getString("Sport"));
    const data = await response.json();
    console.log(data);
    return data[0];
  };

export const getScienceQuestions = async (): Promise<Question> => {
    const response = await fetch(url + getString("Chemistry"));
    const data = await response.json();
    return data[0];
  };

export const getHistoryQuestions = async (): Promise<Question> => {
    const response = await fetch(url + getString("History"));
    const data = await response.json();
    return data[0];
  };

export const getGeographyQuestions = async (): Promise<Question> => {
    const response = await fetch(url + getString("Geography"));
    const data = await response.json();
    return data[0];
  };

  export const getEntertainmentQuestions = async (): Promise<Question> => {
    const response = await fetch(url + getString("Entertainment"));
    const data = await response.json();
    return data[0];
  }
    



