

export type Question = {
  text: string,
  answers: string[],
  correctAnswer: number
}


let url = 'http://localhost:8000/';



export const getQuestionsFromApi = async (): Promise<Question[]> => {
    const response = await fetch(url + "GetQuestions");
    const data = await response.json();
    return data;
  };