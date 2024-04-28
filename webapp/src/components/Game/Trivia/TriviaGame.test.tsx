import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TriviaGame, formatNumberWithDots,  isNumber, generateDiceRandomNumber, getQuestion} from './TriviaGame';
import { getEasyString, getHardString } from '../../../services/question-service';

// jest.mock('./trivia_service', () => ({
//     getSportQuestions: jest.fn().mockResolvedValue({
//       text: 'Sports question',
//       answers: ['answer1', 'answer2', 'answer3', 'answer4'],
//       correctAnswer: 0,
//       wikiLink: ''
//     }),
//     getScienceQuestions: jest.fn().mockResolvedValue({
//       question: 'Science question',
//       answers: ['answer1', 'answer2', 'answer3', 'answer4'],
//       correctAnswer: 0,
//       wikiLink: ''
//     }),
//     getHistoryQuestions: jest.fn().mockResolvedValue({
//       question: 'History question',
//       answers: ['answer1', 'answer2', 'answer3', 'answer4'],
//       correctAnswer: 0,
//       wikiLink: ''
//     }),
//     getGeographyQuestions: jest.fn().mockResolvedValue({
//       question: 'Geography question',
//       answers: ['answer1', 'answer2', 'answer3', 'answer4'],
//       correctAnswer: 0,
//       wikiLink: ''
//     }),
//     getEntertainmentQuestions: jest.fn().mockResolvedValue({
//       question: 'Entertainment question',
//       answers: ['answer1', 'answer2', 'answer3', 'answer4'],
//       correctAnswer: 0,
//       wikiLink: ''
//     }),
//   }));

jest.mock('./trivia_service', () => ({
  getSportQuestions: () => {
    return ({
        text: 'Sports question',
        correctAnswer: 0,
        answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        wikiLink: ''
      });
  },
  getScienceQuestions: ()=>{
    return ({
      text: 'Science question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
      wikiLink: ''
    }
  )},
  getHistoryQuestions: ()=>{
    return ({
    text: 'History question',
    answers: ['answer1', 'answer2', 'answer3', 'answer4'],
    correctAnswer: 0,
    wikiLink: ''
  })},
  getGeographyQuestions: ()=>{
    return ({
      text: 'Geography question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
      wikiLink: ''
  })},
  getEntertainmentQuestions: ()=>{
    return ({ 
      text: 'Entertainment question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
      wikiLink: ''
  })},
}));

  

  
jest.mock('./categories', () => ({
  getCategoryColor: jest.fn(),
  getCategoryColorWithNumber: jest.fn(),
  getCategoryWithNumber: jest.fn(),
}));

jest.mock('../GameOver', () => () => <div>GameOver</div>);

describe('TriviaGame', () => {
  it('renders without crashing', () => {
    render(<TriviaGame difficulty={getEasyString()}/>);
    expect(screen.getByTestId('trivia-game-component')).toBeInTheDocument();
  });

  it('rolls the dice when the roll button is clicked', async () => {
    render(<TriviaGame difficulty={getHardString()}/>);
    const rollButton = screen.getByText('Roll');
    fireEvent.click(rollButton);
    await waitFor(() => expect(screen.getByText(/Category:/)).toBeInTheDocument());
  });

  it('format a number with the dots', () => {
    const shortNUmber = '700';
    expect(formatNumberWithDots(shortNUmber)).toBe('700');

    const number = '700000';
    expect(formatNumberWithDots(number)).toBe('700.000');
  });

  it('returns if a string is a number', () => {
    const number = '100000';
    expect(isNumber(number)).toBe(true);

    const notNumber = 'not a number';
    expect(isNumber(notNumber)).toBe(false);
  });

  it('generates a random number between 1 and 5', () => {
    let number = generateDiceRandomNumber();
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(5);

    number = generateDiceRandomNumber();
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(5);
  });

  it('should return a question based on category', async () => {
    
    const sportQuestion = await getQuestion('Sport');
    
    expect(sportQuestion.text).toBe('Sports question');
    expect(sportQuestion.answers).toEqual(['answer1', 'answer2', 'answer3', 'answer4']);
    expect(sportQuestion.correctAnswer).toBe(0);
    expect(sportQuestion.wikiLink).toBe('');

    const scienceQuestion = await getQuestion('Science');
    expect(scienceQuestion.text).toBe('Science question');

    const historyQuestion = await getQuestion('History');
    expect(historyQuestion.text).toBe('History question');

    const geographyQuestion = await getQuestion('Geography');
    expect(geographyQuestion.text).toBe('Geography question');

    const entertainmentQuestion = await getQuestion('Entertainment');
    expect(entertainmentQuestion.text).toBe('Entertainment question');
    
    //default is sports
    const defaultQuestion = await getQuestion('Other');
    expect(defaultQuestion.text).toBe('Sports question');

  });
  
});