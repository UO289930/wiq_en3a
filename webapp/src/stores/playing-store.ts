
import axios from 'axios';
import {create} from 'zustand';
import { getCorrectlyAnsweredQuestions, getQuestionsAnswered } from '../services/auth-service';

interface PlayingState {
    playing: boolean,
    isGameOver: boolean,
    startPlaying: () => void,
    stopPlaying: () => void,
    gameOver: () => void
  }
  

export const usePlayingState = create<PlayingState>((set) => ({
    playing: false,
    isGameOver: false,
    startPlaying: () => {set({playing: true}); set({isGameOver: false})},
    stopPlaying: () => {set({playing: false}); set({isGameOver: false})},
    gameOver: () => set({isGameOver: true})
  }));

interface ShowCancellingDialog {
    show: boolean,
    setShow: (show: boolean) => void,
    functionToExecute: () => void,
    setFunctionToExecute: (func: () => void) => void,
}

export const useShowCancellingDialog = create<ShowCancellingDialog>((set) => ({
    show: false,
    setShow: (show: boolean) => set({show: show}),
    functionToExecute: () => {},
    setFunctionToExecute: (func: () => void) => set({functionToExecute: func}),
  }));

export const handleShowDialog = ( func: () => void) =>  {
    if(usePlayingState.getState().playing && !usePlayingState.getState().isGameOver){
      useShowCancellingDialog.getState().setShow(true);
      useShowCancellingDialog.getState().setFunctionToExecute(func);
    } else {
      func();
    }
}

export type Question = {
    text: string,
    answers: string[],
    correctAnswer: number,
    wikiLink:string
}

interface GameQuestions{
    questions: Question[],
    setQuestions: (questions: any[]) => void,
    questionCount: number,
    nextQuestion: () => void,
    startGame: () => void
}

const API_URL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

export const retrieveQuestions = async () => {
  try {
    let response = await axios.get(`${API_URL}/GetQuestions`);
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the questions:', error);
    return [];
  }
};

// const retrieveQuestionss = () => {
//   console.log(`${API_URL}`);
//   return fetch(`${API_URL}/WikiData/GetCapitalsQuestions`)
//     .then((response) => response.json())
//     .catch((error) => {
//       console.error('There was a problem with the questions:', error);
//       return []; // Return an empty array in case of an error
//     });
// };

export const useGameQuestions = create<GameQuestions>((set) => ({
  questions: [],
  setQuestions: (questions: any[]) => set({ questions: questions }),
  questionCount: 0,
  nextQuestion: () => set((state) => ({ questionCount: state.questionCount + 1 })),
  startGame: async () => {
    set({ questionCount: 0 });
    const questions = await retrieveQuestions();
    set({ questions });
  },
}));

type Stats = {
    questionsAnswered: number,
    correctlyAnsweredQuestions: number,
    setQuestionsAnswered: (questionsAnswered: number) => void,
    setCorrectlyAnsweredQuestions: (correctlyAnsweredQuestions: number) => void,
    sumQuestionsAnswered: (sumTotal: number) => void,
    sumCorrectlyAnsweredQuestions: (sumCorrect: number) => void
}

export const useStats = create<Stats>((set) => ({
  questionsAnswered: 0,
  correctlyAnsweredQuestions: 0,
  setQuestionsAnswered: (questionsAnswered: number) => set({ questionsAnswered }),
  setCorrectlyAnsweredQuestions: (correctlyAnsweredQuestions: number) => set({ correctlyAnsweredQuestions }),
  sumQuestionsAnswered: (sumTotal: number) => set({ questionsAnswered: getQuestionsAnswered() + sumTotal }),
  sumCorrectlyAnsweredQuestions: (sumCorrect: number) => set({ correctlyAnsweredQuestions: getCorrectlyAnsweredQuestions() + sumCorrect }),
}));



export const getQuestion= (questions:Question[], questionCount:number) => questions[questionCount].text;
export const getAnswersList= (questions:Question[], questionCount:number) => questions[questionCount].answers;
export const getCorrectAnswer= (questions:Question[], questionCount:number) => questions[questionCount].correctAnswer;



