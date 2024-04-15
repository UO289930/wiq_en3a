import { Question } from "@/src/stores/playing-store";


let url = 'http://localhost:8001/';

const getString = (string : string) : string => {
    return "get" + string + "Questions";
}

const jsonToQuestion = (json : any) : Question => {
    return {
        text: json.text,
        answers: json.answers,
        correctAnswer: json.correctAnswer
    }
}


export const getSportQuestions = async () => {
    const response = await fetch(url + getString("Sport"));
    return await jsonToQuestion(await response.json())
}

export const getScienceQuestions = async () => {
    const response = await fetch(url + getString("Chemistry"));
    return await response.json();
}

export const getHistoryQuestions = async () => {
    const response = await fetch(url + getString("History"));
    return await response.json();
}

export const getGeographyQuestions = async () => {
    const response = await fetch(url + getString("Geography"));
    return await response.json();
}

export const getEntertainmentQuestions = async () => {
    const response = await fetch(url + getString("Entertainment"));
    return await response.json();
}


