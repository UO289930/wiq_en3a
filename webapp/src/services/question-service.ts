

export type Question = {
  text: string,
  answers: string[],
  correctAnswer: number,
  wikiLink: string
}


let url = 'http://localhost:8000/';



export const getQuestionsFromApi = async (): Promise<Question[]> => {
    const response = await fetch(url + "GetQuestions");
    const data = await response.json();
    
    return data;
  };

export const getEasyString = ():string => {
  return "easy";
}

export const getHardString = ():string => {
  return "hard";
}