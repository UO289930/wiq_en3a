import axios from 'axios';

export type Question = {
  text: string,
  answers: string[],
  correctAnswer: number,
  wikiLink: string
}


let url = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

export const getQuestionsFromApi = async (): Promise<Question[]> => {
    const response = await axios.get(url + "/GetQuestions");
    return response.data;
};

export const getEasyString = ():string => {
  return "easy";
}

export const getHardString = ():string => {
  return "hard";
}