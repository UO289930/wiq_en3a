import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswerPanel from './AnswerPanel';


describe('AnswerPanel component', () => {
  const mockedProps = {
    answered: false,
    correctAnswer: 1,
    answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    score: 0,
    setAnswered: jest.fn(),
    setScore: jest.fn(),
    setCorrectSelected: jest.fn(),
  };

  // test('renders the answers', () => {
  //   render(<AnswerPanel {...mockedProps} />);
  //   expect(screen.getByText('Answer 1')).toBeInTheDocument();
  //   expect(screen.getByText('Answer 2')).toBeInTheDocument();
  //   expect(screen.getByText('Answer 3')).toBeInTheDocument();
  //   expect(screen.getByText('Answer 4')).toBeInTheDocument();

  // });

  // test('passes the correct props to the Answer component', () => {
  //   render(<AnswerPanel {...mockedProps} />);

  //   fireEvent.click(screen.getByText('Answer 2'));
  //   expect(mockedProps.setAnswered).toHaveBeenCalledWith(true);
  //   expect(mockedProps.setCorrectSelected).toHaveBeenCalledWith(true);
  //   expect(mockedProps.setScore).toHaveBeenCalledWith(10);
  // });
  
  
});