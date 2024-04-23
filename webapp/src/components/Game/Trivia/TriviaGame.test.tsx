import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TriviaGame } from './TriviaGame';

jest.mock('./trivia_service', () => ({
    getSportQuestions: jest.fn().mockResolvedValue({
      question: 'Sport question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
    }),
    getScienceQuestions: jest.fn().mockResolvedValue({
      question: 'Science question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
    }),
    getHistoryQuestions: jest.fn().mockResolvedValue({
      question: 'History question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
    }),
    getGeographyQuestions: jest.fn().mockResolvedValue({
      question: 'Geography question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
    }),
    getEntertainmentQuestions: jest.fn().mockResolvedValue({
      question: 'Entertainment question',
      answers: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: 0,
    }),
  }));
  
jest.mock('./categories', () => ({
  getCategoryColor: jest.fn(),
  getCategoryColorWithNumber: jest.fn(),
  getCategoryWithNumber: jest.fn(),
}));

jest.mock('../GameOver', () => () => <div>GameOver</div>);

describe('TriviaGame', () => {
  it('renders without crashing', () => {
    render(<TriviaGame />);
    expect(screen.getByTestId('trivia-game-component')).toBeInTheDocument();
  });

  it('rolls the dice when the roll button is clicked', async () => {
    render(<TriviaGame />);
    const rollButton = screen.getByText('Roll');
    fireEvent.click(rollButton);
    await waitFor(() => expect(screen.getByText(/Category:/)).toBeInTheDocument());
  });
});